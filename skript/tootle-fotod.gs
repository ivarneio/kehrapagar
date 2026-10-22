/**
 * Kehra Pagar: töötleb tootegrupi fotod.
 * Võtab Tooted/grupikaustast, kropib 4x3 (pikem külg 1200),
 * kopeerib webipildid kausta ja kirjutab Excelisse rea.
 *
 * Vajab teeki ImgApp:
 *   Skripti ID: 1T03nYHRho6XMWYcaumClcWr6ble65mAT8OLJqRFJ5lukPVogAN2NDl-y
 *   Tunnus: ImgApp
 * Lülita sisse: Drive API ja Slides API (Advanced Google services).
 *
 * Käivita: tootleFotod
 */
var SEADED = {
  tootedKaust: "1qqgM4fu3l_wbdBzoS8ZAFaZZ6b6VuiVA",
  webipildid: "1CaMXBN8MjjVI5KkpI3gKdxMCONU4yFi3",
  tabel: "1uMxtlXg6EDMhJ-Eww2u_Y8hVUrv5ximPRm-mhmSvu3E",
  pakett: "1CeA8LyT8eDlbz0zxvNoXT362SjiK5TgA",
  backup: "1ytdc3235uytEYotLhnlAPkH3YNuw8WHL",
  pikemKulg: 1200,
  grupid: {
    "Kringlid": 1,
    "Küpsised": 2,
    "Pagaritooted": 3,
    "Kondiitritooted": 4,
    "Tordid": 5
  }
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Kehra Pagar")
    .addItem("Töötle fotod", "tootleFotod")
    .addItem("Tõlgi puuduvad", "tolgiPuuduvad")
    .addItem("Tee pakett", "teePakett")
    .addToUi();
}

