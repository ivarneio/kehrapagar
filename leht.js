  function pikkus(t, i, k) {
    var serv = t < 0.5 ? 75 - 32 * (t / 0.5) : 43 + 21 * ((t - 0.5) / 0.5);
    var hype = [0.05, -0.07, 0.09, -0.04, 0.06];
    var samm = [0, 0.11, 0.23, 0.34, 0.44][k] || 0.44;
    var w = serv * (1 - samm) + hype[(i * 2 + k) % hype.length] * 12;
    if (w > 75) w = 75;
    if (w < 26) w = 26;
    return Math.round(w);
  }