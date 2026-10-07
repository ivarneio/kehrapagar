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