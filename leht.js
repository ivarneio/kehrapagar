(function () {
  var pais = document.querySelector(".pais");
  var menu = document.querySelector(".menu-nupp");
  if (menu) {
    menu.addEventListener("click", function () {
      pais.classList.toggle("lahti");
    });
  }
  document.querySelectorAll("nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      pais.classList.remove("lahti");
    });
  });

  var pealkiri = document.querySelector("#tooted > h2");
  if (pealkiri) pealkiri.remove();

  var ribaVarv = { oranz: "#e25b2a", sinine: "#2f7fd1", valge: "#ffffff" };
  var ribaLapa = 50;
  function varvi() {
    document.documentElement.style.setProperty("--riba-oranz", ribaVarv.oranz);
    document.documentElement.style.setProperty("--riba-sinine", ribaVarv.sinine);
    document.documentElement.style.setProperty("--riba-valge", ribaVarv.valge);
    document.documentElement.style.setProperty("--riba-lapa", String(ribaLapa / 100));
  }
  function teeSorm(jarjekord) {
    var el = document.createElement("div");
    el.className = "sorm";
    el.setAttribute("aria-hidden", "true");
    jarjekord.forEach(function (nimi) {
      var i = document.createElement("i");
      i.className = nimi;
      el.appendChild(i);
    });
    return el;
  }
  var ylemine = ["oranz", "valge", "sinine", "valge"];
  var sild = ["oranz", "valge", "sinine", "valge", "oranz"];
  var alumine = ["valge", "sinine", "valge", "oranz"];
  function muster(i, n) {
    if (n > 2 && i === n - 1) return alumine;
    if (n > 2 && i === n - 2) return sild;
    return ylemine;
  }
  document.querySelectorAll(".grupid .grupp > button").forEach(function (nupp) {
    var nimi = document.createElement("span");
    nimi.className = "sorm-nimi";
    nimi.textContent = nupp.textContent.trim();
    nupp.textContent = "";
    /* ribad vasakul eemaldatud */
    nupp.appendChild(nimi);
  });
  function pikkus(i, n, k) { return 60; }
  function seaVarv(g, i, n) {
    var sorm = g.querySelector(".sorm");
    if (!sorm) return;
    var soov = muster(i, n);
    var ribad = sorm.querySelectorAll("i");
    if (ribad.length !== soov.length) {
      sorm.innerHTML = "";
      soov.forEach(function (nimi) {
        var el = document.createElement("i");
        el.className = nimi;
        sorm.appendChild(el);
      });
      return;
    }
    ribad.forEach(function (bar, k) { bar.className = soov[k]; });
  }
  function seaSormed() {
    varvi();
    var grupid = document.querySelectorAll(".grupid .grupp");
    var n = grupid.length || 1;
    grupid.forEach(function (g, i) {
      seaVarv(g, i, n);
      var koht = g.classList.contains("lahti") ? 0 : i;
      var ribad = g.querySelectorAll(".sorm i");
      ribad.forEach(function (bar, k) {
        bar.style.width = pikkus(koht, n, k) + "%";
        bar.style.marginLeft = "0";
      });
      var oranz = 75;
      ribad.forEach(function (bar) {
        if (bar.className !== "oranz") return;
        var w = parseFloat(bar.style.width);
        if (w < oranz) oranz = w;
      });
      var sinine = oranz - 8;
      ribad.forEach(function (bar) {
        if (bar.className !== "sinine") return;
        var w = parseFloat(bar.style.width);
        if (w >= oranz) w = oranz - 8;
        if (w < sinine) sinine = w;
        bar.style.width = Math.max(22, w) + "%";
      });
      ribad.forEach(function (bar) {
        if (bar.className !== "valge") return;
        var w = parseFloat(bar.style.width);
        if (w >= sinine) w = sinine - 6;
        bar.style.width = Math.max(18, w) + "%";
      });
    });
  }
  seaSormed();
  window.addEventListener("resize", seaSormed);

  var tekstid = {};
  var keel = "et";

  function loeKeel() {
    var q = new URLSearchParams(location.search).get("keel");
    if (q === "et" || q === "ru" || q === "en") return q;
    try {
      var m = localStorage.getItem("kehrapagar-keel");
      if (m === "et" || m === "ru" || m === "en") return m;
    } catch (e) {}
    return "et";
  }

  function sona(k) {
    var plokk = tekstid[keel] || {};
    if (plokk[k]) return plokk[k];
    var et = tekstid.et || {};
    return et[k] || "";
  }

  function rakenda() {
    document.documentElement.lang = keel;
    document.querySelectorAll("[data-k]").forEach(function (el) {
      var t = sona(el.getAttribute("data-k"));
      if (!t) return;
      if (el.classList.contains("sulge")) {
        el.setAttribute("aria-label", t);
        return;
      }
      var nimi = el.querySelector(":scope > .sorm-nimi");
      if (nimi) {
        nimi.textContent = t;
        return;
      }
      el.textContent = t;
    });
    if (menu) menu.setAttribute("aria-label", sona("menu") || "Menüü");
    document.querySelectorAll(".keeled button").forEach(function (x) {
      x.classList.toggle("sees", x.getAttribute("data-keel") === keel);
    });
  }

  function vali(uus) {
    keel = uus;
    try { localStorage.setItem("kehrapagar-keel", keel); } catch (e) {}
    var url = new URL(location.href);
    if (keel === "et") url.searchParams.delete("keel");
    else url.searchParams.set("keel", keel);
    history.replaceState(null, "", url);
    rakenda();
  }

  document.querySelectorAll(".keeled button").forEach(function (nupp) {
    nupp.addEventListener("click", function () {
      vali(nupp.getAttribute("data-keel"));
    });
  });

  keel = loeKeel();
  fetch("tekstid.json")
    .then(function (r) { return r.json(); })
    .then(function (andmed) {
      tekstid = andmed || {};
      rakenda();
    })
    .catch(function () {
      rakenda();
    });

  fetch("tooted.json")
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (read) {
      if (!read || !read.length) return;
      var grupid = {};
      read.forEach(function (t) {
        var g = t.grupp || "";
        if (!grupid[g]) grupid[g] = [];
        grupid[g].push(t);
      });
      Object.keys(grupid).forEach(function (nimi) {
        var grupp = null;
        document.querySelectorAll(".grupid .grupp").forEach(function (el) {
          var nupp = el.querySelector(":scope > button");
          if (nupp && nupp.textContent.trim() === nimi) grupp = el;
        });
        if (!grupp) return;
        var riba = grupp.querySelector(".riba");
        if (!riba) return;
        riba.innerHTML = "";
        grupid[nimi].forEach(function (t) {
          var pildid = (t.pildid || []).filter(Boolean);
          if (!pildid.length) return;
          var teed = pildid.map(function (f) { return "pildid/pakett/" + f; });
          var nupp = document.createElement("button");
          nupp.className = "pisi";
          nupp.type = "button";
          nupp.setAttribute("data-pildid", teed.join("|"));
          nupp.setAttribute("data-sildid", t.nimi || "");
          nupp.setAttribute("data-tekst-et", t.tekst || "");
          nupp.setAttribute("data-tekst-ru", t.tekst_ru || "");
          nupp.setAttribute("data-tekst-en", t.tekst_en || "");
          nupp.setAttribute("data-hind", t.hind || "");
          nupp.setAttribute("data-uhik", t.uhik || "");
          nupp.setAttribute("data-hinnad", JSON.stringify(t.hinnad || {}));
          nupp.setAttribute("data-tellitav", /^(jah|ja|1|true)$/.test(String(t.tellitav || "").toLowerCase()) ? "jah" : "");
          var img = document.createElement("img");
          img.src = teed[0];
          img.alt = t.nimi || "";
          nupp.appendChild(img);
          var silt = document.createElement("span");
          silt.className = "nimi";
          silt.textContent = t.nimi || "";
          nupp.appendChild(silt);
          if (/^(jah|ja|1|true)$/.test(String(t.tellitav || "").toLowerCase())) {
            var link = document.createElement("span");
            link.className = "telli-link";
            link.textContent = "Lisa tellimusse";
            nupp.appendChild(link);
          }
          riba.appendChild(nupp);
        });
      });
    })
    .catch(function () {});

  function sulgeGrupp(grupp) {
    grupp.classList.remove("lahti");
    var riba = grupp.querySelector(".riba");
    if (riba) riba.classList.remove("sisse");
  }

  var lava = document.querySelector(".grupid");
  var FLIP_MS = 800;
  var flipKinni = false;
  var vahemLiikumine = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function kaardid() {
    return lava ? Array.prototype.slice.call(lava.querySelectorAll(".grupp")) : [];
  }

  function taastaJarjekord() {
    kaardid().sort(function (a, b) {
      return (+a.getAttribute("data-jrk") || 0) - (+b.getAttribute("data-jrk") || 0);
    }).forEach(function (k) { lava.appendChild(k); });
  }

  function allaPaise(el) {
    if (!el) return;
    var telefon = window.matchMedia("(max-width: 799px)").matches;
    if (!telefon) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    var pais = document.querySelector(".pais");
    var all = pais ? pais.getBoundingClientRect().height : 0;
    var y = el.getBoundingClientRect().top + window.scrollY - all;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }

  function lukkaAlla(kast, valmis) {
    if (!kast) { if (valmis) valmis(); return; }
    kast.style.overflow = "hidden";
    kast.style.transition = "none";
    kast.style.height = "auto";
    var h = kast.scrollHeight;
    kast.style.height = "0px";
    void kast.offsetHeight;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        kast.style.transition = "height 1.2s cubic-bezier(.22, 1, .36, 1)";
        kast.style.height = h + "px";
      });
    });
    function puhasta(e) {
      if (e && e.propertyName !== "height") return;
      kast.classList.add("lahti");
      kast.style.height = "";
      kast.style.overflow = "";
      kast.style.transition = "";
      kast.removeEventListener("transitionend", puhasta);
      if (valmis) valmis();
    }
    kast.addEventListener("transitionend", puhasta);
  }

  function sulgeAeglaselt(kast, valmis) {
    if (!kast) { if (valmis) valmis(); return; }
    var h = kast.getBoundingClientRect().height;
    kast.style.overflow = "hidden";
    kast.style.transition = "none";
    kast.style.height = h + "px";
    void kast.offsetHeight;
    kast.style.transition = "height 1.2s cubic-bezier(.22, 1, .36, 1)";
    kast.style.height = "0px";
    function puhasta(e) {
      if (e && e.propertyName !== "height") return;
      kast.classList.remove("lahti");
      kast.style.height = "";
      kast.style.overflow = "";
      kast.style.transition = "";
      kast.removeEventListener("transitionend", puhasta);
      if (kast.classList.contains("tekstileht")) kast.hidden = true;
      if (valmis) valmis();
    }
    kast.addEventListener("transitionend", puhasta);
  }

  function avatudKast() {
    var leht = document.querySelector(".tekstileht:not([hidden])");
    if (leht) return leht;
    if (telli && telli.classList.contains("lahti")) return telli.querySelector(".sisu") || telli;
    return null;
  }

  function paneTelliKinni() {
    if (!telli) return;
    telli.classList.remove("lahti");
    var sisu = telli.querySelector(".sisu");
    if (sisu) {
      sisu.classList.remove("lahti");
      sisu.style.height = "";
      sisu.style.overflow = "";
      sisu.style.transition = "";
      sisu.style.display = "";
      sisu.style.gridTemplateRows = "";
    }
    var tooted = document.getElementById("tooted");
    if (tooted && tooted.nextElementSibling !== telli) tooted.after(telli);
  }

  function sulgeTelliAeglaselt(valmis) {
    if (!telli || !telli.classList.contains("lahti")) {
      paneTelliKinni();
      if (valmis) valmis();
      return;
    }
    var sisu = telli.querySelector(".sisu") || telli;
    sulgeAeglaselt(sisu, function () {
      paneTelliKinni();
      if (valmis) valmis();
    });
  }

  function avaLeht(leht) {
    if (!leht || !lava) return;
    function ava() {
      document.querySelectorAll(".tekstileht").forEach(function (x) {
        if (x !== leht) { x.hidden = true; x.classList.remove("lahti"); }
      });
      lava.parentElement.insertBefore(leht, lava);
      leht.hidden = false;
      leht.classList.remove("lahti");
      allaPaise(leht);
      lukkaAlla(leht);
    }
    var vanaLeht = document.querySelector(".tekstileht:not([hidden])");
    function avaKuiLehtKinni() {
      if (vanaLeht && vanaLeht !== leht) sulgeAeglaselt(vanaLeht, ava);
      else ava();
    }
    if (telli && telli.classList.contains("lahti")) sulgeTelliAeglaselt(avaKuiLehtKinni);
    else avaKuiLehtKinni();
  }

  function sulgeKoik() {
    kaardid().forEach(sulgeGrupp);
    taastaJarjekord();
    if (telli) paneTelliKinni();
    document.querySelectorAll(".tekstileht").forEach(function (x) { x.hidden = true; });
  }

  function avaLint(grupp) {
    var riba = grupp.querySelector(".riba");
    if (!riba) return;
    riba.scrollLeft = 0;
    riba.classList.remove("sisse");
    void riba.offsetWidth;
    if (!vahemLiikumine) riba.classList.add("sisse");
  }

  function liiguta(uus, ava) {
    var koik = kaardid();
    var enne = {};
    koik.forEach(function (k) { enne[k.getAttribute("data-jrk")] = k.getBoundingClientRect(); });
    koik.forEach(sulgeGrupp);
    if (ava) lava.insertBefore(uus, lava.firstChild);
    else taastaJarjekord();
    seaSormed();
    requestAnimationFrame(function () {
      kaardid().forEach(function (k) {
        var f = enne[k.getAttribute("data-jrk")];
        if (!f) return;
        var l = k.getBoundingClientRect();
        var dx = f.left - l.left;
        var dy = f.top - l.top;
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
        k.style.transition = "none";
        k.style.transform = "translate(" + dx + "px," + dy + "px)";
        k.style.zIndex = k === uus ? "8" : "1";
      });
      lava.offsetHeight;
      requestAnimationFrame(function () {
        kaardid().forEach(function (k) {
          k.style.transition = "transform " + FLIP_MS + "ms cubic-bezier(.22, 1, .36, 1)";
          k.style.transform = "";
        });
      });
      setTimeout(function () {
        kaardid().forEach(function (k) {
          k.style.transition = "";
          k.style.transform = "";
          k.style.zIndex = "";
        });
        if (ava) {
          uus.classList.add("lahti");
          avaLint(uus);
          allaPaise(uus);
        }
        seaSormed();
        flipKinni = false;
      }, FLIP_MS + 30);
    });
  }

  document.querySelectorAll(".grupid .grupp > button").forEach(function (nupp) {
    nupp.addEventListener("click", function () {
      function avaGrupp() {
        document.querySelectorAll(".tekstileht").forEach(function (x) { x.hidden = true; });
        var grupp = nupp.parentElement;
        if (!lava) return;
        if (vahemLiikumine) {
          var oliVaikne = grupp.classList.contains("lahti");
          kaardid().forEach(sulgeGrupp);
          if (!oliVaikne) {
            lava.insertBefore(grupp, lava.firstChild);
            grupp.classList.add("lahti");
            avaLint(grupp);
            allaPaise(grupp);
          } else {
            taastaJarjekord();
          }
          seaSormed();
          return;
        }
        if (flipKinni) return;
        var oli = grupp.classList.contains("lahti");
        flipKinni = true;
        liiguta(grupp, !oli);
      }
      if (telli && telli.classList.contains("lahti")) sulgeTelliAeglaselt(avaGrupp);
      else avaGrupp();
    });
  });

  document.querySelectorAll(".riba").forEach(function (riba) {
    riba.addEventListener("wheel", function (e) {
      var samm = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (samm === 0) return;
      e.preventDefault();
      riba.scrollLeft += samm;
    }, { passive: false });
  });

  var telli = document.querySelector("#telli");
  if (telli) {
    var telliNupp = telli.querySelector(":scope > button");
    function viiTelliUles() {
      var sisu = telli.querySelector(".sisu");
      var kast = sisu || telli;
      if (telli.classList.contains("lahti")) return;
      var vana = avatudKast();
      function ava() {
        document.querySelectorAll(".tekstileht").forEach(function (x) {
          x.hidden = true;
          x.classList.remove("lahti");
        });
        if (lava) lava.parentElement.insertBefore(telli, lava);
        if (sisu) {
          sisu.style.display = "block";
          sisu.style.gridTemplateRows = "none";
        }
        allaPaise(telli);
        lukkaAlla(kast, function () { telli.classList.add("lahti"); });
      }
      if (vana) sulgeAeglaselt(vana, ava);
      else ava();
    }
    if (telliNupp) {
      telliNupp.addEventListener("click", function () {
        var oli = telli.classList.contains("lahti");
        if (oli) {
          sulgeTelliAeglaselt();
          return;
        }
        viiTelliUles();
      });
    }
    document.querySelectorAll('nav a[href="#tooted"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        sulgeTelliAeglaselt(function () {
          sulgeKoik();
          var tooted = document.getElementById("tooted");
          allaPaise(tooted);
        });
      });
    });
    document.querySelectorAll('nav a[href="#telli"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        viiTelliUles();
      });
    });
    document.querySelectorAll("nav a[href='#firmast'], nav a[href='#kauplus'], nav a[href='#kontakt']").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var id = a.getAttribute("href").slice(1);
        var leht = document.getElementById(id);
        if (!leht || !lava) return;
        avaLeht(leht);
      });
    });
  }

  var vaade = document.querySelector(".taisekraan");
  var kujud = vaade.querySelector(".kujud");
  var suurTelli = vaade.querySelector(".telli-nupp");
  var vorm = document.querySelector("form");
  var kringel = vorm ? vorm.querySelector("[name=kringel]") : null;
  kujud.style.overflow = "auto";
  kujud.style.maxHeight = "78vh";
  kujud.style.cursor = "pointer";

  var galeriiTaimer = null;

  var galeriiVorm = vaade.querySelector(".galerii-vorm");
  var galeriiToode = null;

  function sulgeVaade() {
    if (galeriiTaimer) { clearTimeout(galeriiTaimer); galeriiTaimer = null; }
    vaade.classList.remove("sees");
    kujud.innerHTML = "";
    suurTelli.hidden = true;
    if (galeriiVorm) galeriiVorm.hidden = true;
    galeriiToode = null;
  }

  function tooteTekst(nupp) {
    if (!nupp) return "";
    var oma = nupp.getAttribute("data-tekst-" + keel) || "";
    if (oma.trim()) return oma.trim();
    return (nupp.getAttribute("data-tekst-et") || "").trim();
  }

  function naitaKuju(src, silt, kollaaz, tekst) {
    var vana = kujud.querySelector(".kuju");
    var kast = document.createElement("figure");
    kast.className = kollaaz ? "kuju kollaaz" : "kuju";
    kast.style.opacity = "0";
    kast.style.position = vana ? "absolute" : "";
    kast.style.inset = vana ? "0" : "";
    var img = document.createElement("img");
    img.src = src;
    img.alt = silt || "";
    kast.appendChild(img);
    if (silt) {
      var s = document.createElement("span");
      s.textContent = silt;
      kast.appendChild(s);
    }
    if (kollaaz && tekst) {
      var paber = document.createElement("div");
      paber.className = "paber";
      paber.textContent = tekst;
      kast.appendChild(paber);
      var telefon = window.matchMedia("(max-width: 799px)").matches;
      if (!telefon) {
        kast.addEventListener("mouseenter", function () { paber.classList.add("sees"); });
        kast.addEventListener("mouseleave", function () { paber.classList.remove("sees"); });
      }
    }
    kujud.appendChild(kast);
    requestAnimationFrame(function () { kast.style.opacity = "1"; });
    if (vana) {
      vana.style.opacity = "0";
      setTimeout(function () { if (vana.parentNode) vana.remove(); kast.style.position = ""; kast.style.inset = ""; }, 360);
    }
  }

  function teeKollaaz(teed, valmis) {
    var laaditud = [];
    var jaanud = teed.length;
    teed.forEach(function (src, i) {
      var img = new Image();
      img.onload = function () {
        laaditud[i] = img;
        jaanud--;
        if (!jaanud) joonista();
      };
      img.onerror = function () {
        jaanud--;
        if (!jaanud) joonista();
      };
      img.src = src;
    });
    function joonista() {
      var pildid = laaditud.filter(Boolean);
      if (!pildid.length) { valmis(""); return; }
      var W = 1200, H = 900, vahe = 12;
      var c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      var g = c.getContext("2d");
      g.fillStyle = "#efe6d4";
      g.fillRect(0, 0, W, H);
      var n = pildid.length;
      var lahtrid = [];
      if (n === 2) {
        lahtrid = [[0, 0, W / 2, H], [W / 2, 0, W / 2, H]];
      } else if (n === 3) {
        lahtrid = [[0, 0, W, H * 0.62], [0, H * 0.62, W / 2, H * 0.38], [W / 2, H * 0.62, W / 2, H * 0.38]];
      } else {
        var veerud = Math.ceil(Math.sqrt(n));
        var read = Math.ceil(n / veerud);
        var lw = W / veerud, lh = H / read;
        for (var i = 0; i < n; i++) {
          lahtrid.push([(i % veerud) * lw, Math.floor(i / veerud) * lh, lw, lh]);
        }
      }
      pildid.forEach(function (img, i) {
        var L = lahtrid[i];
        if (!L) return;
        var x = L[0] + vahe / 2, y = L[1] + vahe / 2, w = L[2] - vahe, h = L[3] - vahe;
        var suhe = Math.max(w / img.width, h / img.height);
        var dw = img.width * suhe, dh = img.height * suhe;
        g.save();
        g.beginPath();
        g.rect(x, y, w, h);
        g.clip();
        g.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
        g.restore();
      });
      valmis(c.toDataURL("image/jpeg", 0.85));
    }
  }

  document.addEventListener("click", function (e) {
    var nupp = e.target.closest ? e.target.closest(".pisi") : null;
    if (!nupp || (e.target.closest && e.target.closest(".telli-link"))) return;
    var pildid = (nupp.getAttribute("data-pildid") || "").split("|").filter(Boolean);
    var silt = nupp.querySelector(".nimi") ? nupp.querySelector(".nimi").textContent : "";
    var tekst = tooteTekst(nupp);
    if (galeriiTaimer) { clearTimeout(galeriiTaimer); galeriiTaimer = null; }
    if (!pildid.length) return;
    var i = 0;
    function samm() {
      if (i < pildid.length) {
        naitaKuju(pildid[i], silt);
        i++;
        if (pildid.length > 1) galeriiTaimer = setTimeout(samm, 900);
        return;
      }
      teeKollaaz(pildid, function (src) {
        if (src) naitaKuju(src, silt, true, tekst);
      });
    }
    samm();
    if (galeriiVorm && nupp.getAttribute("data-tellitav") === "jah") {
      var hinnad = {};
      try { hinnad = JSON.parse(nupp.getAttribute("data-hinnad") || "{}"); } catch (err) {}
      galeriiToode = {
        nimi: silt,
        uhik: nupp.getAttribute("data-uhik") || "",
        hind: nupp.getAttribute("data-hind") || "",
        hinnad: hinnad,
        kaal: "1,0 kg",
        kogus: 1
      };
      var kaalRida = galeriiVorm.querySelector(".galerii-kaal-rida");
      var kaalValik = galeriiVorm.querySelector(".galerii-kaal");
      if (kaalRida) kaalRida.hidden = galeriiToode.uhik !== "kg";
      if (kaalValik) kaalValik.value = "1,0 kg";
      galeriiVorm.querySelector(".galerii-kogus").textContent = "1";
      uuendaGaleriiHind();
      galeriiVorm.hidden = false;
      suurTelli.hidden = true;
    } else {
      galeriiToode = null;
      if (galeriiVorm) galeriiVorm.hidden = true;
      suurTelli.hidden = true;
    }
    vaade.classList.add("sees");
  });

  function uuendaGaleriiHind() {
    if (!galeriiVorm || !galeriiToode) return;
    var alus = "";
    if (galeriiToode.uhik === "kg") alus = galeriiToode.hinnad[galeriiToode.kaal.replace(" kg", "")] || "";
    else alus = galeriiToode.hind || "";
    var n = parseFloat(String(alus).replace(",", ".").replace(/[^\d.]/g, ""));
    var silt = galeriiVorm.querySelector(".galerii-hind");
    if (!alus || isNaN(n)) { silt.textContent = "hinda ei ole"; return; }
    var kokku = n * galeriiToode.kogus;
    silt.textContent = (Math.round(kokku * 100) / 100).toString().replace(".", ",") + " €";
  }
  if (galeriiVorm) {
    galeriiVorm.addEventListener("click", function (e) {
      if (!galeriiToode) return;
      if (e.target.closest(".galerii-miinus")) galeriiToode.kogus = Math.max(1, galeriiToode.kogus - 1);
      if (e.target.closest(".galerii-pluss")) galeriiToode.kogus += 1;
      galeriiVorm.querySelector(".galerii-kogus").textContent = galeriiToode.kogus;
      uuendaGaleriiHind();
    });
    var gKaal = galeriiVorm.querySelector(".galerii-kaal");
    if (gKaal) gKaal.addEventListener("change", function () {
      if (!galeriiToode) return;
      galeriiToode.kaal = gKaal.value;
      uuendaGaleriiHind();
    });
  }

  var algus = null;
  kujud.addEventListener("pointerdown", function (e) {
    if (!e.target.closest || !e.target.closest(".kuju")) return;
    algus = { x: e.clientX, y: e.clientY, keri: kujud.scrollTop };
  });
  kujud.addEventListener("pointerup", function (e) {
    if (!algus) return;
    var dx = Math.abs(e.clientX - algus.x);
    var dy = Math.abs(e.clientY - algus.y);
    var keris = Math.abs(kujud.scrollTop - algus.keri) > 4;
    algus = null;
    if (dx < 8 && dy < 8 && !keris && e.target.closest && e.target.closest(".kuju")) {
      var kollaaz = e.target.closest(".kollaaz");
      var telefon = window.matchMedia("(max-width: 799px)").matches;
      if (kollaaz && telefon) {
        var paber = kollaaz.querySelector(".paber");
        if (paber) paber.classList.toggle("sees");
        return;
      }
      sulgeVaade();
    }
  });
  kujud.addEventListener("pointercancel", function () { algus = null; });

  vaade.querySelector(".sulge").addEventListener("click", sulgeVaade);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") sulgeVaade();
  });

  if (vorm && telli) {
    var taidised = document.querySelector(".taidised");
    if (taidised) taidised.hidden = true;

    function avaVorm() {
      sulgeVaade();
      viiTelliUles();
    }
    var korvMark = document.querySelector(".korv-mark");
    var teadeTaimer = null;
    function naitaTeade(tekst) {
      var vana = document.querySelector(".korv-teade");
      if (vana) vana.remove();
      var t = document.createElement("div");
      t.className = "korv-teade";
      t.textContent = tekst;
      document.body.appendChild(t);
      if (teadeTaimer) clearTimeout(teadeTaimer);
      teadeTaimer = setTimeout(function () { t.remove(); }, 2400);
    }
    function uuendaMark() {
      var n = korv.reduce(function (s, r) { return s + (parseInt(r.kogus, 10) || 1); }, 0);
      if (korvMark) {
        korvMark.hidden = !n;
        korvMark.querySelector("span").textContent = n;
      }
      var rongad = document.querySelectorAll(".korv-rong");
      var arvud = document.querySelectorAll(".jalus-arv");
      if (!n) {
        rongad.forEach(function (rong) { rong.classList.remove("sees", "vilgub"); });
        arvud.forEach(function (el) { el.textContent = ""; });
        return;
      }
      arvud.forEach(function (el) { el.textContent = n; });
      rongad.forEach(function (rong) {
        if (!rong.classList.contains("sees")) {
          rong.classList.add("vilgub");
          setTimeout(function () {
            rong.classList.remove("vilgub");
            rong.classList.add("sees");
          }, 700);
        } else rong.classList.add("sees");
      });
    }
    function lisaKorvi(rida) {
      if (korv.some(function (x) { return x.nimi === rida.nimi; })) {
        naitaTeade("Toode on juba lisatud.");
        uuendaMark();
        return;
      }
      korv.push(rida);
      joonista();
      naitaTeade("Toode on lisatud ostukorvi.");
    }
    suurTelli.addEventListener("click", avaVorm);
    if (korvMark) korvMark.addEventListener("click", function (e) {
      e.preventDefault();
      avaVorm();
    });
    var jalusKorv = document.querySelector(".jalus-korv");
    if (jalusKorv) jalusKorv.addEventListener("click", function (e) {
      e.preventDefault();
      avaVorm();
    });
    document.querySelectorAll(".korv-rida").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        avaVorm();
      });
    });
    var galeriiLisa = document.querySelector(".galerii-lisa");
    if (galeriiLisa) galeriiLisa.addEventListener("click", function () {
      if (!galeriiToode) return;
      lisaKorvi({
        nimi: galeriiToode.nimi,
        pilt: galeriiToode.pilt || "",
        kaal: galeriiToode.uhik === "kg" ? galeriiToode.kaal : "",
        kogus: String(galeriiToode.kogus),
        hind: galeriiToode.hind,
        uhik: galeriiToode.uhik,
        hinnad: galeriiToode.hinnad
      });
      sulgeVaade();
    });
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest(".telli-link") : null;
      if (!a) return;
      e.preventDefault();
      e.stopPropagation();
      var nimi = a.closest(".pisi") ? a.closest(".pisi").querySelector(".nimi").textContent : "";
      var toode = a.closest(".pisi");
      var hindVaartus = toode ? (toode.getAttribute("data-hind") || "") : "";
      var uhik = toode ? (toode.getAttribute("data-uhik") || "") : "";
      var pilt = toode && toode.querySelector("img") ? toode.querySelector("img").src : "";
      var hinnad = {};
      try { hinnad = JSON.parse(toode ? toode.getAttribute("data-hinnad") || "{}" : "{}"); } catch (err) {}
      if (nimi) {
        lisaKorvi({ nimi: nimi, pilt: pilt, kaal: uhik === "kg" ? "1,0 kg" : "", kogus: "1", hind: hindVaartus, uhik: uhik, hinnad: hinnad });
      }
    });
    fetch("tellitavad.json")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!kringel || !d || !d.kringlid) return;
        kringel.innerHTML = "";
        d.kringlid.forEach(function (nimi) {
          var o = document.createElement("option");
          o.textContent = nimi;
          kringel.appendChild(o);
        });
      })
      .catch(function () {});

    var korvEl = vorm.querySelector(".korv");
    var kaal = vorm.querySelector("[name=kaal]");
    var kogus = vorm.querySelector("[name=kogus]");
    var lisa = vorm.querySelector(".lisa");
    var korv = [];
    function alusHind(r) {
      if (r.uhik === "kg" && r.hinnad) {
        var v = (r.kaal || "").replace(" kg", "");
        return r.hinnad[v] || "";
      }
      return r.hind || "";
    }
    function reaHind(r) {
      var alus = String(alusHind(r) || "").replace(",", ".").replace(/[^\d.]/g, "");
      var n = parseFloat(alus);
      if (!alus || isNaN(n)) return "hinda ei ole";
      var kokku = n * (parseInt(r.kogus, 10) || 1);
      return (Math.round(kokku * 100) / 100).toString().replace(".", ",") + " €";
    }
    function joonista() {
      if (!korvEl) return;
      if (!korv.length) { korvEl.innerHTML = ""; uuendaMark(); return; }
      var kaalud = ["0,5 kg", "1,0 kg", "1,5 kg", "2,0 kg"];
      var h = "<ul>";
      korv.forEach(function (r, i) {
        var kaalValik = "";
        if (r.uhik === "kg") {
          var opts = kaalud.map(function (k) {
            return "<option" + (k === r.kaal ? " selected" : "") + ">" + k + "</option>";
          }).join("");
          kaalValik = "<select data-i=\"" + i + "\" class=\"kaal-vali\">" + opts + "</select>";
        }
        h += "<li>" + (r.pilt ? "<img class=\"korv-pilt\" src=\"" + r.pilt + "\" alt=\"\">" : "") + "<span class=\"korv-nimi\">" + r.nimi + "</span>" + kaalValik +
          "<span class=\"samm\"><button type=\"button\" class=\"vahenda-rida\" data-i=\"" + i + "\">−</button><span>" + r.kogus + "</span><button type=\"button\" class=\"suurenda-rida\" data-i=\"" + i + "\">+</button></span>" +
          "<span class=\"korv-hind\">" + reaHind(r) + "</span>" +
          "<button type=\"button\" class=\"prügi\" data-i=\"" + i + "\" aria-label=\"eemalda\"><svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\"><path fill=\"currentColor\" d=\"M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z\"/></svg></button></li>";
      });
      h += "</ul><div class=\"korv-summa\"><span>Kokku</span><span>" + korviSumma() + "</span></div>";
      korvEl.innerHTML = h;
      uuendaMakse();
      uuendaMark();
    }
    function korviSumma() {
      var summa = 0;
      var puudu = false;
      korv.forEach(function (r) {
        var tekst = reaHind(r);
        if (tekst === "hinda ei ole") { puudu = true; return; }
        summa += parseFloat(tekst.replace(",", ".").replace(/[^\d.]/g, "")) || 0;
      });
      var s = (Math.round(summa * 100) / 100).toString().replace(".", ",") + " €";
      return puudu ? s + " +" : s;
    }
    var makseLink = vorm.querySelector(".makse-link");
    var makseSumma = vorm.querySelector(".makse-summa");
    function summaPuudu() {
      return korv.some(function (r) { return reaHind(r) === "hinda ei ole"; });
    }
    function uuendaMakse() {
      if (!makseLink) return;
      var kohe = vorm.querySelector("[name=makse][value=kohe]");
      if (kohe && summaPuudu()) {
        kohe.disabled = true;
        if (kohe.checked) vorm.querySelector("[name=makse][value=kohapeal]").checked = true;
      } else if (kohe) kohe.disabled = false;
      var valik = vorm.querySelector("[name=makse]:checked");
      var nahta = valik && valik.value === "kohe";
      makseLink.hidden = !nahta;
      if (makseSumma) makseSumma.textContent = korviSumma();
      makseLink.classList.toggle("kinni", !korv.length || summaPuudu());
    }
    vorm.addEventListener("change", function (e) {
      if (e.target && e.target.name === "makse") uuendaMakse();
    });
    if (makseLink) makseLink.addEventListener("click", function (e) {
      e.preventDefault();
      olek.textContent = "Makselink tuleb, kui lepingupartner on ühendatud. Summa on " + korviSumma() + ".";
    });

    var vahenda = vorm.querySelector(".vahenda");
    var suurenda = vorm.querySelector(".suurenda");
    if (vahenda) vahenda.addEventListener("click", function () {
      var n = Math.max(1, (+kogus.value || 1) - 1);
      kogus.value = n;
    });
    if (suurenda) suurenda.addEventListener("click", function () {
      kogus.value = (+kogus.value || 1) + 1;
    });
    if (lisa) {
      lisa.addEventListener("click", function () {
        if (!kringel || !kringel.value) return;
        korv.push({ nimi: kringel.value, kaal: kaal.value, kogus: kogus.value || "1" });
        joonista();
      });
    }
    if (korvEl) {
      korvEl.addEventListener("click", function (e) {
        var b = e.target.closest ? e.target.closest("button") : null;
        if (!b) return;
        var i = +b.getAttribute("data-i");
        if (b.classList.contains("prügi")) {
          korv.splice(i, 1);
        } else if (b.classList.contains("vahenda-rida") && korv[i]) {
          korv[i].kogus = String(Math.max(1, (parseInt(korv[i].kogus, 10) || 1) - 1));
        } else if (b.classList.contains("suurenda-rida") && korv[i]) {
          korv[i].kogus = String((parseInt(korv[i].kogus, 10) || 1) + 1);
        } else return;
        joonista();
      });
      korvEl.addEventListener("change", function (e) {
        var s = e.target.closest ? e.target.closest(".kaal-vali") : null;
        if (!s) return;
        var i = +s.getAttribute("data-i");
        if (korv[i]) korv[i].kaal = s.value;
        joonista();
      });
    }
    var tuvastus = vorm.querySelector(".tuvastus");
    var olek = document.querySelector(".olek");
    var keelatud = {};
    var paev = vorm.querySelector("[name=paev]");
    function kontrolliPaev() {
      if (!paev || !paev.value) return;
      var p = keelatud[paev.value];
      if (p !== undefined) {
        olek.textContent = p ? "See päev ei sobi: " + p : "See päev ei sobi. Vali teine.";
        paev.value = "";
      }
    }
    if (paev) paev.addEventListener("change", kontrolliPaev);
    fetch("seaded.json")
      .then(function (r) { return r.json(); })
      .then(function (s) {
        if (!s || !s.keelatud_paevad) return;
        return fetch(s.keelatud_paevad);
      })
      .then(function (r) { return r ? r.text() : ""; })
      .then(function (csv) {
        if (!csv) return;
        csv.split("\n").slice(1).forEach(function (rida) {
          var osad = rida.split(",");
          var d = (osad[0] || "").trim();
          var p = (osad[1] || "").trim();
          if (d) keelatud[d] = p;
        });
      })
      .catch(function () {});
    vorm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nimi = vorm.querySelector("[name=nimi]");
      var tel = vorm.querySelector("[name=telefon]");
      var ep = vorm.querySelector("[name=epost]");
      if (!nimi.value.trim()) {
        olek.textContent = "Nimi vajab täitmist.";
        nimi.focus();
        return;
      }
      if (!tel.value.trim()) {
        olek.textContent = "Telefon vajab täitmist.";
        tel.focus();
        return;
      }
      if (!/^\+?[0-9]+$/.test(tel.value)) {
        olek.textContent = "Telefonis tohib olla ainult numbreid.";
        tel.focus();
        return;
      }
      if (!ep.value.trim()) {
        olek.textContent = "E-post vajab täitmist.";
        ep.focus();
        return;
      }
      if (ep.value.indexOf("@") < 0) {
        olek.textContent = "E-postis peab olema @.";
        ep.focus();
        return;
      }
      if (!korv.length) {
        olek.textContent = "Lisa vähemalt üks toode.";
        return;
      }
      olek.textContent = "";
      tuvastus.hidden = false;
    });
    var kinnita = vorm.querySelector(".kinnita");
    if (kinnita) {
      kinnita.addEventListener("click", function () {
        var inimene = vorm.querySelector("[name=inimene]");
        if (!inimene.checked) {
          olek.textContent = "Kinnita, et oled inimene.";
          return;
        }
        tuvastus.hidden = true;
        olek.textContent = "Tellimus on saadetud. Kinnituskiri on e-postile saadetud. Kättesaamispäeval saadame SMS-meeldetuletuse.";
        korv = [];
        joonista();
      });
    }
  }

  fetch("seaded.json")
    .then(function (r) { return r.json(); })
    .then(function (s) {
      if (!s) return;
      if (s.riba) {
        if (s.riba.oranz) ribaVarv.oranz = s.riba.oranz;
        if (s.riba.sinine) ribaVarv.sinine = s.riba.sinine;
        if (s.riba.valge) ribaVarv.valge = s.riba.valge;
        if (typeof s.riba.lapa === "number") ribaLapa = Math.max(0, Math.min(100, s.riba.lapa));
        seaSormed();
      }
      document.querySelectorAll(".sots a.fb").forEach(function (a) {
        if (s.facebook) a.href = s.facebook;
      });
      document.querySelectorAll(".sots a.ig").forEach(function (a) {
        if (s.instagram) a.href = s.instagram;
      });
      document.querySelectorAll("a[href^='tel:']").forEach(function (a) {
        if (s.telefon) a.href = "tel:" + s.telefon;
      });
      document.querySelectorAll("[data-seade='aadress']").forEach(function (el) {
        if (s.aadress) el.textContent = s.aadress;
      });
      document.querySelectorAll("[data-seade='telefon']").forEach(function (el) {
        if (s.telefon_kuva) el.textContent = s.telefon_kuva;
        if (s.telefon) el.href = "tel:" + s.telefon;
      });
      seaRingid(s.ringid || {});
    })
    .catch(function () {});

  function seaRingid(suurused) {
    var kast = document.querySelector(".ringid");
    if (!kast) return;
    var vmin = Math.min(window.innerWidth, window.innerHeight) / 100;
    var d = {
      valge: (suurused.valge || 28) * vmin,
      sinine: (suurused.sinine || 32) * vmin,
      oranz: (suurused.oranz || 36) * vmin
    };
    var kylg = 18 * vmin;
    var korgus = kylg * Math.sqrt(3) / 2;
    var w = kylg + Math.max(d.valge, d.sinine, d.oranz);
    var h = korgus + Math.max(d.valge, d.sinine, d.oranz);
    kast.style.width = w + "px";
    kast.style.height = h + "px";
    var kesk = {
      oranz: { x: w / 2 + kylg / 2, y: h / 2 + korgus / 3 },
      sinine: { x: 0, y: 0 },
      valge: { x: 0, y: 0 }
    };
    kesk.sinine.x = kesk.oranz.x - kylg;
    kesk.sinine.y = kesk.oranz.y;
    kesk.valge.x = kesk.oranz.x - kylg / 2;
    kesk.valge.y = kesk.oranz.y - korgus;
    var tsenter = {
      x: (kesk.oranz.x + kesk.sinine.x + kesk.valge.x) / 3,
      y: (kesk.oranz.y + kesk.sinine.y + kesk.valge.y) / 3
    };
    var nihuta = { x: kesk.sinine.x - tsenter.x, y: kesk.sinine.y - tsenter.y };
    ["valge", "sinine", "oranz"].forEach(function (nimi) {
      kesk[nimi].x += nihuta.x;
      kesk[nimi].y += nihuta.y;
    });
    ["valge", "sinine", "oranz"].forEach(function (nimi) {
      var el = kast.querySelector(".ring-" + nimi);
      if (!el) return;
      el.style.width = d[nimi] + "px";
      el.style.height = d[nimi] + "px";
      el.style.left = (kesk[nimi].x - d[nimi] / 2) + "px";
      el.style.top = (kesk[nimi].y - d[nimi] / 2) + "px";
    });
    var grupid = document.querySelector(".grupid");
    var main = document.querySelector("main");
    if (grupid && main && grupid.offsetHeight) {
      var gr = grupid.getBoundingClientRect();
      var mr = main.getBoundingClientRect();
      var x = gr.right - gr.width * 0.12 - mr.left;
      var y = gr.top + gr.height * 0.42 - mr.top;
      kast.style.left = (x - w / 2) + "px";
      kast.style.top = (y - h / 2) + "px";
      kast.style.right = "auto";
      kast.style.transform = "none";
    }
  }
  window.addEventListener("resize", function () {
    fetch("seaded.json").then(function (r) { return r.json(); }).then(function (s) {
      seaRingid(s.ringid || {});
    }).catch(function () { seaRingid({}); });
  });

})();
