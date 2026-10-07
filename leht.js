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
  function varvi() {
    document.documentElement.style.setProperty("--riba-oranz", ribaVarv.oranz);
    document.documentElement.style.setProperty("--riba-sinine", ribaVarv.sinine);
    document.documentElement.style.setProperty("--riba-valge", ribaVarv.valge);
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
    nupp.appendChild(teeSorm(ylemine));
    nupp.appendChild(nimi);
  });
  function pikkus(t, i, k) {
    var serv = t < 0.5 ? 75 - 32 * (t / 0.5) : 43 + 21 * ((t - 0.5) / 0.5);
    var hype = [0.05, -0.07, 0.09, -0.04, 0.06];
    var samm = [0, 0.11, 0.23, 0.34, 0.44][k] || 0.44;
    var w = serv * (1 - samm) + hype[(i * 2 + k) % hype.length] * 12;
    if (w > 75) w = 75;
    if (w < 26) w = 26;
    return Math.round(w);
  }
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
      var t = n === 1 ? 0 : i / (n - 1);
      if (g.classList.contains("lahti")) t = 0;
      g.querySelectorAll(".sorm i").forEach(function (bar, k) {
        bar.style.width = pikkus(t, i, k) + "%";
        bar.style.marginLeft = "0";
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

  function osa(riba) {
    return riba.scrollWidth / 3;
  }

  function hoia(riba) {
    var p = osa(riba);
    if (p <= 0) return;
    if (riba.scrollLeft < p * 0.5) riba.scrollLeft += p;
    else if (riba.scrollLeft > p * 1.5) riba.scrollLeft -= p;
  }

  function seaLint(riba) {
    if (riba.getAttribute("data-lint")) return;
    var orig = Array.prototype.slice.call(riba.children);
    var ees = document.createDocumentFragment();
    var jarel = document.createDocumentFragment();
    orig.forEach(function (el) {
      ees.appendChild(el.cloneNode(true));
      jarel.appendChild(el.cloneNode(true));
    });
    riba.insertBefore(ees, riba.firstChild);
    riba.appendChild(jarel);
    riba.setAttribute("data-lint", "1");
    requestAnimationFrame(function () {
      riba.scrollLeft = osa(riba);
    });
  }

  function avaLint(grupp) {
    var riba = grupp.querySelector(".riba");
    if (!riba) return;
    seaLint(riba);
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
        }
        seaSormed();
        flipKinni = false;
      }, FLIP_MS + 30);
    });
  }

  document.querySelectorAll(".grupid .grupp > button").forEach(function (nupp) {
    nupp.addEventListener("click", function () {
      var grupp = nupp.parentElement;
      if (!lava) return;
      if (vahemLiikumine) {
        var oliVaikne = grupp.classList.contains("lahti");
        kaardid().forEach(sulgeGrupp);
        if (!oliVaikne) {
          lava.insertBefore(grupp, lava.firstChild);
          grupp.classList.add("lahti");
          avaLint(grupp);
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
    });
  });

  document.querySelectorAll(".riba").forEach(function (riba) {
    riba.addEventListener("wheel", function (e) {
      if (!riba.getAttribute("data-lint")) seaLint(riba);
      var samm = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      e.preventDefault();
      riba.scrollLeft += samm;
      hoia(riba);
    }, { passive: false });
    riba.addEventListener("scroll", function () {
      if (riba.getAttribute("data-lint")) hoia(riba);
    });
  });

  var telli = document.querySelector("#telli");
  if (telli) {
    var telliNupp = telli.querySelector(":scope > button");
    if (telliNupp) {
      telliNupp.addEventListener("click", function () {
        var oli = telli.classList.contains("lahti");
        sulgeGrupp(telli);
        if (!oli) telli.classList.add("lahti");
      });
    }
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
    var nimi = nupp.getAttribute("data-kringel");
    suurTelli.hidden = !nimi;
    suurTelli.setAttribute("data-kringel", nimi || "");
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
    var tee = vorm.querySelector("[name=tee]");
    var taidised = document.querySelector(".taidised");
    function naitaTaidised() {
      taidised.hidden = tee.value !== "fantaasia";
    }
    tee.addEventListener("change", naitaTaidised);
    naitaTaidised();

    suurTelli.addEventListener("click", function () {
      if (kringel && suurTelli.getAttribute("data-kringel")) {
        kringel.value = suurTelli.getAttribute("data-kringel");
      }
      tee.value = "valmis";
      naitaTaidised();
      sulgeVaade();
      telli.classList.add("lahti");
      telli.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    vorm.addEventListener("submit", function (e) {
      e.preventDefault();
      document.querySelector(".olek").textContent = sona("olek_luu") || "See on luu. Kiri ei lähe veel välja.";
    });
  }

  fetch("seaded.json")
    .then(function (r) { return r.json(); })
    .then(function (s) {
      if (!s) return;
      if (s.riba) {
        if (s.riba.oranz) ribaVarv.oranz = s.riba.oranz;
        if (s.riba.sinine) ribaVarv.sinine = s.riba.sinine;
        if (s.riba.valge) ribaVarv.valge = s.riba.valge;
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
