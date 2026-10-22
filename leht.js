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
          var img = document.createElement("img");
          img.src = teed[0];
          img.alt = t.nimi || "";
          nupp.appendChild(img);
          var silt = document.createElement("span");
          silt.className = "nimi";
          silt.textContent = t.nimi || "";
          nupp.appendChild(silt);
          if (t.tekst) {
            var tekst = document.createElement("span");
            tekst.className = "tekst";
            tekst.textContent = t.tekst;
            nupp.appendChild(tekst);
          }
          var link = document.createElement("a");
          link.className = "telli-link";
          link.href = "#telli";
          link.textContent = "Lisa tellimusse";
          nupp.appendChild(link);
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

  function sulgeVaade() {
    vaade.classList.remove("sees");
    kujud.innerHTML = "";
    suurTelli.hidden = true;
  }

  document.addEventListener("click", function (e) {
    var nupp = e.target.closest ? e.target.closest(".pisi") : null;
    if (!nupp) return;
    var pildid = (nupp.getAttribute("data-pildid") || "").split("|");
    var sildid = (nupp.getAttribute("data-sildid") || "").split("|");
    kujud.innerHTML = "";
    pildid.forEach(function (src, i) {
      if (!src) return;
      var kast = document.createElement("figure");
      kast.className = "kuju";
      var img = document.createElement("img");
      img.src = src;
      img.alt = nupp.querySelector("img").alt;
      kast.appendChild(img);
      if (sildid[i]) {
        var silt = document.createElement("span");
        silt.textContent = sildid[i];
        kast.appendChild(silt);
      }
      kujud.appendChild(kast);
    });
    suurTelli.hidden = false;
    vaade.classList.add("sees");
  });

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
    if (dx < 8 && dy < 8 && !keris && e.target.closest && e.target.closest(".kuju")) sulgeVaade();
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
    suurTelli.addEventListener("click", avaVorm);
    document.querySelectorAll(".telli-link").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var nimi = a.closest(".pisi") ? a.closest(".pisi").querySelector(".nimi").textContent : "";
        if (nimi) {
          korv.push({ nimi: nimi, kaal: "1,0 kg", kogus: "1" });
          joonista();
        }
        avaVorm();
      });
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
    function hind(r) {
      return "—";
    }
    function joonista() {
      if (!korvEl) return;
      if (!korv.length) { korvEl.innerHTML = ""; return; }
      var kaalud = ["0,5 kg", "1,0 kg", "1,5 kg", "2,0 kg"];
      var h = "<ul>";
      korv.forEach(function (r, i) {
        var opts = kaalud.map(function (k) {
          return "<option" + (k === r.kaal ? " selected" : "") + ">" + k + "</option>";
        }).join("");
        h += "<li>" + r.nimi + " <select data-i=\"" + i + "\" class=\"kaal-vali\">" + opts + "</select> · " + r.kogus + " tk · " + hind(r) + " <button type=\"button\" data-i=\"" + i + "\">eemalda</button></li>";
      });
      h += "</ul>";
      korvEl.innerHTML = h;
    }
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
        korv.splice(i, 1);
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
      var tel = vorm.querySelector("[name=telefon]");
      var ep = vorm.querySelector("[name=epost]");
      if (!tel.value || !ep.value) {
        olek.textContent = "Telefon ja e-post on kohustuslikud.";
        return;
      }
      if (!/^\+?[0-9]+$/.test(tel.value)) {
        olek.textContent = "Telefonis tohib olla ainult numbreid.";
        return;
      }
      if (ep.value.indexOf("@") < 0) {
        olek.textContent = "E-postis peab olema @.";
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
    })
    .catch(function () {});

})();
