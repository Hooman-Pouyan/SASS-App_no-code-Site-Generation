export function loadGoftino(goftinoToken: string): void {

  var i = goftinoToken, a: any = window, d = document;

  function g() {
    var g = d.createElement("script"), s = "https://www.goftino.com/widget/" + i,
      l = localStorage.getItem("goftino_" + i);
    g.async = !0, g.src = l ? s + "?o=" + l : s;
    d.getElementsByTagName("head")[0].appendChild(g);
  }

  "complete" === d.readyState ? g() : a.attachEvent ? a.attachEvent("onload", g) : a.addEventListener("load", g, !1);
}

export function loadClarity(clarityToken: string): void {
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments)
    };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", clarityToken);
}

export function loadYektanet(yektanetToken: string): void {
  var n = "yektanet", t: any = window, e = document;

  t.yektanetAnalyticsObject = n, t[n] = t[n] || function () {
    t[n].q.push(arguments)
  }, t[n].q = t[n].q || [];
  var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(),
    c = e.getElementsByTagName("script")[0], s = e.createElement("script");
  s.id = `ua-script-${yektanetToken}`;
  s.dataset.analyticsobject = n;
  s.async = true;
  s.type = "text/javascript";
  s.src = `https://cdn.yektanet.com/rg_woebegone/scripts_v3/${yektanetToken}/rg.complete.js?v=` + r, c.parentNode.insertBefore(s, c)
}

export function loadGTagManager(gTagToken: string): void {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      'gtm.start':
        new Date().getTime(), event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
      j: any = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
      'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', gTagToken);
}
