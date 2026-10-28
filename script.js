/* رمز الدينار العراقي: سلوك الصفحة. CC0 */
(function () {
  "use strict";

  /* ---------- هندسة الرمز (وحدات الرسم) ---------- */
  var VIEWBOX = "37.25 34.25 110.75 91.5";
  var PATH = "M60.25 125.81L60.25 34.19L68.35 34.27L70.67 34.35L72.95 34.47L75.2 34.64L77.42 34.85L79.59 35.12L81.74 35.42L83.84 35.78L85.91 36.17L87.95 36.61L89.95 37.09L91.91 37.62L93.84 38.19L95.73 38.79L97.58 39.44L99.4 40.13L101.18 40.86L102.92 41.62L104.62 42.42L106.29 43.26L107.92 44.14L109.51 45.04L111.05 45.99L112.56 46.97L114.04 47.98L115.47 49.02L116.86 50.09L118.21 51.19L119.52 52.33L120.79 53.49L122.02 54.68L123.21 55.89L124.35 57.13L125.46 58.4L126.52 59.69L127.54 61L128.52 62.34L129.46 63.7L130.35 65.08L131.21 66.47L132.02 67.89L132.78 69.33L133.51 70.78L134.19 72.24L134.83 73.73L135.42 75.22L135.97 76.73L137.06 80L135.97 83.27L135.42 84.78L134.83 86.27L134.19 87.76L133.51 89.22L132.78 90.67L132.02 92.11L131.21 93.53L130.35 94.92L129.46 96.3L128.52 97.66L127.54 99L126.52 100.31L125.46 101.6L124.35 102.87L123.21 104.11L122.02 105.32L120.79 106.51L119.52 107.67L118.21 108.81L116.86 109.91L115.47 110.98L114.04 112.02L112.56 113.03L111.05 114.01L109.51 114.96L107.92 115.86L106.29 116.74L104.62 117.58L102.92 118.38L101.18 119.14L99.4 119.87L97.58 120.56L95.73 121.21L93.84 121.81L91.91 122.38L89.95 122.91L87.95 123.39L85.91 123.83L83.84 124.22L81.74 124.58L79.59 124.88L77.42 125.15L75.2 125.36L72.95 125.53L70.67 125.65L68.35 125.73ZM68.11 114.23L70.18 114.16L72.22 114.05L74.21 113.9L76.17 113.71L78.09 113.48L79.97 113.21L81.81 112.9L83.62 112.56L85.39 112.18L87.11 111.76L88.8 111.31L90.46 110.82L92.07 110.3L93.65 109.75L95.19 109.17L96.69 108.55L98.16 107.91L99.59 107.24L100.98 106.54L102.34 105.81L103.66 105.05L104.94 104.27L106.19 103.47L107.4 102.63L108.57 101.78L109.71 100.9L110.81 100L111.88 99.08L112.91 98.14L113.91 97.17L114.87 96.19L115.79 95.18L116.69 94.16L117.54 93.12L118.36 92.07L119.15 90.99L119.9 89.9L120.62 88.8L121.3 87.68L121.95 86.54L122.56 85.4L123.14 84.24L123.69 83.06L124.2 81.88L124.67 80.68L125.11 79.47L124.94 80L125.11 80.53L124.67 79.32L124.2 78.12L123.69 76.94L123.14 75.76L122.56 74.6L121.95 73.46L121.3 72.32L120.62 71.2L119.9 70.1L119.15 69.01L118.36 67.93L117.54 66.88L116.69 65.84L115.79 64.82L114.87 63.81L113.91 62.83L112.91 61.86L111.88 60.92L110.81 60L109.71 59.1L108.57 58.22L107.4 57.37L106.19 56.53L104.94 55.73L103.66 54.95L102.34 54.19L100.98 53.46L99.59 52.76L98.16 52.09L96.69 51.45L95.19 50.83L93.65 50.25L92.07 49.7L90.46 49.18L88.8 48.69L87.11 48.24L85.39 47.82L83.62 47.44L81.81 47.1L79.97 46.79L78.09 46.52L76.17 46.29L74.21 46.1L72.22 45.95L70.18 45.84L68.11 45.77L71.75 45.81L71.75 114.19ZM37.25 34.25L48.75 34.25L48.75 125.75L37.25 125.75ZM118.94 100.25L148 100.25L148 111.75L103.41 111.75Z";
  var S = 11.5;                           // سماكة كل الخطوط
  var R = 72.8125;                        // نصف قطر محور القوس
  var CA = 112.8125, CB = 47.1875;        // مركزا الدائرتين (x = 66)

  /* ---------- أدوات صغيرة ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var toastEl = $("#toast"), toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 1700);
  }
  function copyText(text, okMsg) {
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0;top:0";
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      toast(ok ? okMsg : "تعذّر النسخ، انسخ يدوياً");
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { toast(okMsg); }, fallback);
    } else { fallback(); }
  }
  function saveBlob(blob, name) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
  }
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- ملف SVG جاهز بلون محدد ---------- */
  function svgString(color, height) {
    var w = 110.75, h = 91.5, k = (height || 91.5) / h;
    var attrs = height ? ' width="' + (w * k).toFixed(2) + '" height="' + height + '"' : "";
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + VIEWBOX + '"' + attrs + '>' +
      '<title>رمز الدينار العراقي</title><path fill="' + color + '" d="' + PATH + '"/></svg>';
  }

  /* ---------- الوضع الليلي ---------- */
  var root = document.documentElement, themeBtn = $("#themeBtn");
  var SUN = '<circle cx="12" cy="12" r="4.2" fill="currentColor"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>';
  var MOON = '<path d="M20 14.5A8 8 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" fill="currentColor"/>';
  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paintTheme() { $("#themeIco").innerHTML = isDark() ? SUN : MOON; }
  var savedTheme = safeGet("iqd-theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  paintTheme();
  themeBtn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next); safeSet("iqd-theme", next); paintTheme();
  });

  /* ---------- العرض: اللون والخلفية والحجم ---------- */
  var stage = $("#stage"), color = "#12141C";
  function setColor(c) {
    color = c;
    stage.style.setProperty("--mark", c);
    $$("#colorSwatches .sw[data-color]").forEach(function (b) {
      b.setAttribute("aria-checked", String(b.dataset.color.toLowerCase() === c.toLowerCase()));
    });
    $("#colorPick").value = c.length === 7 ? c : "#12141c";
    refreshCode();
  }
  $$("#colorSwatches .sw[data-color]").forEach(function (b) {
    b.addEventListener("click", function () { setColor(b.dataset.color); });
  });
  $("#colorPick").addEventListener("input", function (e) { setColor(e.target.value.toUpperCase()); });

  $$("#bgSeg button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$("#bgSeg button").forEach(function (x) { x.setAttribute("aria-checked", String(x === b)); });
      stage.dataset.bg = b.dataset.bg;
      if (b.dataset.bg === "ink" && color === "#12141C") setColor("#FFFFFF");
      if (b.dataset.bg !== "ink" && color === "#FFFFFF") setColor("#12141C");
    });
  });
  $("#sizeRange").addEventListener("input", function (e) {
    stage.style.setProperty("--s", e.target.value + "px");
  });
  stage.style.setProperty("--s", $("#sizeRange").value + "px");
  stage.style.setProperty("--mark", color);

  /* ---------- اختيار الرمز (الأصلي افتراضياً) ---------- */
  var VARIANTS = Array.isArray(window.IQD_VARIANTS) ? window.IQD_VARIANTS : [];
  var stageMarkEl = $("#stageMark"), stageImg = $("#stageImg"), picker = $("#picker");
  function setHidden(el, on) { if (on) el.setAttribute("hidden", ""); else el.removeAttribute("hidden"); }
  function pickVariant(id) {
    var v = null;
    VARIANTS.forEach(function (x) { if (x.id === id) v = x; });
    $$("#picker .pick").forEach(function (b) { b.setAttribute("aria-checked", String(b.dataset.id === id)); });
    if (!v) {
      setHidden(stageMarkEl, false); setHidden(stageImg, true);
      return;
    }
    stageImg.style.setProperty("--img", 'url("' + v.src + '")');
    stageImg.style.setProperty("--ar", v.w + " / " + v.h);
    stageImg.setAttribute("aria-label", v.label);
    setHidden(stageMarkEl, true); setHidden(stageImg, false);
  }
  function addPick(id, label, thumb) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "pick"; b.dataset.id = id;
    b.setAttribute("role", "radio"); b.setAttribute("aria-checked", "false");
    b.appendChild(thumb);
    var t = document.createElement("span"); t.textContent = label; b.appendChild(t);
    b.addEventListener("click", function () { pickVariant(id); });
    picker.appendChild(b);
  }
  var origThumb = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  origThumb.setAttribute("class", "mark"); origThumb.setAttribute("aria-hidden", "true");
  origThumb.innerHTML = '<use href="#iqd"/>';
  addPick("original", "الرمز الأصلي", origThumb);
  VARIANTS.forEach(function (v) {
    var th = document.createElement("span"); th.className = "thumb"; th.setAttribute("aria-hidden", "true");
    th.style.setProperty("--img", 'url("' + v.src + '")');
    th.style.setProperty("--ar", v.w + " / " + v.h);
    addPick(v.id, v.label, th);
  });
  picker.addEventListener("keydown", function (e) {
    var items = $$("#picker .pick"), i = items.indexOf(document.activeElement), n = null;
    if (i < 0) return;
    if (e.key === "ArrowLeft") n = items[(i + 1) % items.length];
    if (e.key === "ArrowRight") n = items[(i + items.length - 1) % items.length];
    if (n) { n.focus(); pickVariant(n.dataset.id); e.preventDefault(); }
  });
  pickVariant("original");

  /* ---------- التحميل والنسخ ---------- */
  function downloadPng(px, name) {
    var h = px, w = Math.round(px * 110.75 / 91.5);
    var img = new Image();
    img.onload = function () {
      var c = document.createElement("canvas"); c.width = w; c.height = h;
      c.getContext("2d").drawImage(img, 0, 0, w, h);
      c.toBlob(function (b) { b ? saveBlob(b, name) : toast("تعذّر إنشاء الصورة"); }, "image/png");
    };
    img.onerror = function () { toast("تعذّر إنشاء الصورة"); };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString(color, h));
  }
  var ACTIONS = {
    "svg": function () { saveBlob(new Blob([svgString(color)], { type: "image/svg+xml" }), "iraqi-dinar-symbol.svg"); },
    "png-s": function () { downloadPng(256, "iraqi-dinar-symbol-small.png"); },
    "png-m": function () { downloadPng(512, "iraqi-dinar-symbol-medium.png"); },
    "png-l": function () { downloadPng(1024, "iraqi-dinar-symbol-large.png"); },
    "copy-svg": function () { copyText(svgString(color), "تم نسخ كود SVG"); },
    "copy-char": function () { copyText("", "تم نسخ الرمز كنص"); }
  };
  $$("[data-act]").forEach(function (b) {
    b.addEventListener("click", function () { ACTIONS[b.dataset.act](); });
  });
  $$("[data-dl]").forEach(function (b) {
    b.addEventListener("click", function () {
      saveBlob(new Blob([svgString(b.dataset.dl)], { type: "image/svg+xml" }), "iraqi-dinar-symbol-" + b.dataset.name + ".svg");
    });
  });

  /* ---------- أمثلة الاستخدام ---------- */
  function refreshCode() {
    $("#code-svg").textContent =
      '<svg class="iqd" viewBox="' + VIEWBOX + '" width="1.2em" height="1em"\n' +
      '     fill="currentColor" role="img" aria-label="دينار عراقي">\n' +
      '  <path d="' + PATH.slice(0, 60) + '..."/>\n</svg>\n\n' +
      "<!-- الكود الكامل بزر «نسخ كود SVG» في قسم التحميل -->";
    $("#code-font").textContent =
      '@font-face{\n  font-family:"IQD Symbol";\n  src:url("iqd-symbol.woff") format("woff");\n' +
      '  unicode-range:U+E900; font-display:swap;\n}\n' +
      '.iqd{font-family:"IQD Symbol",sans-serif;font-style:normal;line-height:1}\n\n' +
      '<span class="iqd">&#xE900;</span>';
    $("#code-img").textContent =
      '<img src="iraqi-dinar-symbol.svg" alt="دينار عراقي" height="20">\n\n' +
      "/* أو كخلفية */\n.price::after{content:\"\";display:inline-block;height:1em;width:1.2em;\n" +
      "  background:url(iraqi-dinar-symbol.svg) center/contain no-repeat}";
  }
  $$(".cp").forEach(function (b) {
    b.addEventListener("click", function () {
      var el = document.getElementById(b.dataset.copy), txt = el.textContent;
      if (b.dataset.copy === "code-svg") txt = svgString(color, 20);
      copyText(txt, "تم النسخ");
    });
  });

  var tabs = $$('[role="tab"]');
  tabs.forEach(function (t) {
    t.addEventListener("click", function () { selectTab(t); });
    t.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(t), n = null;
      if (e.key === "ArrowLeft") n = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowRight") n = tabs[(i + tabs.length - 1) % tabs.length];
      if (n) { n.focus(); selectTab(n); e.preventDefault(); }
    });
  });
  function selectTab(sel) {
    tabs.forEach(function (t) {
      var on = t === sel;
      t.setAttribute("aria-selected", String(on));
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
  }
  refreshCode();

  /* ---------- مخطط البناء ---------- */
  var layers = { parts: true, circles: true, axes: false, grid: false };
  function f(n) { return String(Math.round(n * 100) / 100); }
  function build() {
    var out = [], ro = R + S / 2, ri = R - S / 2;
    var tipX = 131, tipY = 80;
    if (layers.grid) {
      for (var gx = -20; gx <= 170; gx += S) out.push('<line class="gridline" x1="' + f(gx) + '" y1="-40" x2="' + f(gx) + '" y2="210"/>');
      for (var gy = -40; gy <= 210; gy += S) out.push('<line class="gridline" x1="-22" y1="' + f(gy) + '" x2="170" y2="' + f(gy) + '"/>');
    }
    var cls = layers.parts ? ["part p1", "part p2", "part arc p3", "part p4"] : ["plain", "plain", "plain arc", "plain"];
    out.push('<rect class="' + cls[0] + '" x="37.25" y="34.25" width="' + S + '" height="91.5"/>');
    out.push('<rect class="' + cls[1] + '" x="60.25" y="34.25" width="' + S + '" height="91.5"/>');
    out.push('<path class="' + cls[2] + '" stroke-width="' + S + '" stroke-linejoin="miter" stroke-miterlimit="10" fill="none" d="M66 40A' + f(R) + " " + f(R) + " 0 0 1 " + tipX + " " + tipY + "A" + f(R) + " " + f(R) + ' 0 0 1 66 120"/>');
    out.push('<rect class="' + cls[3] + '" x="108" y="100.25" width="40" height="' + S + '"/>');
    if (layers.circles) {
      [CA, CB].forEach(function (cy) {
        [ro, R, ri].forEach(function (r) {
          out.push('<circle class="circ" cx="66" cy="' + f(cy) + '" r="' + f(r) + '"/>');
        });
        out.push('<path class="ctr" d="M60 ' + f(cy) + "H72M66 " + f(cy - 6) + "V" + f(cy + 6) + '"/>');
      });
      out.push('<text x="82" y="' + f(CA + 2.5) + '">مركز A</text><text x="82" y="' + f(CB + 2.5) + '">مركز B</text>');
    }
    if (layers.axes) {
      out.push('<path class="axis" d="M43 40V120M66 40V120"/>');
      out.push('<path class="axis" d="M66 40A' + f(R) + " " + f(R) + " 0 0 1 " + tipX + " " + tipY + "A" + f(R) + " " + f(R) + ' 0 0 1 66 120"/>');
      out.push('<path class="axis" d="M108 106H148"/>');
    }
    $("#buildSvg").innerHTML = out.join("");
  }
  $$("#layers input").forEach(function (c) {
    c.addEventListener("change", function () { layers[c.dataset.layer] = c.checked; build(); });
  });
  build();

  /* ---------- تثبيت الرمز في الأمكنة المرسومة بـ <use> بدون دعم (احتياط) ---------- */
  if (!("fill" in document.createElementNS("http://www.w3.org/2000/svg", "path").style)) {
    $$("svg.mark use").forEach(function (u) {
      var p = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      p.setAttribute("viewBox", VIEWBOX); p.innerHTML = '<path fill="currentColor" d="' + PATH + '"/>';
      u.parentNode.replaceChild(p, u);
    });
  }
})();
