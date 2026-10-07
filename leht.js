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
  var nupud = document.querySelectorAll(".grupid .grupp > button");
  nupud.forEach(function (nupp, i) {
    var nimi = document.createElement("span");
    nimi.className = "sorm-nimi";
    nimi.textContent = nupp.textContent.trim();
    nupp.textContent = "";
    var jarjekord = ylemine;
    if (nupud.length > 2 && i === nupud.length - 2) jarjekord = sild;
    if (nupud.length > 2 && i === nupud.length - 1) jarjekord = alumine;
    nupp.appendChild(teeSorm(jarjekord));
    nupp.appendChild(nimi);
  });
  function pikkus(t, i, k) {
    var pohi = 44 + 31 * Math.abs(2 * t - 1);
    var hype = [0.07, -0.05, 0.1, -0.08, 0.04];
    var samm = [0, 0.14, 0.27, 0.39, 0.5][k] || 0.5;
    var w = pohi * (1 - samm) + hype[(i + k) % hype.length] * 16;
    if (w > 75) w = 75;
    if (w < 28) w = 28;
    return Math.round(w);
  }