function looNupp() {
  var vanad = ScriptApp.getProjectTriggers();
  vanad.forEach(function (t) {
    if (t.getHandlerFunction() === "tootleNupust") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("tootleNupust")
    .forSpreadsheet(SEADED.tabel)
    .onEdit()
    .create();
  SpreadsheetApp.getUi().alert("Nupp on valmis. Kolmas osapool vajutab vahekaardil Töötle lahtrit Töötle fotod.");
}

function tootleNupust(e) {
  if (!e || !e.range) return;
  var leht = e.range.getSheet().getName();
  if (leht === "Töötle" && e.range.getA1Notation() === "B2" && e.range.getValue() === "Töötle fotod") {
    e.range.setValue("");
    var tulemus = tootleFotod();
    kirjutaOlek(tulemus);
    return;
  }
  if (leht === "Tooted") {
    if (kontrolliTolgiNupp(e)) return;
    kontrolliAktiveerimist(e);
  }
}

function kontrolliTolgiNupp(e) {
  var leht = e.range.getSheet();
  var pais = leht.getRange(1, 1, 1, leht.getLastColumn()).getValues()[0];
  var iTolgi = pais.indexOf("tõlgi");
  if (iTolgi < 0) return false;
  if (e.range.getColumn() !== iTolgi + 1) return false;
  var val = String(e.range.getValue() || "").toLowerCase().trim();
  if (val !== "jah" && val !== "ja" && val !== "1") return false;
  var rida = e.range.getRow();
  if (rida < 2) return true;
  e.range.setValue("");
  naitaEdenemine(10, "Tõlgin rida. Ära vajuta uuesti.");
  teeBackup("rea-tolge");
  var n = tolgiRida(leht, pais, rida, true);
  var tekst = n ? "Rida tõlgitud." : "Eesti teksti ei ole. Midagi ei tõlgitud.";
  naitaEdenemine(100, tekst);
  SpreadsheetApp.getUi().alert(tekst);
  return true;
}

function tolgiPuuduvad() {
  if (onKasib()) {
    naitaEdenemine(0, "Juba käib. Oota.");
    return "Juba käib.";
  }
  seaKaib(true);
  try {
    naitaEdenemine(5, "Loen tabelit. Ära vajuta uuesti.");
    var leht = SpreadsheetApp.openById(SEADED.tabel).getSheetByName("Tooted");
    var read = leht.getDataRange().getValues();
    var pais = read[0];
    naitaEdenemine(15, "Teen backupi.");
    teeBackup("puuduvad");
    var n = 0;
    var kokku = Math.max(read.length - 1, 1);
    for (var i = 1; i < read.length; i++) {
      naitaEdenemine(20 + Math.round((i / kokku) * 70), "Tõlgin rida " + (i + 1));
      n += tolgiRida(leht, pais, i + 1, false);
    }
    var tekst = n ? ("Tõlgitud ridu: " + n) : "Puuduvaid tõlkeid ei olnud.";
    naitaEdenemine(100, tekst);
    kirjutaOlek(tekst);
    try { SpreadsheetApp.getUi().alert(tekst); } catch (e) {}
    return tekst;
  } finally {
    seaKaib(false);
  }
}

function tolgiRida(leht, pais, rida, sunni) {
  var paarid = [
    ["alaliik_et", "alaliik_ru", "alaliik_en"],
    ["tekst_et", "tekst_ru", "tekst_en"]
  ];
  var muutus = 0;
  paarid.forEach(function (p) {
    var iEt = pais.indexOf(p[0]);
    var iRu = pais.indexOf(p[1]);
    var iEn = pais.indexOf(p[2]);
    if (iEt < 0 || iRu < 0 || iEn < 0) return;
    var et = String(leht.getRange(rida, iEt + 1).getValue() || "").trim();
    if (!et) return;
    [["ru", iRu], ["en", iEn]].forEach(function (siht) {
      var lahter = leht.getRange(rida, siht[1] + 1);
      var olemas = String(lahter.getValue() || "").trim();
      if (olemas && !sunni) return;
      var tolge = LanguageApp.translate(et, "et", siht[0]);
      lahter.setValue(tolge);
      muutus++;
    });
  });
  return muutus ? 1 : 0;
}

function teeBackup(pohjus) {
  var fail = DriveApp.getFileById(SEADED.tabel);
  var nimi = "tooted-" + Utilities.formatDate(new Date(), "Europe/Tallinn", "yyyy-MM-dd-HHmm") + "-" + pohjus;
  fail.makeCopy(nimi, DriveApp.getFolderById(SEADED.backup));
}

function kontrolliAktiveerimist(e) {
  var leht = e.range.getSheet();
  var pais = leht.getRange(1, 1, 1, leht.getLastColumn()).getValues()[0];
  var iAkt = pais.indexOf("aktiivne");
  var iNimi = pais.indexOf("nimi");
  var iTekst = pais.indexOf("tekst_et");
  if (iAkt < 0 || iNimi < 0 || iTekst < 0) return;
  if (e.range.getColumn() !== iAkt + 1) return;
  var val = String(e.range.getValue() || "").toLowerCase().trim();
  if (val !== "jah" && val !== "ja" && val !== "1") return;
  var rida = e.range.getRow();
  if (rida < 2) return;
  var nimi = String(leht.getRange(rida, iNimi + 1).getValue() || "").trim();
  var tekst = String(leht.getRange(rida, iTekst + 1).getValue() || "").trim();
  if (nimi && tekst) return;
  e.range.setValue("ei");
  SpreadsheetApp.getUi().alert("Enne aktiveerimist täida nimi ja kirjeldus.");
}

function tootleFotod() {
  if (onKasib()) {
    naitaEdenemine(0, "Juba käib. Oota.");
    return "Juba käib.";
  }
  seaKaib(true);
  try {
    naitaEdenemine(5, "Loen olemasolevaid. Ära vajuta uuesti.");
    var web = DriveApp.getFolderById(SEADED.webipildid);
    var olemas = loeOlemas(web);
    var tooted = DriveApp.getFolderById(SEADED.tootedKaust);
    var kaustad = tooted.getFolders();
    var tehtud = [];
    var nimekiri = [];
    while (kaustad.hasNext()) nimekiri.push(kaustad.next());
    var kokku = Math.max(nimekiri.length, 1);

    nimekiri.forEach(function (kaust, i) {
      var gruppNr = SEADED.grupid[kaust.getName()];
      if (!gruppNr) return;
      naitaEdenemine(15 + Math.round((i / kokku) * 70), "Töötlen " + kaust.getName());
      var tootepildid = koguTooted(kaust, olemas);
      Object.keys(tootepildid).forEach(function (pohi) {
        var pildid = tootepildid[pohi];
        var tooteNr = jargmineToode(gruppNr, olemas);
        var kood = String(gruppNr) + pad(tooteNr, 4);
        var failinimed = [];
        pildid.forEach(function (p) {
          var pildiId = kood + String(p.jrk);
          var algne = p.fail.getName();
          if (!/\.[^.]+$/.test(algne)) algne += ".jpg";
          var uusNimi = pildiId + "_" + algne;
          var blob = kropi(p.fail);
          blob.setName(uusNimi);
          web.createFile(blob);
          olemas.pildid[pildiId] = true;
          olemas.nimeJargi[pildiId] = p.fail.getName();
          failinimed.push(uusNimi);
        });
        olemas.tooted[gruppNr] = Math.max(olemas.tooted[gruppNr] || 0, tooteNr);
        kirjutaRida(kood, kaust.getName(), kaust.getUrl(), failinimed.join(", "));
        tehtud.push(kood + " " + pohi);
      });
    });
    var tekst = tehtud.length ? ("Tehtud:\n" + tehtud.join("\n")) : "Uusi pilte ei leitud.";
    naitaEdenemine(100, tehtud.length ? ("Tehtud: " + tehtud.length) : "Uusi pilte ei leitud.");
    kirjutaOlek(tekst);
    try { SpreadsheetApp.getUi().alert(tekst); } catch (e) {}
    return tekst;
  } finally {
    seaKaib(false);
  }
}

function teePakett() {
  if (onKasib()) {
    naitaEdenemine(0, "Juba käib. Oota.");
    return "Juba käib.";
  }
  seaKaib(true);
  try {
    naitaEdenemine(5, "Loen tabelit. Ära vajuta uuesti.");
    var leht = SpreadsheetApp.openById(SEADED.tabel).getSheetByName("Tooted");
    var read = leht.getDataRange().getValues();
    var pais = read[0];
    var iKood = pais.indexOf("kood");
    var iGrupp = pais.indexOf("grupp");
    var iNimi = pais.indexOf("nimi");
    var iTekst = pais.indexOf("tekst_et");
    var iAktiivne = pais.indexOf("aktiivne");
    var aktiivsed = [];
    read.slice(1).forEach(function (r) {
      var kood = String(r[iKood] || "");
      var aktiivne = String(r[iAktiivne] || "").toLowerCase();
      if (!/^\d{5}$/.test(kood)) return;
      if (aktiivne !== "jah" && aktiivne !== "ja" && aktiivne !== "1") return;
      var nimi = String(r[iNimi] || "").trim();
      var tekst = String(r[iTekst] || "").trim();
      if (!nimi || !tekst) return;
      aktiivsed.push({
        kood: kood,
        grupp: r[iGrupp] || "",
        nimi: nimi,
        alaliik_et: r[pais.indexOf("alaliik_et")] || "",
        alaliik_ru: r[pais.indexOf("alaliik_ru")] || "",
        alaliik_en: r[pais.indexOf("alaliik_en")] || "",
        tekst: tekst,
        tekst_ru: r[pais.indexOf("tekst_ru")] || "",
        tekst_en: r[pais.indexOf("tekst_en")] || "",
        tellitav: /^(jah|ja|1)$/.test(String(r[pais.indexOf("tellitav")] || "").toLowerCase().trim()),
        hind: String(r[pais.indexOf("hind")] || "").trim(),
        pildid: []
      });
    });

    naitaEdenemine(20, "Tühjendan vana paketi.");
    var web = DriveApp.getFolderById(SEADED.webipildid);
    var siht = DriveApp.getFolderById(SEADED.pakett);
    var vanad = siht.getFiles();
    while (vanad.hasNext()) vanad.next().setTrashed(true);

    naitaEdenemine(35, "Loen fotosid.");
    var failid = {};
    var it = web.getFiles();
    while (it.hasNext()) {
      var f = it.next();
      var m = f.getName().match(/^(\d{5})/);
      if (m) {
        if (!failid[m[1]]) failid[m[1]] = [];
        failid[m[1]].push(f);
      }
    }

    var kokku = Math.max(aktiivsed.length, 1);
    aktiivsed.forEach(function (t, i) {
      naitaEdenemine(40 + Math.round((i / kokku) * 50), "Kopeerin " + (t.nimi || t.kood));
      (failid[t.kood] || []).sort(function (a, b) {
        return a.getName().localeCompare(b.getName());
      }).forEach(function (f) {
        f.makeCopy(f.getName(), siht);
        t.pildid.push(f.getName());
      });
    });

    naitaEdenemine(95, "Kirjutan tooted.json.");
    siht.createFile("tooted.json", JSON.stringify(aktiivsed, null, 2), MimeType.PLAIN_TEXT);
    var tekst = aktiivsed.length
      ? ("Pakett valmis. Tooteid: " + aktiivsed.length)
      : "Aktiivseid tooteid ei ole. Pakett on tühi.";
    naitaEdenemine(100, tekst);
    kirjutaOlek(tekst);
    try { SpreadsheetApp.getUi().alert(tekst); } catch (e) {}
    return tekst;
  } finally {
    seaKaib(false);
  }
}

function koguTooted(kaust, olemas) {
  var tootepildid = {};
  var failid = kaust.getFiles();
  while (failid.hasNext()) {
    var fail = failid.next();
    if (!onPilt(fail)) continue;
    if (onJubaToodeldud(fail.getName(), olemas)) continue;
    var osade = pildiOsad(fail.getName());
    if (!tootepildid[osade.pohi]) tootepildid[osade.pohi] = [];
    tootepildid[osade.pohi].push({ fail: fail, jrk: osade.jrk, nimi: fail.getName() });
  }
  Object.keys(tootepildid).forEach(function (pohi) {
    var list = tootepildid[pohi];
    var kasutatud = {};
    list.forEach(function (p) { if (p.jrk) kasutatud[p.jrk] = true; });
    var auto = 1;
    list.forEach(function (p) {
      if (!p.jrk) {
        while (kasutatud[auto]) auto++;
        p.jrk = auto;
        kasutatud[auto] = true;
        auto++;
      }
    });
    list.sort(function (a, b) { return a.jrk - b.jrk; });
  });
  return tootepildid;
}

function pildiOsad(nimi) {
  var puhas = nimi.replace(/\.[^.]+$/, "");
  var m = puhas.match(/^(.*?)(\d)$/);
  if (m && m[1]) return { pohi: m[1].toLowerCase(), jrk: Number(m[2]) };
  return { pohi: puhas.toLowerCase(), jrk: 0 };
}

function onPilt(fail) {
  var nimi = fail.getName();
  if (/\.(jpe?g|png|webp|gif)$/i.test(nimi)) return true;
  var tyyp = "";
  try { tyyp = fail.getMimeType() || ""; } catch (e) {}
  return tyyp.indexOf("image/") === 0;
}

function onJubaToodeldud(nimi, olemas) {
  return Object.keys(olemas.nimeJargi).some(function (id) {
    return olemas.nimeJargi[id] === nimi;
  });
}

function loeOlemas(web) {
  var olemas = { pildid: {}, nimeJargi: {}, tooted: {} };
  var failid = web.getFiles();
  while (failid.hasNext()) {
    var nimi = failid.next().getName();
    var m = nimi.match(/^(\d)(\d{4})(\d)_(.+)$/);
    if (!m) continue;
    olemas.pildid[m[1] + m[2] + m[3]] = true;
    olemas.nimeJargi[m[1] + m[2] + m[3]] = m[4];
    var g = Number(m[1]);
    var t = Number(m[2]);
    if (!olemas.tooted[g] || t > olemas.tooted[g]) olemas.tooted[g] = t;
  }
  var leht = SpreadsheetApp.openById(SEADED.tabel).getSheetByName("Tooted");
  var read = leht.getRange("A2:A").getValues();
  read.forEach(function (r) {
    var k = String(r[0] || "");
    if (!/^\d{5}$/.test(k)) return;
    var g = Number(k.slice(0, 1));
    var t = Number(k.slice(1));
    if (!olemas.tooted[g] || t > olemas.tooted[g]) olemas.tooted[g] = t;
  });
  return olemas;
}

function jargmineToode(grupp, olemas) {
  return (olemas.tooted[grupp] || 0) + 1;
}

function pad(n, koht) {
  var s = String(n);
  while (s.length < koht) s = "0" + s;
  return s;
}

function kropi(fail) {
  var blob = fail.getBlob();
  var suurus = ImgApp.getSize(blob);
  var w = suurus.width;
  var h = suurus.height;
  var pikk = Math.max(w, h);
  var siht = pikk === w
    ? { w: SEADED.pikemKulg, h: Math.round(SEADED.pikemKulg * 3 / 4) }
    : { w: Math.round(SEADED.pikemKulg * 3 / 4), h: SEADED.pikemKulg };
  var suhe = siht.w / siht.h;
  var cropW = w;
  var cropH = h;
  if (w / h > suhe) cropW = Math.round(h * suhe);
  else cropH = Math.round(w / suhe);
  var left = Math.round((w - cropW) / 2);
  var top = Math.round((h - cropH) / 2);
  var cropped = ImgApp.editImage({
    blob: blob,
    unit: "pixel",
    crop: { t: top, b: h - top - cropH, l: left, r: w - left - cropW },
    outputWidth: siht.w
  });
  return cropped.setName(fail.getName());
}

function naitaEdenemine(protsent, tekst) {
  var leht = SpreadsheetApp.openById(SEADED.tabel).getSheetByName("Töötle");
  if (leht) {
    leht.getRange("A5").setValue(new Date());
    leht.getRange("A6").setValue(protsent + "%  " + tekst);
    leht.getRange("B2").setBackground(protsent < 100 ? "#f4c430" : "#ffffff");
  }
  SpreadsheetApp.flush();
  try {
    SpreadsheetApp.getActive().toast(protsent + "%  " + tekst, "Kehra Pagar", 8);
  } catch (e) {}
}

function onKasib() {
  var v = PropertiesService.getScriptProperties().getProperty("kaib");
  return v === "1";
}

function seaKaib(jah) {
  PropertiesService.getScriptProperties().setProperty("kaib", jah ? "1" : "0");
}

function kirjutaOlek(tekst) {
  var leht = SpreadsheetApp.openById(SEADED.tabel).getSheetByName("Töötle");
  if (!leht) return;
  leht.getRange("A5").setValue(new Date());
  leht.getRange("A6").setValue(tekst);
}

function kirjutaRida(kood, grupp, kaustaUrl, pildid) {
  var leht = SpreadsheetApp.openById(SEADED.tabel).getSheetByName("Tooted");
  var rida = [
    kood, "", grupp, "", "", "", "", "", "", "", "ei", pildid, kaustaUrl
  ];
  leht.appendRow(rida);
}
