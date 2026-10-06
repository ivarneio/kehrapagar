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
      if (t) {
        if (el.classList.contains("sulge")) el.setAttribute("aria-label", t);
        else el.textContent = t;
      }
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
  }

  var lava = document.querySelector(".grupid");
  var FLIP_MS = 400;
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

  function liiguta(uus, ava) {
    var koik = kaardid();
    var enne = {};
    koik.forEach(function (k) { enne[k.getAttribute("data-jrk")] = k.getBoundingClientRect(); });
    koik.forEach(sulgeGrupp);
    if (ava) lava.insertBefore(uus, lava.firstChild);
    else taastaJarjekord();
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
        if (ava) uus.classList.add("lahti");
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
        if (!oliVaikne) grupp.classList.add("lahti");
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
      if (vahemLiikumine) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      var max = riba.scrollWidth - riba.clientWidth;
      if (max <= 1) return;
      var otsasParemal = riba.scrollLeft >= max - 1;
      var otsasVasakul = riba.scrollLeft <= 0;
      if ((e.deltaY > 0 && otsasParemal) || (e.deltaY < 0 && otsasVasakul)) return;
      e.preventDefault();
      riba.scrollLeft += e.deltaY;
    }, { passive: false });
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

  function sulgeVaade() {
    vaade.classList.remove("sees");
    kujud.innerHTML = "";
    suurTelli.hidden = true;
  }

  document.querySelectorAll(".pisi").forEach(function (nupp) {
    nupp.addEventListener("click", function () {
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
  });

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
})();
