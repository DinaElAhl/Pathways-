/* Shared helpers for the student and teacher apps. */
window.R = (function () {
  var PALETTE = ["#2F7D5B", "#9A6B12", "#A9452F", "#5E4A86", "#1E7A8A", "#8A5A2B", "#3D6A9E", "#7A4E6E"];
  var KNOWN = { vocab: 0, context: 1, grammar: 2, analysis: 3, eca: 4, culture: 5 };

  var DEFAULT_SECTIONS = [
    { id: "vocab", name: "المفردات", goal: "أشرح معاني المفردات في النص، وأستخدمها في جمل جديدة." },
    { id: "context", name: "السياق", goal: "أفهم أحداث النص وسياقه." },
    { id: "grammar", name: "النحو والتراكيب", goal: "أتعرّف على تراكيب نحوية في النص وأفهم وظيفتها." },
    { id: "analysis", name: "التحليل والأسلوب", goal: "أحلّل أسلوب الكاتب." },
    { id: "eca", name: "الفصحى والعامية", goal: "أربط تعبيرات النص بالعامية المصرية." },
    { id: "culture", name: "الثقافة والانغماس", goal: "أربط النص بأماكن ومواقف حقيقية." }
  ];

  function color(section, i) {
    var k = section && KNOWN[section.id];
    return PALETTE[(k !== undefined ? k : i) % PALETTE.length];
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ==highlight==  **bold**  (applied after escaping, so it is safe) */
  function inline(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/==(.+?)==/g, "<mark>$1</mark>");
  }

  /* Body text: lines starting with "> " become example lines. */
  function body(s) {
    if (!s) return "";
    return String(s).split(/\n/).map(function (line) {
      line = line.trim();
      if (!line) return "";
      if (line.indexOf("> ") === 0 || line.indexOf(">") === 0 && line.length > 1) return '<p class="ex">' + inline(line.replace(/^>\s?/, "")) + "</p>";
      return "<p>" + inline(line) + "</p>";
    }).join("");
  }

  /* Wrap glossary terms in a paragraph with tappable buttons. Longest terms first, no nesting. */
  function glossify(para, glossary) {
    var html = esc(para);
    var terms = (glossary || []).map(function (g, i) { return { t: esc(g.term || "").trim(), i: i }; })
      .filter(function (x) { return x.t; })
      .sort(function (a, b) { return b.t.length - a.t.length; });
    var slots = [];
    terms.forEach(function (x) {
      var at = html.indexOf(x.t);
      if (at === -1) return;
      var token = "\u0001" + slots.length + "\u0002";
      slots.push('<button type="button" class="w" data-g="' + x.i + '" aria-expanded="false">' + x.t + "</button>");
      html = html.slice(0, at) + token + html.slice(at + x.t.length);
    });
    return html.replace(/\u0001(\d+)\u0002/g, function (_, n) { return slots[+n]; });
  }

  function renderBlock(b, lesson) {
    var t = b.title ? "<h3>" + esc(b.title) + "</h3>" : "";
    if (b.type === "flash") {
      return '<div class="learn">' + t + body(b.body) + '<div class="flash">' +
        (lesson.glossary || []).map(function (g, i) { return '<button type="button" data-flash="' + i + '" aria-pressed="false">' + esc(g.term) + "</button>"; }).join("") +
        "</div></div>";
    }
    if (b.type === "pairs") {
      var head = b.head || ["", ""];
      return '<div class="learn">' + t + '<div class="table-wrap"><table class="bridge"><thead><tr><th>' + esc(head[0]) + "</th><th>" + esc(head[1]) + "</th></tr></thead><tbody>" +
        (b.rows || []).map(function (r) { return "<tr><td>" + inline(r[0]) + '</td><td class="eca">' + inline(r[1]) + "</td></tr>"; }).join("") +
        "</tbody></table></div>" + body(b.body) + "</div>";
    }
    if (b.type === "chain") {
      return '<div class="learn">' + t + '<div class="chain">' +
        (b.items || []).map(function (it, i) { return (i ? '<span class="arr" aria-hidden="true">←</span>' : "") + '<span class="node">' + esc(it) + "</span>"; }).join("") +
        "</div>" + body(b.body) + "</div>";
    }
    if (b.type === "cards") {
      return '<div class="learn">' + t + (b.items || []).map(function (c) {
        return '<div class="place"><h4>' + esc(c.title) + "</h4>" + (c.body ? "<p>" + inline(c.body) + "</p>" : "") +
          (c.task ? '<p class="do"><b>المهمّة:</b> ' + inline(c.task) + "</p>" : "") + "</div>";
      }).join("") + body(b.body) + "</div>";
    }
    return '<div class="learn">' + t + body(b.body) + "</div>";
  }

  /* Editor <-> block conversions (plain text formats a teacher can type). */
  function blockToText(b) {
    if (b.type === "pairs") return [(b.head || ["", ""]).join(" | ")].concat((b.rows || []).map(function (r) { return r.join(" | "); })).join("\n");
    if (b.type === "chain") return (b.items || []).join("\n");
    if (b.type === "cards") return (b.items || []).map(function (c) { return [c.title, c.body, c.task].join(" | "); }).join("\n");
    return b.body || "";
  }
  function textToBlock(type, title, text, extra) {
    var lines = String(text || "").split(/\n/).map(function (l) { return l.trim(); }).filter(Boolean);
    var b = { type: type, title: title || "" };
    if (type === "pairs") {
      var split = function (l) { var p = l.split("|"); return [(p[0] || "").trim(), p.slice(1).join("|").trim()]; };
      b.head = lines.length ? split(lines[0]) : ["", ""];
      b.rows = lines.slice(1).map(split);
      b.body = extra || "";
    } else if (type === "chain") {
      b.items = lines; b.body = extra || "";
    } else if (type === "cards") {
      b.items = lines.map(function (l) { var p = l.split("|"); return { title: (p[0] || "").trim(), body: (p[1] || "").trim(), task: (p[2] || "").trim() }; });
      b.body = extra || "";
    } else {
      b.body = text || "";
    }
    return b;
  }

  function wordCount(t) { return (String(t || "").trim().match(/\S+/g) || []).length; }
  function fmt(ms) {
    var s = Math.round((ms || 0) / 1000);
    if (s < 60) return s + " ث";
    return Math.floor(s / 60) + " د " + (s % 60) + " ث";
  }

  var client;
  function db() {
    if (client !== undefined) return client;
    var c = window.ROOTS_CONFIG || {};
    var ok = c.SUPABASE_URL && c.SUPABASE_URL.indexOf("YOUR_") !== 0 && c.SUPABASE_ANON_KEY && c.SUPABASE_ANON_KEY.indexOf("YOUR_") !== 0;
    client = ok && window.supabase ? window.supabase.createClient(c.SUPABASE_URL, c.SUPABASE_ANON_KEY) : null;
    return client;
  }

  /* Make sure a lesson object has every field the apps read. */
  function normalize(L) {
    L = L || {};
    L.title = L.title || "درس بلا عنوان";
    L.paragraphs = Array.isArray(L.paragraphs) ? L.paragraphs : [];
    L.glossary = Array.isArray(L.glossary) ? L.glossary : [];
    L.sections = (Array.isArray(L.sections) ? L.sections : []).map(function (s, i) {
      s.id = s.id || "s" + (i + 1);
      s.blocks = Array.isArray(s.blocks) ? s.blocks : [];
      s.questions = (Array.isArray(s.questions) ? s.questions : []).filter(function (q) { return q && q.stem && Array.isArray(q.options) && q.options.length >= 2; });
      return s;
    });
    if (L.writing && !L.writing.task) L.writing = null;
    return L;
  }

  function copyText(text, statusEl) {
    function done(ok) { if (statusEl) statusEl.textContent = ok ? " تم النسخ" : " تعذّر النسخ، انسخه يدويًا"; }
    try { navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); }); }
    catch (e) { done(false); }
  }

  return {
    PALETTE: PALETTE, DEFAULT_SECTIONS: DEFAULT_SECTIONS, color: color, esc: esc, inline: inline, body: body,
    glossify: glossify, renderBlock: renderBlock, blockToText: blockToText, textToBlock: textToBlock,
    wordCount: wordCount, fmt: fmt, db: db, normalize: normalize, copyText: copyText
  };
})();
