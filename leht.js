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
      if (t) el.textContent = t;
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
    grupp.querySelectorAll(".paneel.lahti").forEach(function (p) {
      p.classList.remove("lahti");
    });
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

  document.querySelectorAll(".toode > button.ava").forEach(function (nupp) {
    nupp.addEventListener("click", function () {
      var toode = nupp.parentElement;
      var paneel = toode.querySelector(".paneel");
      var oli = paneel.classList.contains("lahti");
      toode.parentElement.querySelectorAll(".paneel.lahti").forEach(function (p) {
        p.classList.remove("lahti");
      });
      if (!oli) paneel.classList.add("lahti");
    });
  });

  document.querySelectorAll(".lahemalt").forEach(function (nupp) {
    nupp.addEventListener("click", function () {
      nupp.nextElementSibling.classList.toggle("lahti");
    });
  });

  var vorm = document.querySelector("form");
  if (vorm && telli) {
    var kringel = vorm.querySelector("[name=kringel]");
    var tee = vorm.querySelector("[name=tee]");
    var taidised = document.querySelector(".taidised");
    function naitaTaidised() {
      taidised.hidden = tee.value !== "fantaasia";
    }
    tee.addEventListener("change", naitaTaidised);
    naitaTaidised();

    document.querySelectorAll(".telli-nupp").forEach(function (nupp) {
      nupp.addEventListener("click", function () {
        kringel.value = nupp.getAttribute("data-kringel");
        tee.value = "valmis";
        naitaTaidised();
        telli.classList.add("lahti");
        telli.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    vorm.addEventListener("submit", function (e) {
      e.preventDefault();
      document.querySelector(".olek").textContent = sona("olek_luu") || "See on luu. Kiri ei lähe veel välja.";
    });
  }

  var vaade = document.querySelector(".taisekraan");
  if (vaade) {
    var suur = vaade.querySelector("img");
    document.querySelectorAll(".pisipildid button").forEach(function (nupp) {
      nupp.addEventListener("click", function () {
        suur.src = nupp.querySelector("img").src;
        suur.alt = nupp.querySelector("img").alt;
        vaade.classList.add("sees");
      });
    });
    function sulgeVaade() { vaade.classList.remove("sees"); }
    suur.addEventListener("click", sulgeVaade);
    vaade.addEventListener("click", function (e) {
      if (e.target === vaade) sulgeVaade();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") sulgeVaade();
    });
  }
})();
