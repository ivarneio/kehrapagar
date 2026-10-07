  function pikkus(i, n, k) {
    var servalt = Math.min(i, n - 1 - i);
    var serv = (i > (n - 1) / 2 ? 70 : 75) - servalt * 14;
    var hype = [1, -1, 1, 0, -1];
    var samm = [0, 3, 5, 7, 8][k] || 8;
    var w = serv - samm + hype[(i + k) % hype.length];
    if (w > 75) w = 75;
    if (w < 28) w = 28;
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
      var koht = g.classList.contains("lahti") ? 0 : i;
      g.querySelectorAll(".sorm i").forEach(function (bar, k) {
        bar.style.width = pikkus(koht, n, k) + "%";
        bar.style.marginLeft = "0";
      });
    });
  }