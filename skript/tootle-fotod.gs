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
  pikemKulg: 1200,
  grupid: {
    "Kringlid": 1,
    "Küpsised": 2,
    "Pagaritooted": 3,
    "Kondiitritooted": 4,
    "Tordid": 5
  }
};

function tootleFotod() {
  var web = DriveApp.getFolderById(SEADED.webipildid);
  var olemas = loeOlemas(web);
  var tooted = DriveApp.getFolderById(SEADED.tootedKaust);
  var kaustad = tooted.getFolders();
  var tehtud = [];

  while (kaustad.hasNext()) {
    var kaust = kaustad.next();
    var gruppNr = SEADED.grupid[kaust.getName()];
    if (!gruppNr) continue;
    var tootepildid = koguTooted(kaust, olemas);
    Object.keys(tootepildid).forEach(function (pohi) {
      var pildid = tootepildid[pohi];
      var tooteNr = jargmineToode(gruppNr, olemas);
      var kood = String(gruppNr) + pad(tooteNr, 4);
      var failinimed = [];
      pildid.forEach(function (p) {
        var pildiId = kood + String(p.jrk);
        var uusNimi = pildiId + "_" + p.fail.getName();
        var blob = kropi(p.fail);
        blob.setName(uusNimi);
        web.createFile(blob);
        olemas.pildid[pildiId] = true;
        failinimed.push(uusNimi);
      });
      olemas.tooted[gruppNr] = Math.max(olemas.tooted[gruppNr] || 0, tooteNr);
      kirjutaRida(kood, kaust.getName(), kaust.getUrl(), failinimed.join(", "));
      tehtud.push(kood + " " + pohi);
    });
  }
  return tehtud.length ? tehtud.join("\n") : "Uusi pilte ei olnud.";
}

function koguTooted(kaust, olemas) {
  var tootepildid = {};
  var failid = kaust.getFiles();
  while (failid.hasNext()) {
    var fail = failid.next();
    if (!onPilt(fail.getName())) continue;
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

function onPilt(nimi) {
  return /\.(jpe?g|png|webp|gif)$/i.test(nimi);
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

function kirjutaRida(kood, grupp, kaustaUrl, pildid) {
  var leht = SpreadsheetApp.openById(SEADED.tabel).getSheetByName("Tooted");
  var rida = [
    kood, "", grupp, "", "", "", "", "", "", "", "ei", pildid, kaustaUrl
  ];
  leht.appendRow(rida);
}
