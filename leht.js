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

  document.querySelectorAll(".keeled button").forEach(function (nupp) {
    nupp.addEventListener("click", function () {
      document.querySelectorAll(".keeled button").forEach(function (x) {
        x.classList.toggle("sees", x === nupp);
      });
    });
  });

  function sulgeGrupp(grupp) {
    grupp.classList.remove("lahti");
    grupp.querySelectorAll(".paneel.lahti").forEach(function (p) {
      p.classList.remove("lahti");
    });
  }

  document.querySelectorAll(".grupp > button").forEach(function (nupp) {
    nupp.addEventListener("click", function () {
      var grupp = nupp.parentElement;
      var oli = grupp.classList.contains("lahti");
      document.querySelectorAll(".grupp.lahti").forEach(sulgeGrupp);
      if (!oli) grupp.classList.add("lahti");
    });
  });

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

  var telli = document.querySelector("#telli");
  var vorm = document.querySelector("form");
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

  var vaade = document.querySelector(".taisekraan");
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

  vorm.addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelector(".olek").textContent = "See on luu. Kiri ei lähe veel välja.";
  });
})();
