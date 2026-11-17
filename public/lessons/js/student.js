/* Student app: one lesson, chosen by the teacher's link (?lesson=ID). */
(function () {
  var LEVELS = [
    { key: "alone", label: "أستطيع وحدي", cls: "p-ok", score: 3 },
    { key: "help", label: "أستطيع بمساعدة", cls: "p-mid", score: 2 },
    { key: "practice", label: "أحتاج تدريبًا", cls: "p-bad", score: 1 }
  ];
  var RUBRIC = [
    { id: "vocab", name: "المفردات" },
    { id: "context", name: "فهم المعنى" },
    { id: "grammar", name: "النحو والتراكيب" },
    { id: "analysis", name: "التحليل والتعبير" }
  ];
  var esc = R.esc;
  var stage = document.getElementById("stage");
  var stepsEl = document.getElementById("steps");
  var L = null, lessonId = null, demo = false, state, STEPS, READ = 1, FIRST = 2, WRITE, SELF, DASH;

  function levelOf(k) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].key === k) return LEVELS[i]; return null; }

  function fresh() {
    var st = { step: 0, name: "", klass: "", pre: {}, post: {}, ans: {}, time: {}, enteredAt: Date.now(), submitted: null,
      write: { text: "", attempts: 0, result: null, first: null, loading: false, error: null, checks: {}, showModel: false, selfDone: false } };
    L.sections.forEach(function (s) { st.ans[s.id] = s.questions.map(function () { return { tries: 0, solved: false, firstRight: null, lastWrong: null }; }); });
    return st;
  }

  function setup(lesson) {
    L = R.normalize(lesson);
    document.title = L.title + " — Roots | جذور";
    document.getElementById("lesson-title").textContent = L.title;
    document.getElementById("lesson-sub").textContent = (L.subtitle || "") + (demo ? " · نسخة تجريبية" : "");
    STEPS = ["البداية", "القراءة"].concat(L.sections.map(function (s) { return s.name; }));
    WRITE = L.writing ? STEPS.length : -1;
    if (L.writing) STEPS.push("الكتابة");
    SELF = STEPS.length; STEPS.push("تقييم ذاتي");
    DASH = STEPS.length; STEPS.push("التحليلات");
    state = fresh();
    render();
  }

  var accessCode = "";
  function storedCode() { try { return sessionStorage.getItem("roots-code-" + lessonId) || ""; } catch (e) { return ""; } }
  function rememberCode(c) { try { sessionStorage.setItem("roots-code-" + lessonId, c); } catch (e) {} }

  function codeForm(wrong) {
    document.getElementById("lesson-title").textContent = "الدخول إلى الدرس";
    stage.innerHTML = '<h2>رمز الفصل</h2><p class="lead">اكتب الرمز الذي أعطاك إيّاه معلّمك.</p>' +
      (wrong ? '<div class="err">الرمز غير صحيح. تأكّد منه وحاول مرة أخرى.</div>' : "") +
      '<form id="code-form"><label class="f" for="code-in">الرمز</label><input class="in" id="code-in" autocomplete="off" dir="ltr" required>' +
      '<div class="nav"><span></span><button class="btn primary" type="submit">ادخل</button></div></form>';
    var f = document.getElementById("code-form");
    f.addEventListener("submit", function (e) { e.preventDefault(); fetchLesson(document.getElementById("code-in").value.trim()); });
    document.getElementById("code-in").focus();
  }

  function fetchLesson(code) {
    var client = R.db();
    client.rpc("get_lesson", { p_id: lessonId, p_code: code || null }).then(function (res) {
      var d = res.data;
      if (res.error || !d || d.status === "missing") {
        stage.innerHTML = '<div class="err">لم نجد هذا الدرس، أو لم يُنشر بعد. تأكّد من الرابط مع معلّمك.</div>';
        document.getElementById("lesson-title").textContent = "الدرس غير متاح";
        return;
      }
      if (d.status === "code" || d.status === "wrong") { codeForm(d.status === "wrong"); return; }
      accessCode = code || "";
      if (accessCode) rememberCode(accessCode);
      var content = d.content || {};
      content.title = d.title || content.title;
      setup(content);
    });
  }

  function load() {
    var params = new URLSearchParams(location.search);
    lessonId = params.get("lesson");
    var client = R.db();
    if (!lessonId || !client) { demo = true; setup(JSON.parse(JSON.stringify(window.SAMPLE_LESSON))); return; }
    fetchLesson(storedCode());
  }

  function go(n) {
    var now = Date.now();
    state.time[state.step] = (state.time[state.step] || 0) + (now - state.enteredAt);
    state.enteredAt = now;
    state.step = n;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function rated(map) { return L.sections.every(function (s) { return !!map[s.id]; }); }
  function rateBlock(which) {
    return L.sections.map(function (s, i) {
      var btns = LEVELS.map(function (l) {
        return '<button type="button" data-rate="' + which + '" data-id="' + esc(s.id) + '" data-k="' + l.key + '" aria-pressed="' + (state[which][s.id] === l.key) + '">' + l.label + "</button>";
      }).join("");
      return '<div class="obj" style="border-inline-start-color:' + R.color(s, i) + '"><p><span class="num">' + (i + 1) + ". " + esc(s.name) + ": </span>" + esc(s.goal || "") + '</p><div class="rate" role="group" aria-label="' + esc(s.name) + '">' + btns + "</div></div>";
    }).join("");
  }

  function score(id) { return state.ans[id].filter(function (a) { return a.firstRight; }).length; }
  function mastery(sc, total) {
    var r = total ? sc / total : 0;
    if (r >= 0.99) return { label: "متمكّن", cls: "p-ok" };
    if (r >= 0.6) return { label: "نامٍ", cls: "p-mid" };
    return { label: "يحتاج دعمًا", cls: "p-bad" };
  }

  /* ---------- pages ---------- */
  function startPage() {
    var ready = state.name.trim() && rated(state.pre);
    return (demo ? '<div class="insight">هذه نسخة تجريبية بدرس نموذجي. النتائج لا تُرسل إلى المعلّم.</div>' : "") +
      '<h2>أهلًا بك</h2><p class="lead">اكتب اسمك، ثم قيّم نفسك في مهارات الدرس قبل أن تبدأ. سنقارن في النهاية.</p>' +
      '<label class="f" for="sname">اسمك</label><input class="in" id="sname" autocomplete="name" value="' + esc(state.name) + '">' +
      '<label class="f" for="sclass">الفصل أو المجموعة (اختياري)</label><input class="in" id="sclass" value="' + esc(state.klass) + '">' +
      '<h3 style="margin-top:16px">ماذا ستتعلّم؟</h3>' + rateBlock("pre") +
      '<div class="nav"><span></span><button type="button" class="btn primary" data-go="1" id="start-btn"' + (ready ? "" : " disabled") + ">ابدأ القراءة</button></div>" +
      '<p class="hint" id="start-hint">' + (ready ? "" : "اكتب اسمك واختر تقييمًا لكلّ مهارة لتبدأ.") + "</p>";
  }

  function readPage() {
    return '<h2>اقرأ النصّ</h2><p class="lead">اقرأ كلّ فقرة. الكلمات المنقّطة تحتها: المسها لترى معناها.</p>' +
      L.paragraphs.map(function (p, i) { return '<p class="para"><span class="pn">الفقرة ' + (i + 1) + "</span>" + R.glossify(p, L.glossary) + "</p>"; }).join("") +
      (L.glossary.length ? '<div class="gloss" id="gloss" role="status">المس كلمة منقّطة لترى معناها هنا.</div>' : "") +
      (L.source ? '<p class="note-small">المصدر: ' + esc(L.source) + "</p>" : "") +
      '<div class="nav"><button type="button" class="btn ghost" data-go="0">السابق</button><button type="button" class="btn primary" data-go="2">' +
      (L.sections.length ? "التالي: " + esc(L.sections[0].name) : "التالي") + "</button></div>";
  }

  function sectionPage(si) {
    var s = L.sections[si], A = state.ans[s.id], col = R.color(s, si);
    var qs = s.questions.map(function (q, qi) {
      var a = A[qi];
      var opts = q.options.map(function (o, oi) {
        var cls = "opt";
        if (a.solved && oi === q.answer) cls += " right";
        if (!a.solved && a.lastWrong === oi) cls += " wrong";
        return '<button type="button" class="' + cls + '" data-s="' + si + '" data-q="' + qi + '" data-o="' + oi + '"' + (a.solved ? " disabled" : "") + ">" + R.inline(o) + "</button>";
      }).join("");
      var fb = "";
      if (a.solved) fb = '<div class="fb ok">' + (a.firstRight ? "إجابة صحيحة من أول مرة. أحسنت!" : "صحيح الآن، بعد المساعدة. ممتاز.") + "</div>";
      else if (a.tries > 0) fb = '<div class="fb support"><strong>شرح إضافي</strong>' + R.inline(q.support || "راجع الشرح أعلاه، ثم حاول مرة أخرى.") + "</div>";
      return '<div class="q"><span class="tag">سؤال ' + (qi + 1) + " من " + s.questions.length + '</span><p class="stem">' + R.inline(q.stem) + '</p><div class="opts">' + opts + "</div>" + fb + "</div>";
    }).join("");
    var done = A.every(function (a) { return a.solved; });
    var next = state.step + 1;
    var nextLabel = si < L.sections.length - 1 ? "التالي: " + esc(L.sections[si + 1].name) : (L.writing ? "التالي: الكتابة" : "التالي: قيّم نفسك");
    return '<span class="skill-badge" style="background:' + col + '">القسم ' + (si + 1) + " من " + L.sections.length + "</span>" +
      "<h2>" + esc(s.name) + '</h2><p class="lead">' + esc(s.goal || "") + "</p>" +
      s.blocks.map(function (b) { return R.renderBlock(b, L); }).join("") +
      (s.questions.length ? '<h3 style="margin-top:16px">تدرّب</h3>' + qs : "") +
      '<div class="nav"><button type="button" class="btn ghost" data-go="' + (state.step - 1) + '">السابق</button><button type="button" class="btn primary" data-go="' + next + '"' + (done ? "" : " disabled") + ">" + nextLabel + "</button></div>" +
      (done ? "" : '<p class="hint">أجب عن الأسئلة للانتقال.</p>');
  }

  function writePage() {
    var W = state.write, WR = L.writing, n = R.wordCount(W.text);
    var minW = +WR.minWords || 0, maxW = +WR.maxWords || 0;
    var html = '<span class="skill-badge" style="background:var(--green)">تطبيق كتابي</span>' +
      '<h2>اكتب، ثم صحّح لنفسك</h2><p class="lead">اكتب فقرتك واضغط «صحّح لي». ستظهر لك أخطاؤك مع التصحيح وسبب كلّ خطأ، ثم عدّل وأعد التصحيح.</p>' +
      '<div class="task"><b>المهمة:</b> ' + R.inline(WR.task) + (minW || maxW ? " (" + (minW ? "من " + minW : "") + (maxW ? " إلى " + maxW : "") + " كلمة)" : "") +
      ((WR.requirements || []).length ? "<ul>" + WR.requirements.map(function (r) { return "<li>" + R.inline(r) + "</li>"; }).join("") + "</ul>" : "") + "</div>" +
      '<label for="essay" class="f">نصّك</label>' +
      '<textarea id="essay" class="essay" dir="rtl" placeholder="اكتب هنا…"' + (W.loading ? " disabled" : "") + ">" + esc(W.text) + "</textarea>" +
      '<div class="hint" id="counter">' + n + " كلمة</div>" +
      '<div class="row" style="margin-top:10px">' +
      '<button type="button" class="btn primary" data-check="1"' + (W.loading || n < 15 ? " disabled" : "") + ">" + (W.attempts ? "أعد التصحيح" : "صحّح لي") + "</button>" +
      '<button type="button" class="btn ghost" data-self="1"' + (n < 15 ? " disabled" : "") + ">راجع بنفسك</button></div>";
    if (W.loading) html += '<div class="loading" role="status">جارٍ التصحيح… قد يستغرق ذلك بضع ثوانٍ.</div>';
    if (W.error) html += '<div class="err">' + esc(W.error) + "</div>";

    if (W.result && !W.loading) {
      var Rz = W.result;
      html += '<h3 style="margin-top:18px">نتيجة التصحيح' + (W.attempts > 1 ? " (المحاولة " + W.attempts + ")" : "") + "</h3>" +
        '<div class="bars">' + RUBRIC.map(function (r) {
          var v = Rz.scores[r.id];
          var c = v >= 4 ? "var(--ok)" : v === 3 ? "var(--green-2)" : v === 2 ? "var(--mid)" : "var(--bad)";
          return '<div class="bar-row"><div class="lbl"><span>' + r.name + "</span><span>" + v + '/4</span></div><div class="track" role="img" aria-label="' + r.name + ": " + v + ' من 4"><div class="fill" style="width:' + (v / 4 * 100) + "%;background:" + c + '"></div></div></div>';
        }).join("") + "</div>";
      if (Rz.strengths) html += '<div class="insight"><b>ما أحسنت فيه:</b> ' + esc(Rz.strengths) + "</div>";
      html += Rz.mistakes.length ? "<h3>أخطاؤك (" + Rz.mistakes.length + ")</h3>" + Rz.mistakes.map(function (m) {
        return '<div class="mistake"><span class="pill p-mid">' + esc(m.type) + '</span><div class="pair"><span class="wrong-t">' + esc(m.wrong) + '</span> ← <span class="right-t">' + esc(m.right) + '</span></div><p class="why">' + esc(m.why) + "</p></div>";
      }).join("") : '<div class="celebrate">لا أخطاء لغوية واضحة. أحسنت!</div>';
      if (Rz.corrected) html += '<h3>نصّك بعد التصحيح</h3><div class="corrected">' + esc(Rz.corrected) + "</div>";
      if (Rz.next) html += '<div class="insight" style="margin-top:10px"><b>خطوتك التالية:</b> ' + esc(Rz.next) + "</div>";
      html += '<p class="note-small">التصحيح الآلي مساعد للتعلّم، وقد يخطئ أحيانًا. يراجعه المعلّم.</p>';
    }

    if (W.selfDone || W.error) {
      html += '<h3 style="margin-top:18px">راجع نصّك بنفسك</h3><div class="checklist">' +
        (WR.requirements || []).map(function (r, i) {
          return '<label><input type="checkbox" data-chk="' + i + '"' + (W.checks[i] ? " checked" : "") + "><span>" + R.inline(r) + "</span></label>";
        }).join("") + "</div>";
      if (WR.modelAnswer) {
        html += '<div class="row" style="margin-top:10px"><button type="button" class="btn ghost" data-model="1">' + (W.showModel ? "أخفِ نموذج الإجابة" : "اعرض نموذج إجابة") + "</button></div>" +
          (W.showModel ? '<div class="model" style="margin-top:8px">' + esc(WR.modelAnswer) + "</div>" : "");
      }
    }
    html += '<div class="nav"><button type="button" class="btn ghost" data-go="' + (WRITE - 1) + '">السابق</button><button type="button" class="btn primary" data-go="' + SELF + '"' + (W.loading ? " disabled" : "") + ">التالي: قيّم نفسك</button></div>";
    return html;
  }

  function selfPage() {
    return '<h2>بعد الدرس: كيف ترى نفسك الآن؟</h2><p class="lead">قيّم نفسك مرّة أخرى في كلّ مهارة، بصدق.</p>' + rateBlock("post") +
      '<div class="nav"><button type="button" class="btn ghost" data-go="' + (SELF - 1) + '">السابق</button><button type="button" class="btn primary" data-go="' + DASH + '"' + (rated(state.post) ? "" : " disabled") + ">اعرض التحليلات</button></div>";
  }

  /* ---------- analytics ---------- */
  function collect() {
    var totalQ = 0, first = 0, retries = 0, totalTime = 0;
    var sections = L.sections.map(function (s, i) {
      var A = state.ans[s.id];
      A.forEach(function (a) { totalQ++; if (a.firstRight) first++; retries += Math.max(0, a.tries - 1); });
      return { id: s.id, name: s.name, score: score(s.id), total: s.questions.length, pre: state.pre[s.id], post: state.post[s.id], ms: state.time[FIRST + i] || 0 };
    });
    Object.keys(state.time).forEach(function (k) { totalTime += state.time[k]; });
    var needs = sections.filter(function (x) { return x.score < x.total || x.post !== "alone"; }).map(function (x) { return x.id; });
    var W = state.write;
    return {
      totalQ: totalQ, firstRight: first, retries: retries, ms: totalTime, sections: sections, needs: needs,
      writing: L.writing ? {
        words: R.wordCount(W.text), attempts: W.attempts, text: W.text,
        first: W.first ? W.first.scores : null, last: W.result ? W.result.scores : null,
        mistakes: W.result ? W.result.mistakes.length : null,
        selfCheck: Object.keys(W.checks).filter(function (k) { return W.checks[k]; }).length
      } : null
    };
  }

  function dashboard() {
    var D = collect(), pct = D.totalQ ? Math.round(D.firstRight / D.totalQ * 100) : 0;
    var html = '<h2>لوحة التحليلات</h2><p class="lead">أداؤك في كلّ مهارة، ومقارنة ثقتك بأدائك، وما تحتاج إلى مراجعته فقط.</p>' +
      '<div class="kpis"><div class="kpi"><div class="v">' + pct + '%</div><div class="l">صحيح من أول مرة</div></div>' +
      '<div class="kpi"><div class="v">' + D.firstRight + "/" + D.totalQ + '</div><div class="l">أسئلة بلا مساعدة</div></div>' +
      '<div class="kpi"><div class="v">' + D.retries + '</div><div class="l">محاولات إضافية</div></div>' +
      '<div class="kpi"><div class="v">' + R.fmt(D.ms) + '</div><div class="l">وقت الدرس</div></div></div>' +
      "<h3>الأداء حسب المهارة</h3><div class=\"bars\">" + D.sections.map(function (x, i) {
        var m = mastery(x.score, x.total);
        return '<div class="bar-row"><div class="lbl"><span>' + esc(x.name) + '</span><span><span class="pill ' + m.cls + '">' + m.label + "</span> " + x.score + "/" + x.total + "</span></div>" +
          '<div class="track" role="img" aria-label="' + esc(x.name) + ": " + x.score + " من " + x.total + '"><div class="fill" style="width:' + (x.total ? x.score / x.total * 100 : 0) + "%;background:" + R.color(L.sections[i], i) + '"></div></div></div>';
      }).join("") + "</div>";

    if (D.writing && D.writing.last) {
      html += '<h3>الكتابة</h3><div class="table-wrap"><table><thead><tr><th>المعيار</th><th>أول محاولة</th><th>آخر محاولة</th></tr></thead><tbody>' +
        RUBRIC.map(function (r) { return "<tr><td>" + r.name + "</td><td>" + D.writing.first[r.id] + "/4</td><td>" + D.writing.last[r.id] + "/4</td></tr>"; }).join("") +
        '</tbody></table></div><div class="insight">عدد المحاولات: ' + D.writing.attempts + " · الأخطاء في آخر محاولة: " + D.writing.mistakes + "</div>";
    } else if (D.writing && D.writing.words) {
      html += '<h3>الكتابة</h3><div class="insight">كتبت ' + D.writing.words + " كلمة، وراجعت " + D.writing.selfCheck + " من " + (L.writing.requirements || []).length + " متطلّبات بنفسك. سيراجعها معلّمك.</div>";
    }

    html += '<h3>الثقة قبل الدرس وبعده</h3><div class="table-wrap"><table><thead><tr><th>المهارة</th><th>قبل</th><th>بعد</th><th class="hide-sm">الوقت</th></tr></thead><tbody>' +
      D.sections.map(function (x) {
        var a = levelOf(x.pre), b = levelOf(x.post);
        return "<tr><td>" + esc(x.name) + '</td><td><span class="pill ' + a.cls + '">' + a.label + '</span></td><td><span class="pill ' + b.cls + '">' + b.label + '</span></td><td class="hide-sm">' + R.fmt(x.ms) + "</td></tr>";
      }).join("") + "</tbody></table></div>";

    var notes = [];
    var strong = D.sections.filter(function (x) { return x.total && x.score === x.total; }).map(function (x) { return x.name; });
    var weak = D.sections.filter(function (x) { return x.total && x.score / x.total < 0.6; }).map(function (x) { return x.name; });
    if (strong.length) notes.push("نقاط القوّة: " + strong.join("، ") + ".");
    if (weak.length) notes.push("تحتاج إلى دعم في: " + weak.join("، ") + ".");
    D.sections.forEach(function (x) {
      var post = levelOf(x.post).score, pre = levelOf(x.pre).score, r = x.total ? x.score / x.total : 1;
      if (post === 3 && r < 0.6) notes.push("في " + x.name + ": ثقتك عالية، لكنّ الأداء يحتاج إلى تدريب.");
      if (post === 1 && r >= 0.99) notes.push("في " + x.name + ": أداؤك ممتاز، وأنت أقدر ممّا تظن.");
      if (post > pre) notes.push("تحسّنت ثقتك في " + x.name + " بعد الدرس.");
    });
    html += "<h3>ملاحظات</h3>" + notes.map(function (t) { return '<div class="insight">' + esc(t) + "</div>"; }).join("");

    html += '<h3 style="margin-top:14px">مراجعتك المخصّصة</h3>' + (D.needs.length ? D.needs.map(function (id) {
      var s = L.sections.filter(function (x) { return x.id === id; })[0];
      return '<div class="review"><h3>مراجعة: ' + esc(s.name) + "</h3><p>" + R.inline(s.review || "أعد قراءة شرح هذا القسم، وأجب عن أسئلته مرة أخرى.") + "</p></div>";
    }).join("") : '<div class="celebrate">أحسنت! أتقنت كلّ المهارات، وأنت جاهز للنصّ التالي.</div>');

    if (demo) html += '<div class="insight" style="margin-top:14px">نسخة تجريبية: النتيجة لم تُرسل إلى معلّم.</div>';
    else if (state.submitted === "ok") html += '<div class="okmsg">تم إرسال نتيجتك إلى معلّمك.</div>';
    else if (state.submitted === "sending") html += '<div class="loading">جارٍ إرسال نتيجتك إلى معلّمك…</div>';
    else if (state.submitted === "error") html += '<div class="err">تعذّر إرسال النتيجة. <button type="button" class="btn small" data-submit="1">أعد الإرسال</button></div>';

    html += '<div class="nav"><button type="button" class="btn ghost" data-go="' + SELF + '">السابق</button><button type="button" class="btn primary" data-reset="1">ابدأ من جديد</button></div>';
    return html;
  }

  function submit() {
    var client = R.db();
    if (demo || !client || state.submitted === "ok" || state.submitted === "sending") return;
    state.submitted = "sending";
    client.rpc("submit_result", { p_id: lessonId, p_code: accessCode || null, p_name: state.name.trim().slice(0, 80), p_class: state.klass.trim().slice(0, 80), p_data: collect() })
      .then(function (res) { state.submitted = res.error || res.data !== true ? "error" : "ok"; if (state.step === DASH) render(); });
  }

  /* ---------- AI correction ---------- */
  function clamp4(v) { v = Math.round(+v); return v >= 1 && v <= 4 ? v : 1; }
  function runCheck() {
    var W = state.write, WR = L.writing;
    if (W.loading) return;
    W.loading = true; W.error = null; render();
    var url = (window.ROOTS_CONFIG && window.ROOTS_CONFIG.CORRECT_URL) || "/api/correct";
    fetch(url, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: W.text, task: WR.task, requirements: WR.requirements || [], summary: WR.summary || "", minWords: WR.minWords, maxWords: WR.maxWords })
    }).then(function (r) {
      return r.json().then(function (j) { if (!r.ok) throw j; return j; });
    }).then(function (R0) {
      if (!R0 || !R0.scores) throw {};
      var clean = {
        scores: {},
        mistakes: (Array.isArray(R0.mistakes) ? R0.mistakes : []).slice(0, 8).filter(function (m) { return m && m.wrong; })
          .map(function (m) { return { wrong: m.wrong, right: m.right || "", type: m.type || "ملاحظة", why: m.why || "" }; }),
        corrected: R0.corrected || "", strengths: R0.strengths || "", next: R0.next || ""
      };
      RUBRIC.forEach(function (r) { clean.scores[r.id] = clamp4(R0.scores[r.id]); });
      W.attempts++; if (!W.first) W.first = clean; W.result = clean; W.loading = false;
      render();
    }).catch(function (e) {
      W.loading = false;
      W.error = (e && e.error === "rate_limited") ? "طلبات كثيرة في وقت قصير. انتظر دقيقة ثم أعد المحاولة." :
        "تعذّر التصحيح الآلي الآن. راجع نصّك بنفسك بالقائمة أدناه، وسيراجعه معلّمك.";
      render();
    });
  }

  /* ---------- render + events ---------- */
  function render() {
    stepsEl.innerHTML = STEPS.map(function (n, i) {
      var c = i < state.step ? "done" : (i === state.step ? "now" : "");
      return '<li class="' + c + '"' + (i === state.step ? ' aria-current="step"' : "") + ">" + esc(n) + "</li>";
    }).join("");
    var cur = stepsEl.querySelector(".now");
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "nearest", inline: "center" });
    var s = state.step, html;
    if (s === 0) html = startPage();
    else if (s === READ) html = readPage();
    else if (s >= FIRST && s < FIRST + L.sections.length) html = sectionPage(s - FIRST);
    else if (s === WRITE) html = writePage();
    else if (s === SELF) html = selfPage();
    else { html = dashboard(); }
    stage.innerHTML = html;
    if (s === DASH && !demo && !state.submitted) { submit(); stage.innerHTML = dashboard(); }
  }

  stage.addEventListener("click", function (e) {
    var t = e.target.closest("button, input[type=checkbox]");
    if (!t) return;
    var d = t.dataset;
    if (d.chk !== undefined) { state.write.checks[d.chk] = t.checked; return; }
    if (d.rate) { state[d.rate][d.id] = d.k; render(); return; }
    if (d.go !== undefined) { go(+d.go); return; }
    if (d.reset) { state = fresh(); render(); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (d.submit) { state.submitted = null; submit(); render(); return; }
    if (d.g !== undefined) {
      stage.querySelectorAll(".w").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
      t.setAttribute("aria-expanded", "true");
      var g = L.glossary[+d.g];
      document.getElementById("gloss").innerHTML = "<b>" + esc(g.term) + "</b>: " + esc(g.meaning);
      return;
    }
    if (d.flash !== undefined) {
      var gl = L.glossary[+d.flash], open = t.classList.toggle("open");
      t.setAttribute("aria-pressed", open);
      t.textContent = open ? gl.meaning : gl.term;
      return;
    }
    if (d.s !== undefined) {
      var sec = L.sections[+d.s], a = state.ans[sec.id][+d.q];
      a.tries++;
      if (+d.o === sec.questions[+d.q].answer) { a.solved = true; if (a.firstRight === null) a.firstRight = true; }
      else { if (a.firstRight === null) a.firstRight = false; a.lastWrong = +d.o; }
      render(); return;
    }
    if (d.check) { runCheck(); return; }
    if (d.self) { state.write.selfDone = true; render(); return; }
    if (d.model) { state.write.showModel = !state.write.showModel; render(); }
  });

  stage.addEventListener("input", function (e) {
    var id = e.target.id;
    if (id === "sname" || id === "sclass") {
      if (id === "sname") state.name = e.target.value; else state.klass = e.target.value;
      var ready = state.name.trim() && rated(state.pre);
      var b = document.getElementById("start-btn"); if (b) b.disabled = !ready;
      var h = document.getElementById("start-hint"); if (h) h.textContent = ready ? "" : "اكتب اسمك واختر تقييمًا لكلّ مهارة لتبدأ.";
      return;
    }
    if (id === "essay") {
      state.write.text = e.target.value;
      var n = R.wordCount(e.target.value);
      document.getElementById("counter").textContent = n + " كلمة";
      stage.querySelectorAll("[data-check],[data-self]").forEach(function (b) { b.disabled = (b.dataset.check && state.write.loading) || n < 15; });
    }
  });

  load();
})();
