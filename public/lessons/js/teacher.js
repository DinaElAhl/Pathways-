/* Teacher app: sign in, lesson library, lesson editor, student links, results. */
(function () {
  var esc = R.esc;
  var app = document.getElementById("app");
  var client = R.db();
  var user = null, lessons = [], view = "list", E = null, msg = null, results = null, resultsLesson = null;

  var BLOCK_TYPES = [
    { v: "text", label: "شرح", hint: "اكتب الشرح. السطر الذي يبدأ بـ «> » يظهر مثالًا. ضع ==كلمة== لتمييزها، و**كلمة** للخط العريض." },
    { v: "pairs", label: "جدول مقارنة (مثل: فصحى | عامية)", hint: "السطر الأول عنوانا العمودين: الفصحى | العامية. وكلّ سطر بعده صفّ: العبارة | مقابلها." },
    { v: "chain", label: "تسلسل (مثل: رحلة النص)", hint: "كلّ مرحلة في سطر، بالترتيب." },
    { v: "cards", label: "بطاقات أماكن أو مهام", hint: "كلّ بطاقة في سطر: العنوان | الوصف | المهمّة" },
    { v: "flash", label: "بطاقات المفردات", hint: "تُصنع البطاقات تلقائيًا من قائمة المفردات. اكتب هنا تعليمات قصيرة (اختياري)." }
  ];
  var hasExtra = { pairs: 1, chain: 1, cards: 1 };

  function studentLink(id) { return location.href.replace(/teacher\.html.*$/, "").replace(/[?#].*$/, "") + "index.html?lesson=" + id; }
  function flash(text, kind) { msg = { text: text, kind: kind || "ok" }; }
  function msgHtml() { if (!msg) return ""; var h = '<div class="' + (msg.kind === "ok" ? "okmsg" : "err") + '" role="status">' + esc(msg.text) + "</div>"; msg = null; return h; }

  /* ---------- editor model ---------- */
  function toEditor(row) {
    var raw = JSON.parse(JSON.stringify((row && row.content) || {}));
    var rawTitle = (row && row.title) || raw.title || "";
    var c = R.normalize(raw);
    return {
      id: row && row.id || null,
      title: rawTitle,
      published: !!(row && row.published),
      accessCode: (row && row.access_code) || "",
      subtitle: c.subtitle || "", source: c.source || "",
      paragraphsText: c.paragraphs.join("\n\n"),
      glossaryText: c.glossary.map(function (g) { return g.term + " | " + g.meaning; }).join("\n"),
      sections: c.sections.map(function (s) {
        return {
          id: s.id, name: s.name || "", goal: s.goal || "", review: s.review || "",
          blocks: s.blocks.map(function (b) { return { type: b.type || "text", title: b.title || "", text: R.blockToText(b), extra: hasExtra[b.type] ? (b.body || "") : "" }; }),
          questions: s.questions.map(function (q) { return { stem: q.stem, optionsText: q.options.join("\n"), answer: q.answer || 0, support: q.support || "" }; })
        };
      }),
      writingOn: !!c.writing,
      writing: {
        task: c.writing && c.writing.task || "", requirementsText: (c.writing && c.writing.requirements || []).join("\n"),
        minWords: c.writing && c.writing.minWords || 60, maxWords: c.writing && c.writing.maxWords || 120,
        summary: c.writing && c.writing.summary || "", modelAnswer: c.writing && c.writing.modelAnswer || ""
      }
    };
  }
  function lines(t) { return String(t || "").split(/\n/).map(function (l) { return l.trim(); }).filter(Boolean); }
  function fromEditor() {
    var errors = [];
    if (!E.title.trim()) errors.push("اكتب عنوان الدرس.");
    var paragraphs = String(E.paragraphsText || "").split(/\n\s*\n/).map(function (p) { return p.replace(/\s*\n\s*/g, " ").trim(); }).filter(Boolean);
    if (!paragraphs.length) errors.push("أضف نصّ الدرس.");
    var glossary = lines(E.glossaryText).map(function (l) { var p = l.split("|"); return { term: (p[0] || "").trim(), meaning: p.slice(1).join("|").trim() }; }).filter(function (g) { return g.term && g.meaning; });
    var sections = E.sections.map(function (s, si) {
      if (!s.name.trim()) errors.push("القسم " + (si + 1) + ": اكتب اسم القسم.");
      return {
        id: s.id, name: s.name.trim(), goal: s.goal.trim(), review: s.review.trim(),
        blocks: s.blocks.map(function (b) { return R.textToBlock(b.type, b.title.trim(), b.text, b.extra); }),
        questions: s.questions.map(function (q, qi) {
          var opts = lines(q.optionsText);
          if (q.stem.trim() && opts.length < 2) errors.push("«" + s.name + "»، السؤال " + (qi + 1) + ": اكتب خيارين على الأقل.");
          if (q.stem.trim() && +q.answer >= opts.length) errors.push("«" + s.name + "»، السؤال " + (qi + 1) + ": اختر الإجابة الصحيحة.");
          return { stem: q.stem.trim(), options: opts, answer: +q.answer, support: q.support.trim() };
        }).filter(function (q) { return q.stem; })
      };
    });
    var writing = null;
    if (E.writingOn) {
      if (!E.writing.task.trim()) errors.push("الكتابة: اكتب المهمة، أو ألغِ قسم الكتابة.");
      writing = { task: E.writing.task.trim(), requirements: lines(E.writing.requirementsText), minWords: +E.writing.minWords || 0, maxWords: +E.writing.maxWords || 0, summary: E.writing.summary.trim(), modelAnswer: E.writing.modelAnswer.trim() };
    }
    var content = { title: E.title.trim(), subtitle: E.subtitle.trim(), source: E.source.trim(), paragraphs: paragraphs, glossary: glossary, sections: sections, writing: writing };
    return { errors: errors, content: content };
  }

  function getPath(path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, E); }
  function setPath(path, val) {
    var ks = path.split("."), o = E;
    for (var i = 0; i < ks.length - 1; i++) o = o[ks[i]];
    o[ks[ks.length - 1]] = val;
  }
  function field(label, path, opts) {
    opts = opts || {};
    var v = getPath(path), id = "f_" + path.replace(/\./g, "_");
    var input = opts.area
      ? '<textarea class="in' + (opts.ar ? " ar" : "") + '" id="' + id + '" data-path="' + path + '" rows="' + (opts.rows || 3) + '"' + (opts.ph ? ' placeholder="' + esc(opts.ph) + '"' : "") + ">" + esc(v) + "</textarea>"
      : '<input class="in" id="' + id + '" data-path="' + path + '" type="' + (opts.type || "text") + '" value="' + esc(v) + '"' + (opts.ph ? ' placeholder="' + esc(opts.ph) + '"' : "") + ">";
    return '<label class="f" for="' + id + '">' + label + "</label>" + input + (opts.hint ? '<p class="fhint">' + opts.hint + "</p>" : "");
  }

  /* ---------- views ---------- */
  function loginView() {
    return '<div class="card"><h2>دخول المعلّم</h2>' + msgHtml() +
      '<form id="login">' +
      '<label class="f" for="email">البريد الإلكتروني</label><input class="in" id="email" type="email" autocomplete="email" required dir="ltr">' +
      '<label class="f" for="pass">كلمة المرور</label><input class="in" id="pass" type="password" autocomplete="current-password" required dir="ltr">' +
      '<div class="nav"><span></span><button class="btn primary" type="submit">دخول</button></div></form>' +
      '<p class="note-small">حسابات المعلّمين تُنشأ من لوحة Supabase (انظر دليل الإعداد).</p></div>';
  }

  function setupView() {
    return '<div class="card"><h2>الإعداد لم يكتمل بعد</h2><p>لربط لوحة المعلّم بقاعدة البيانات، أضف رابط Supabase ومفتاحه في ملف <b>js/config.js</b>، كما في دليل الإعداد (README).</p>' +
      '<p>حتى ذلك الحين، يمكنك تجربة صفحة الطالب بالدرس النموذجي: <a href="index.html">افتح الدرس النموذجي</a>.</p></div>';
  }

  function listView() {
    var items = lessons.length ? lessons.map(function (l) {
      return '<div class="item"><div><h3>' + esc(l.title) + '</h3><span class="tag-pub ' + (l.published ? "on" : "off") + '">' + (l.published ? "منشور" : "مسودّة") + "</span>" + (l.access_code ? ' <span class="tag-pub off">رمز الفصل: ' + esc(l.access_code) + "</span>" : ' <span class="tag-pub off">بلا رمز</span>') + ' <span class="note-small">آخر تعديل: ' + new Date(l.updated_at).toLocaleDateString("ar-EG") + "</span></div>" +
        '<div class="row"><button class="btn small" data-act="edit" data-id="' + l.id + '">تعديل</button>' +
        '<button class="btn small" data-act="link" data-id="' + l.id + '"' + (l.published ? "" : " disabled title=\"انشر الدرس أولًا\"") + ">نسخ رابط الطلاب</button>" +
        '<a class="btn small" href="index.html?lesson=' + l.id + '" target="_blank" rel="noopener">معاينة</a>' +
        '<button class="btn small" data-act="results" data-id="' + l.id + '">النتائج</button>' +
        '<button class="btn small danger" data-act="del" data-id="' + l.id + '">حذف</button></div></div>';
    }).join("") : '<p class="lead">لا توجد دروس بعد. ابدأ بدرس جديد، أو استورد الدرس النموذجي «السلحفاة والبطّتان» وعدّل عليه.</p>';
    return '<div class="card"><div class="row" style="justify-content:space-between"><h2>دروسي</h2><button class="btn ghost small" data-act="logout">خروج</button></div>' + msgHtml() +
      '<div class="row" style="margin:6px 0 10px"><button class="btn primary" data-act="new">درس جديد</button><button class="btn" data-act="import">استيراد الدرس النموذجي</button></div>' +
      '<div class="lesson-list">' + items + '</div><p class="note-small" id="copy-status" role="status"></p></div>';
  }

  function blockForm(si, bi) {
    var b = E.sections[si].blocks[bi], base = "sections." + si + ".blocks." + bi;
    var t = BLOCK_TYPES.filter(function (x) { return x.v === b.type; })[0] || BLOCK_TYPES[0];
    return '<div class="sub-box"><div class="row" style="justify-content:space-between"><b>شرح ' + (bi + 1) + '</b><button class="btn small danger" data-act="del-block" data-s="' + si + '" data-b="' + bi + '">حذف</button></div>' +
      '<label class="f" for="t_' + si + "_" + bi + '">النوع</label><select class="in" id="t_' + si + "_" + bi + '" data-path="' + base + '.type" data-rerender="1">' +
      BLOCK_TYPES.map(function (x) { return '<option value="' + x.v + '"' + (x.v === b.type ? " selected" : "") + ">" + x.label + "</option>"; }).join("") + "</select>" +
      field("العنوان", base + ".title") +
      field("المحتوى", base + ".text", { area: 1, ar: 1, rows: 4, hint: t.hint }) +
      (hasExtra[b.type] ? field("ملاحظة تحته (اختياري)", base + ".extra", { area: 1, rows: 2 }) : "") + "</div>";
  }

  function questionForm(si, qi) {
    var q = E.sections[si].questions[qi], base = "sections." + si + ".questions." + qi;
    var opts = lines(q.optionsText);
    return '<div class="sub-box"><div class="row" style="justify-content:space-between"><b>سؤال ' + (qi + 1) + '</b><button class="btn small danger" data-act="del-q" data-s="' + si + '" data-q="' + qi + '">حذف</button></div>' +
      field("السؤال", base + ".stem") +
      field("الخيارات (كلّ خيار في سطر)", base + ".optionsText", { area: 1, rows: 3 }) +
      '<label class="f" for="a_' + si + "_" + qi + '">الإجابة الصحيحة</label><select class="in" id="a_' + si + "_" + qi + '" data-path="' + base + '.answer" data-num="1">' +
      (opts.length ? opts.map(function (o, i) { return '<option value="' + i + '"' + (i === +q.answer ? " selected" : "") + ">" + (i + 1) + ". " + esc(o) + "</option>"; }).join("") : '<option value="0">اكتب الخيارات أولًا</option>') + "</select>" +
      field("الشرح الإضافي عند الخطأ", base + ".support", { area: 1, rows: 2, hint: "يظهر للطالب إذا أخطأ، قبل أن يحاول مرة أخرى." }) + "</div>";
  }

  function sectionForm(si) {
    var s = E.sections[si], base = "sections." + si;
    return '<div class="box section" style="border-inline-start-color:' + R.color(s, si) + '"><h3><span>القسم ' + (si + 1) + ": " + esc(s.name || "بلا اسم") + "</span>" +
      '<span class="row"><button class="btn small" data-act="up" data-s="' + si + '"' + (si ? "" : " disabled") + ' aria-label="أعلى">↑</button><button class="btn small" data-act="down" data-s="' + si + '"' + (si < E.sections.length - 1 ? "" : " disabled") + ' aria-label="أسفل">↓</button><button class="btn small danger" data-act="del-section" data-s="' + si + '">حذف القسم</button></span></h3>' +
      field("اسم القسم", base + ".name") +
      field("الهدف (يراه الطالب ويقيّم نفسه فيه)", base + ".goal") +
      "<h3 style=\"margin-top:12px\">الشرح</h3>" + s.blocks.map(function (_, bi) { return blockForm(si, bi); }).join("") +
      '<div class="row" style="margin-top:8px"><button class="btn small" data-act="add-block" data-s="' + si + '">+ إضافة شرح</button></div>' +
      "<h3 style=\"margin-top:12px\">الأسئلة</h3>" + s.questions.map(function (_, qi) { return questionForm(si, qi); }).join("") +
      '<div class="row" style="margin-top:8px"><button class="btn small" data-act="add-q" data-s="' + si + '">+ إضافة سؤال</button></div>' +
      field("مهمّة المراجعة (تظهر للطالب إذا احتاج دعمًا في هذا القسم)", base + ".review", { area: 1, rows: 2 }) + "</div>";
  }

  function editView() {
    var used = E.sections.map(function (s) { return s.id; });
    var avail = R.DEFAULT_SECTIONS.filter(function (d) { return used.indexOf(d.id) === -1; });
    return '<div class="card"><div class="row" style="justify-content:space-between"><h2>' + (E.id ? "تعديل الدرس" : "درس جديد") + '</h2><button class="btn ghost small" data-act="back">رجوع إلى الدروس</button></div>' + msgHtml() +
      '<div class="box"><h3>النصّ</h3>' +
      field("عنوان الدرس", "title") +
      field("وصف قصير", "subtitle", { ph: "مثال: نصّ من «كليلة ودمنة» · للمستوى المتقدّم" }) +
      field("المصدر", "source") +
      field("النصّ الأصلي", "paragraphsText", { area: 1, ar: 1, rows: 8, hint: "الصق النصّ كما هو. اترك سطرًا فارغًا بين كلّ فقرة وأخرى." }) +
      field("المفردات", "glossaryText", { area: 1, ar: 1, rows: 5, hint: "كلّ كلمة في سطر: الكلمة كما هي في النصّ بتشكيلها | معناها. تظهر الكلمة منقّطة في النصّ، ويلمسها الطالب ليرى معناها." }) +
      "</div>" +
      E.sections.map(function (_, si) { return sectionForm(si); }).join("") +
      '<div class="box"><h3>إضافة قسم</h3><div class="row">' +
      avail.map(function (d) { return '<button class="btn small" data-act="add-section" data-def="' + d.id + '">+ ' + d.name + "</button>"; }).join("") +
      '<button class="btn small" data-act="add-section">+ قسم آخر</button></div></div>' +
      '<div class="box"><h3>الكتابة والتصحيح الآلي</h3><label class="row"><input type="checkbox" data-path="writingOn" data-bool="1"' + (E.writingOn ? " checked" : "") + "> تضمين مهمّة كتابة في آخر الدرس</label>" +
      (E.writingOn ?
        field("المهمّة", "writing.task", { area: 1, rows: 2 }) +
        field("المتطلّبات (كلّ متطلّب في سطر)", "writing.requirementsText", { area: 1, rows: 4, hint: "تظهر للطالب، ويستعملها التصحيح الآلي، وقائمة المراجعة الذاتية." }) +
        '<div class="row"><div style="flex:1;min-width:140px">' + field("أقلّ عدد كلمات", "writing.minWords", { type: "number" }) + '</div><div style="flex:1;min-width:140px">' + field("أكثر عدد كلمات", "writing.maxWords", { type: "number" }) + "</div></div>" +
        field("ملخّص النصّ وحكمته (للمصحّح الآلي)", "writing.summary", { area: 1, rows: 2, hint: "جملتان أو ثلاث: ماذا يحدث في النصّ، وما فكرته. لا يراها الطالب." }) +
        field("نموذج إجابة (يظهر للطالب في المراجعة الذاتية)", "writing.modelAnswer", { area: 1, ar: 1, rows: 4 })
        : "") + "</div>" +
      '<div class="box"><h3>النشر والدخول</h3><label class="row"><input type="checkbox" data-path="published" data-bool="1"' + (E.published ? " checked" : "") + "> <b>منشور:</b> يستطيع الطلاب فتحه بالرابط</label>" +
      field("رمز الفصل", "accessCode", { ph: "مثال: casa-fall-26", hint: "يكتبه الطالب مرة واحدة قبل أن يبدأ. أعطيه للفصل منفصلًا عن الرابط. اتركيه فارغًا ليفتح الدرس لكلّ مَن معه الرابط. يُفضّل ٦ أحرف أو أكثر." }) + "</div>" +
      '<div class="nav"><button class="btn ghost" data-act="back">إلغاء</button><button class="btn primary" data-act="save">حفظ الدرس</button></div></div>';
  }

  function resultsView() {
    var L = resultsLesson, rows = results || [];
    var head = '<div class="card"><div class="row" style="justify-content:space-between"><h2>نتائج: ' + esc(L.title) + '</h2><button class="btn ghost small" data-act="back">رجوع إلى الدروس</button></div>' + msgHtml();
    if (!rows.length) return head + '<p class="lead">لا توجد نتائج بعد. أرسل رابط الطلاب، وستظهر النتائج هنا عندما يُكملون الدرس.</p></div>';
    var secs = (L.content.sections || []).map(function (s) { return { id: s.id, name: s.name }; });
    var avg = secs.map(function (s) {
      var sum = 0, n = 0;
      rows.forEach(function (r) { var x = (r.data.sections || []).filter(function (y) { return y.id === s.id; })[0]; if (x && x.total) { sum += x.score / x.total; n++; } });
      return { name: s.name, v: n ? sum / n : 0 };
    });
    var totalPct = Math.round(rows.reduce(function (a, r) { return a + (r.data.totalQ ? r.data.firstRight / r.data.totalQ : 0); }, 0) / rows.length * 100);
    var needCount = {};
    rows.forEach(function (r) { (r.data.needs || []).forEach(function (id) { needCount[id] = (needCount[id] || 0) + 1; }); });
    var html = head +
      '<div class="kpis"><div class="kpi"><div class="v">' + rows.length + '</div><div class="l">طالب أكمل الدرس</div></div>' +
      '<div class="kpi"><div class="v">' + totalPct + '%</div><div class="l">متوسّط الصحيح من أول مرة</div></div></div>' +
      '<h3>متوسّط الفصل في كلّ مهارة</h3><div class="bars">' + avg.map(function (a, i) {
        return '<div class="bar-row"><div class="lbl"><span>' + esc(a.name) + "</span><span>" + Math.round(a.v * 100) + '%</span></div><div class="track"><div class="fill" style="width:' + a.v * 100 + "%;background:" + R.color(secs[i], i) + '"></div></div></div>';
      }).join("") + "</div>" +
      '<h3>مَن يحتاج متابعة؟</h3>' + secs.map(function (s) {
        var n = needCount[s.id] || 0; return n ? '<div class="insight">' + esc(s.name) + ": " + n + " من " + rows.length + " طالب</div>" : "";
      }).join("") +
      '<h3 style="margin-top:14px">الطلاب</h3><div class="table-wrap"><table><thead><tr><th>الطالب</th><th class="hide-sm">التاريخ</th><th>صحيح من أول مرة</th>' +
      secs.map(function (s) { return '<th class="hide-sm">' + esc(s.name) + "</th>"; }).join("") + "<th>الكتابة</th></tr></thead><tbody>" +
      rows.map(function (r) {
        var d = r.data, w = d.writing;
        var wTxt = w && w.last ? Object.keys(w.last).map(function (k) { return w.last[k]; }).join("·") + "/4" : (w && w.words ? w.words + " كلمة" : "—");
        return "<tr><td>" + esc(r.student_name) + (r.class_name ? '<br><span class="note-small">' + esc(r.class_name) + "</span>" : "") + '</td><td class="hide-sm">' + new Date(r.created_at).toLocaleDateString("ar-EG") + "</td><td>" + d.firstRight + "/" + d.totalQ + "</td>" +
          secs.map(function (s) { var x = (d.sections || []).filter(function (y) { return y.id === s.id; })[0]; return '<td class="hide-sm">' + (x ? x.score + "/" + x.total : "—") + "</td>"; }).join("") +
          "<td>" + wTxt + (w && w.text ? ' <button class="btn small" data-act="essay" data-id="' + r.id + '">النصّ</button>' : "") + "</td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<div id="essay-box"></div>' +
      '<div class="row" style="margin-top:10px"><button class="btn" data-act="csv">تنزيل النتائج (CSV)</button></div></div>';
    return html;
  }

  function render() {
    var y = window.scrollY;
    if (!client) app.innerHTML = setupView();
    else if (!user) app.innerHTML = loginView();
    else if (view === "edit") app.innerHTML = editView();
    else if (view === "results") app.innerHTML = resultsView();
    else app.innerHTML = listView();
    return y;
  }
  function rerenderKeep() { var y = window.scrollY; render(); window.scrollTo(0, y); }

  /* ---------- data ---------- */
  function loadLessons() {
    return client.from("lessons").select("id,title,published,updated_at,content,access_code").eq("owner", user.id).order("updated_at", { ascending: false })
      .then(function (r) { if (r.error) flash("تعذّر تحميل الدروس: " + r.error.message, "err"); lessons = r.data || []; });
  }
  function saveLesson() {
    var out = fromEditor();
    if (out.errors.length) { flash(out.errors.join(" "), "err"); rerenderKeep(); window.scrollTo(0, 0); return; }
    var row = { title: out.content.title, content: out.content, published: E.published, access_code: String(E.accessCode || "").trim() || null, owner: user.id, updated_at: new Date().toISOString() };
    var q = E.id ? client.from("lessons").update(row).eq("id", E.id).select("id").single() : client.from("lessons").insert(row).select("id").single();
    q.then(function (r) {
      if (r.error) { flash("تعذّر الحفظ: " + r.error.message, "err"); rerenderKeep(); return; }
      E.id = r.data.id;
      flash("تم حفظ الدرس." + (E.published ? "" : " هو مسودّة الآن: فعّل «منشور» ليفتحه الطلاب."));
      loadLessons().then(function () { view = "list"; render(); window.scrollTo(0, 0); });
    });
  }
  function csv() {
    var L = resultsLesson, secs = L.content.sections || [];
    var head = ["الطالب", "الفصل", "التاريخ", "صحيح من أول مرة", "عدد الأسئلة"].concat(secs.map(function (s) { return s.name; })).concat(["الكتابة: كلمات", "الكتابة: مفردات", "الكتابة: فهم", "الكتابة: نحو", "الكتابة: تحليل", "يحتاج متابعة في"]);
    var rows = results.map(function (r) {
      var d = r.data, w = d.writing || {}, last = w.last || {};
      return [r.student_name, r.class_name || "", new Date(r.created_at).toISOString().slice(0, 10), d.firstRight, d.totalQ]
        .concat(secs.map(function (s) { var x = (d.sections || []).filter(function (y) { return y.id === s.id; })[0]; return x ? x.score + "/" + x.total : ""; }))
        .concat([w.words || "", last.vocab || "", last.context || "", last.grammar || "", last.analysis || "",
          (d.needs || []).map(function (id) { var s = secs.filter(function (x) { return x.id === id; })[0]; return s ? s.name : id; }).join("، ")]);
    });
    var text = "﻿" + [head].concat(rows).map(function (r) { return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(","); }).join("\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/csv;charset=utf-8" }));
    a.download = (L.title || "results") + ".csv";
    document.body.appendChild(a); a.click(); a.remove();
  }

  /* ---------- events ---------- */
  app.addEventListener("submit", function (e) {
    if (e.target.id !== "login") return;
    e.preventDefault();
    client.auth.signInWithPassword({ email: document.getElementById("email").value.trim(), password: document.getElementById("pass").value })
      .then(function (r) {
        if (r.error) { flash("لم ينجح الدخول. تأكّد من البريد وكلمة المرور.", "err"); render(); return; }
        user = r.data.user; loadLessons().then(render);
      });
  });

  app.addEventListener("input", function (e) {
    var p = e.target.dataset && e.target.dataset.path;
    if (!p || !E) return;
    var v = e.target.dataset.bool ? e.target.checked : e.target.value;
    if (e.target.dataset.num) v = +v;
    setPath(p, v);
    if (/optionsText$/.test(p)) {
      var sel = e.target.closest(".sub-box").querySelector("select[data-num]");
      var opts = lines(v), cur = +getPath(p.replace(/optionsText$/, "answer"));
      if (sel) sel.innerHTML = opts.length ? opts.map(function (o, i) { return '<option value="' + i + '"' + (i === cur ? " selected" : "") + ">" + (i + 1) + ". " + esc(o) + "</option>"; }).join("") : '<option value="0">اكتب الخيارات أولًا</option>';
    }
  });
  app.addEventListener("change", function (e) {
    var p = e.target.dataset && e.target.dataset.path;
    if (!p || !E) return;
    var v = e.target.dataset.bool ? e.target.checked : e.target.value;
    if (e.target.dataset.num) v = +v;
    setPath(p, v);
    if (e.target.dataset.rerender || e.target.dataset.bool) rerenderKeep();
  });

  app.addEventListener("click", function (e) {
    var t = e.target.closest("button[data-act]");
    if (!t) return;
    var a = t.dataset.act, si = +t.dataset.s, id = t.dataset.id;
    var L = lessons.filter(function (x) { return x.id === id; })[0];
    if (a === "logout") { client.auth.signOut().then(function () { user = null; render(); }); }
    else if (a === "new") {
      E = toEditor({ content: { sections: R.DEFAULT_SECTIONS.slice(0, 4).map(function (d) { return { id: d.id, name: d.name, goal: d.goal, blocks: [{ type: d.id === "vocab" ? "flash" : "text", title: "", body: "" }], questions: [] }; }), writing: null } });
      view = "edit"; render(); window.scrollTo(0, 0);
    }
    else if (a === "import") {
      var c = JSON.parse(JSON.stringify(window.SAMPLE_LESSON));
      client.from("lessons").insert({ title: c.title, content: c, published: false, owner: user.id }).select("id").single().then(function (r) {
        flash(r.error ? "تعذّر الاستيراد: " + r.error.message : "تم استيراد الدرس النموذجي كمسودّة.", r.error ? "err" : "ok");
        loadLessons().then(render);
      });
    }
    else if (a === "edit" && L) { E = toEditor(L); view = "edit"; render(); window.scrollTo(0, 0); }
    else if (a === "link" && L) {
      document.getElementById("copy-status").innerHTML = '<span class="linkbox">' + esc(studentLink(L.id)) + '</span><span id="copy-msg"></span>';
      R.copyText(studentLink(L.id), document.getElementById("copy-msg"));
    }
    else if (a === "del" && L) {
      if (t.dataset.confirm !== "1") { t.dataset.confirm = "1"; t.textContent = "تأكيد الحذف؟"; return; }
      client.from("lessons").delete().eq("id", L.id).then(function (r) { flash(r.error ? "تعذّر الحذف." : "تم حذف الدرس.", r.error ? "err" : "ok"); loadLessons().then(render); });
    }
    else if (a === "results" && L) {
      resultsLesson = L; results = null; view = "results";
      client.from("results").select("id,student_name,class_name,data,created_at").eq("lesson_id", L.id).order("created_at", { ascending: false }).then(function (r) {
        if (r.error) flash("تعذّر تحميل النتائج: " + r.error.message, "err");
        results = r.data || []; render(); window.scrollTo(0, 0);
      });
    }
    else if (a === "essay") {
      var row = (results || []).filter(function (x) { return x.id === id; })[0];
      document.getElementById("essay-box").innerHTML = row ? '<div class="box"><h3>نصّ ' + esc(row.student_name) + '</h3><div class="model">' + esc(row.data.writing.text) + "</div></div>" : "";
    }
    else if (a === "csv") csv();
    else if (a === "back") { E = null; view = "list"; loadLessons().then(render); }
    else if (a === "save") saveLesson();
    else if (a === "add-section") {
      var d = R.DEFAULT_SECTIONS.filter(function (x) { return x.id === t.dataset.def; })[0];
      E.sections.push({ id: d ? d.id : "s" + Date.now().toString(36), name: d ? d.name : "", goal: d ? d.goal : "", review: "", blocks: [{ type: "text", title: "", text: "", extra: "" }], questions: [] });
      rerenderKeep();
    }
    else if (a === "del-section") {
      if (t.dataset.confirm !== "1") { t.dataset.confirm = "1"; t.textContent = "تأكيد حذف القسم؟"; return; }
      E.sections.splice(si, 1); rerenderKeep();
    }
    else if (a === "up" || a === "down") {
      var j = a === "up" ? si - 1 : si + 1, tmp = E.sections[j]; E.sections[j] = E.sections[si]; E.sections[si] = tmp; rerenderKeep();
    }
    else if (a === "add-block") { E.sections[si].blocks.push({ type: "text", title: "", text: "", extra: "" }); rerenderKeep(); }
    else if (a === "del-block") { E.sections[si].blocks.splice(+t.dataset.b, 1); rerenderKeep(); }
    else if (a === "add-q") { E.sections[si].questions.push({ stem: "", optionsText: "", answer: 0, support: "" }); rerenderKeep(); }
    else if (a === "del-q") { E.sections[si].questions.splice(+t.dataset.q, 1); rerenderKeep(); }
  });

  /* ---------- start ---------- */
  if (!client) { render(); return; }
  client.auth.getSession().then(function (r) {
    user = r.data && r.data.session ? r.data.session.user : null;
    if (user) loadLessons().then(render); else render();
  });
})();
