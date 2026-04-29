import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SCHOOL_TYPES, LEVELS, QUESTIONS, EXAM_META, calcScore } from '../data/examData';

// ── Helpers ──────────────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(2, '0');

const SECTION_LABELS = {
  vocabulary: 'Vocabulary / المفردات',
  grammar:    'Grammar / القواعد',
  reading:    'Reading / القراءة',
  quran:      'Quran & Tajweed / القرآن والتجويد',
  writing:    'Writing Skills / مهارات الكتابة',
};

const LS_KEY = 'raqp_results';

function saveResult(result) {
  try {
    const prev = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    prev.unshift(result);
    localStorage.setItem(LS_KEY, JSON.stringify(prev.slice(0, 100)));
  } catch(e) {}
}

function loadResults() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch(e) { return []; }
}

function clearResults() {
  try { localStorage.removeItem(LS_KEY); } catch(e) {}
}

function useTimer(seconds, onEnd) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) { onEnd(); return; }
    const id = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(id);
  }, [left, onEnd]);
  return left;
}

// ── Sub-components ────────────────────────────────────────────────────────────
function ProgressBar({ value, max, color }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ background: '#e2e8f0', borderRadius: 99, height: 8, overflow: 'hidden' }}>
      <div style={{ width: pct + '%', background: color, height: '100%', borderRadius: 99, transition: 'width 0.4s' }} />
    </div>
  );
}

function LevelBadge({ level }) {
  return (
    <span style={{ background: level.bg, color: level.color, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>
      {level.cefr} · {level.name}
    </span>
  );
}

function CertificateView({ studentName, schoolType, finalLevel, levelResults, onClose }) {
  const school = SCHOOL_TYPES.find(s => s.id === schoolType);
  const level  = LEVELS.find(l => l.id === finalLevel) || LEVELS[0];
  const date   = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

  const handlePrint = () => {
    const w = window.open('', '_blank');
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>RAQP Certificate</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;700&display=swap');
  body { margin:0; background:#fff; font-family: 'Playfair Display', serif; }
  .cert { width:900px; min-height:640px; margin:20px auto; border:12px solid #1e293b; padding:48px 60px; position:relative; box-sizing:border-box; background:linear-gradient(145deg,#fdfbf7 0%,#f8f4ed 100%); }
  .cert:before { content:''; position:absolute; inset:8px; border:2px solid #c9a84c; pointer-events:none; }
  .seal { text-align:center; font-size:48px; margin-bottom:8px; }
  .title-ar { font-family:'Amiri',serif; font-size:22px; color:#c9a84c; text-align:center; direction:rtl; margin-bottom:4px; }
  .title-en { font-size:13px; letter-spacing:3px; text-transform:uppercase; text-align:center; color:#64748b; margin-bottom:24px; }
  .presents { font-size:14px; text-align:center; color:#94a3b8; margin-bottom:6px; }
  .name { font-size:38px; font-weight:700; text-align:center; color:#1e293b; border-bottom:2px solid #c9a84c; display:inline-block; padding:0 40px 6px; margin:0 auto 20px; }
  .name-wrap { text-align:center; margin-bottom:20px; }
  .achieved { font-size:14px; text-align:center; color:#475569; margin-bottom:8px; }
  .level { font-size:28px; font-weight:700; text-align:center; color:${level.color}; background:${level.bg}; display:inline-block; padding:8px 32px; border-radius:40px; margin:0 auto 8px; }
  .level-wrap { text-align:center; margin-bottom:12px; }
  .cefr { font-size:13px; text-align:center; color:#64748b; margin-bottom:24px; }
  .details { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin:24px 0; }
  .detail { text-align:center; background:#f1f5f9; border-radius:8px; padding:12px; }
  .detail-label { font-size:10px; text-transform:uppercase; letter-spacing:2px; color:#94a3b8; margin-bottom:4px; }
  .detail-value { font-size:14px; font-weight:700; color:#1e293b; }
  .scores { margin:16px 0; }
  .score-row { display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid #e2e8f0; font-size:13px; color:#475569; }
  .score-pass { color:#10b981; font-weight:700; }
  .score-fail { color:#ef4444; font-weight:700; }
  .footer { display:flex; justify-content:space-between; align-items:flex-end; margin-top:32px; }
  .sig-line { border-top:1px solid #1e293b; padding-top:6px; font-size:11px; color:#64748b; text-align:center; width:180px; }
  .date { font-size:11px; color:#94a3b8; text-align:center; }
  @media print { body { margin:0; } .cert { margin:0; border:12px solid #1e293b; } }
</style></head><body>
<div class="cert">
  <div class="seal">📖</div>
  <div class="title-ar">شهادة كفاءة اللغة العربية والقرآن الكريم</div>
  <div class="title-en">Pathways Arabic &amp; Quran Proficiency Certificate &mdash; RAQP</div>
  <div class="presents">This is to certify that</div>
  <div class="name-wrap"><span class="name">${studentName || 'Student'}</span></div>
  <div class="achieved">has demonstrated proficiency in Arabic Language &amp; Quranic Studies at the level of</div>
  <div class="level-wrap"><span class="level">${level.name}</span></div>
  <div class="cefr">CEFR Level: ${level.cefr} &nbsp;&bull;&nbsp; School Track: ${school?.name || schoolType}</div>
  <div class="details">
    <div class="detail"><div class="detail-label">School Track</div><div class="detail-value">${school?.name || schoolType}</div></div>
    <div class="detail"><div class="detail-label">Levels Assessed</div><div class="detail-value">${levelResults.length} of 4</div></div>
    <div class="detail"><div class="detail-label">Date Issued</div><div class="detail-value">${date}</div></div>
  </div>
  <div class="scores">${levelResults.map(r => {
    const lv = LEVELS.find(l => l.id === r.levelId);
    return `<div class="score-row"><span>${lv?.name || r.levelId} (${lv?.cefr})</span><span class="${r.passed ? 'score-pass' : 'score-fail'}">${r.score}/10 &mdash; ${r.passed ? 'PASSED' : 'STOPPED'}</span></div>`;
  }).join('')}</div>
  <div class="footer">
    <div class="sig-line">Pathways Education<br/>Authorised Examiner</div>
    <div class="date">Issued: ${date}</div>
    <div class="sig-line">RAQP Certification<br/>Official Record</div>
  </div>
</div>
<script>window.onload=()=>window.print();</script>
</body></html>`);
    w.document.close();
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <div style={{ background:'#fff', borderRadius:16, padding:'32px 40px', maxWidth:560, width:'100%', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🏅</div>
          <h2 style={{ fontSize:22, fontWeight:800, color:'#1e293b', margin:'0 0 4px' }}>Certificate of Proficiency</h2>
          <p style={{ fontSize:13, color:'#64748b', margin:0 }}>RAQP — Pathways Arabic & Quran Proficiency</p>
        </div>
        <div style={{ background:'linear-gradient(135deg,#1e293b,#3b4f6b)', borderRadius:12, padding:'20px 24px', marginBottom:20, color:'#fff', textAlign:'center' }}>
          <p style={{ fontSize:12, color:'#94a3b8', margin:'0 0 4px', letterSpacing:2, textTransform:'uppercase' }}>Awarded to</p>
          <p style={{ fontSize:24, fontWeight:700, margin:'0 0 8px' }}>{studentName || 'Student'}</p>
          <div style={{ background: level.bg, color: level.color, display:'inline-block', padding:'4px 16px', borderRadius:20, fontSize:14, fontWeight:700 }}>
            {level.name} — {level.cefr}
          </div>
          <p style={{ fontSize:12, color:'#94a3b8', margin:'8px 0 0' }}>{school?.name || schoolType}</p>
        </div>
        <div style={{ marginBottom:20 }}>
          {levelResults.map((r) => {
            const lv = LEVELS.find(l => l.id === r.levelId);
            return (
              <div key={r.levelId} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:'1px solid #f1f5f9', fontSize:13 }}>
                <span style={{ color:'#475569' }}>{lv?.name} ({lv?.cefr})</span>
                <span style={{ fontWeight:700, color: r.passed ? '#10b981' : '#ef4444' }}>{r.score}/10 — {r.passed ? 'PASSED' : 'STOPPED'}</span>
              </div>
            );
          })}
        </div>
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={handlePrint} style={{ flex:1, background:'linear-gradient(135deg,#1d4ed8,#7c3aed)', color:'#fff', border:'none', borderRadius:10, padding:'12px 0', fontSize:14, fontWeight:700, cursor:'pointer' }}>
            🖨 Print / Save PDF
          </button>
          <button onClick={onClose} style={{ flex:1, background:'#f1f5f9', color:'#475569', border:'none', borderRadius:10, padding:'12px 0', fontSize:14, fontWeight:700, cursor:'pointer' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Screen: Welcome ──────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  const [name, setName] = useState('');
  const feats = [
    { icon:'🎯', title:'4 Progressive Levels', desc:'Mubtadi A1 → Asasi B1 → Mutawassit B2 → Mutaqaddim C1' },
    { icon:'🏠', title:'Age-Appropriate', desc:'Questions adapt to your school level for fair assessment' },
    { icon:'✅', title:'10 Questions / Level', desc:'Vocabulary, grammar, reading, Quran & writing' },
    { icon:'⏱', title:'25 Min / Level', desc:'International standard timing — auto-submits on timeout' },
  ];
  return (
    <div style={{ textAlign:'center', padding:'48px 20px' }}>
      <div style={{ fontSize:48, marginBottom:12 }}>📖</div>
      <h1 style={{ fontSize:28, fontWeight:800, color:'#1e293b', margin:'0 0 0 12px' }}>
        Pathways Arabic & Quran Proficiency Exam
      </h1>
      <p style={{ fontSize:13, color:'#7c3aed', fontWeight:700, letterSpacing:1, margin:'0 0 8px' }}>
        RAQP — امتحان مهارات اللغة العربية والقرآن الكريم
      </p>
      <p style={{ color:'#64748b', maxWidth:540, margin:'0 auto 24px', lineHeight:1.7 }}>
        A fully adaptive, internationally-aligned proficiency assessment covering four levels (A1–C1).
        You begin at Level 1. Pass each level to advance. Your final level is your certified proficiency.
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12, maxWidth:560, margin:'0 auto 28px' }}>
        {feats.map((f,i) => (
          <div key={i} style={{ background:'#f8fafc', borderRadius:12, padding:'14px 16px', textAlign:'left', border:'1px solid #e2e8f0' }}>
            <div style={{ fontSize:22, marginBottom:6 }}>{f.icon}</div>
            <div style={{ fontSize:13, marginBottom:2, fontWeight:700, color:'#1e293b' }}>{f.title}</div>
            <div style={{ fontSize:12, color:'#64748b' }}>{f.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth:400, margin:'0 auto 28px' }}>
        <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#374151', marginBottom:8, textAlign:'left' }}>
          Student Name (optional — appears on certificate)
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="اكتب اسمك هنا / Enter your name here"
          style={{ width:'100%', border:'1.5px solid #e2e8f0', borderRadius:10, padding:'12px 16px', fontSize:14, boxSizing:'border-box', outline:'none', background:'#fafbfc' }}
        />
      </div>
      <button onClick={() => onStart(name.trim())} style={{ background:'linear-gradient(135deg,#1d4ed8,#7c3aed)', color:'#fff', border:'none', borderRadius:12, padding:'14px 40px', fontSize:16, fontWeight:700, cursor:'pointer' }}>
        لنبدأ الامتحان → Start Exam
      </button>
    </div>
  );
}

// ── Screen: School Type Selector ──────────────────────────────────────────────
function SchoolSelector({ onSelect }) {
  return (
    <div style={{ textAlign:'center', padding:'48px 20px' }}>
      <div style={{ fontSize:40, marginBottom:12 }}>🏫</div>
      <h2 style={{ fontSize:22, fontWeight:800, color:'#1e293b', margin:'0 0 8px' }}>Select Your School Level</h2>
      <p style={{ color:'#64748b', margin:'0 0 32px', fontSize:14 }}>
        Questions are adapted to your age group and educational stage.
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16, maxWidth:560, margin:'0 auto' }}>
        {SCHOOL_TYPES.map(s => (
          <button key={s.id} onClick={() => onSelect(s.id)} style={{
            background:'#f8fafc', border:'2px solid #e2e8f0', borderRadius:14, padding:'20px 16px',
            cursor:'pointer', textAlign:'center', transition:'all 0.2s',
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor='#7c3aed'; e.currentTarget.style.background='#f5f3ff'; }}
          onMouseOut={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.background='#f8fafc'; }}>
            <div style={{ fontSize:32, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:15, fontWeight:700, color:'#1e293b', marginBottom:4 }}>{s.name}</div>
            <div style={{ fontSize:12, color:'#64748b' }}>{s.ageRange}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Level Intro ────────────────────────────────────────────────────────
function LevelIntro({ level, levelIndex, schoolName, onBegin }) {
  return (
    <div style={{ textAlign:'center', padding:'48px 20px' }}>
      <LevelBadge level={level} />
      <h2 style={{ fontSize:24, fontWeight:800, color:'#1e293b', margin:'16px 0 8px' }}>
        Level {levelIndex + 1}: {level.nameAr}
      </h2>
      <p style={{ fontSize:14, color:'#64748b', maxWidth:480, margin:'0 auto 12px', lineHeight:1.7 }}>
        {level.description}
      </p>
      <div style={{ background:'#f8fafc', borderRadius:12, padding:'16px 20px', maxWidth:400, margin:'0 auto 28px', fontSize:13, color:'#475569', border:'1px solid #e2e8f0' }}>
        <div style={{ marginBottom:6 }}>🏫 <strong>School Track:</strong> {schoolName}</div>
        <div style={{ marginBottom:6 }}>📋 <strong>Questions:</strong> 10 (Vocabulary, Grammar, Reading, Quran, Writing)</div>
        <div style={{ marginBottom:6 }}>⏱ <strong>Time Limit:</strong> 25 minutes</div>
        <div>✅ <strong>Pass Mark:</strong> 7/10 (70%)</div>
      </div>
      <button onClick={onBegin} style={{ background:'linear-gradient(135deg,#059669,#0d9488)', color:'#fff', border:'none', borderRadius:12, padding:'14px 40px', fontSize:16, fontWeight:700, cursor:'pointer' }}>
        Begin Level {levelIndex + 1} ➜
      </button>
    </div>
  );
}

// ── Screen: Exam ───────────────────────────────────────────────────────────────
function ExamScreen({ questions, level, schoolName, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = questions[current];
  const total = questions.length;

  const handleEnd = useCallback(() => {
    const finalAnswers = answers.length < total ? [...answers, { q: q?.id, chosen: null, correct: q?.answer }] : answers;
    onFinish(finalAnswers);
  }, [answers, q, total, onFinish]);

  const timeLeft = useTimer(25 * 60, handleEnd);

  function handleSelect(opt) {
    if (revealed) return;
    setSelected(opt);
  }

  function handleConfirm() {
    if (!selected || revealed) return;
    setRevealed(true);
  }

  function handleNext() {
    const newAnswers = [...answers, { q: q.id, chosen: selected, correct: q.answer, passed: selected === q.answer }];
    if (current + 1 >= total) {
      onFinish(newAnswers);
    } else {
      setAnswers(newAnswers);
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  const optLabels = ['A', 'B', 'C', 'D'];
  const mm = Math.floor(timeLeft / 60);
  const ss = timeLeft % 60;
  const timerColor = timeLeft < 120 ? '#ef4444' : timeLeft < 300 ? '#f59e0b' : '#10b981';

  return (
    <div style={{ maxWidth:640, margin:'0 auto', padding:'20px 16px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <LevelBadge level={level} />
        <div style={{ fontSize:18, fontWeight:800, color:timerColor, fontVariantNumeric:'tabular-nums' }}>
          ⏱ {pad(mm)}:{pad(ss)}
        </div>
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#64748b', marginBottom:4 }}>
          <span>Question {current + 1} of {total}</span>
          <span>{SECTION_LABELS[q.section] || q.section}</span>
        </div>
        <ProgressBar value={current} max={total} color='#7c3aed' />
      </div>
      <div style={{ background:'#fff', borderRadius:16, padding:'24px 20px', border:'1px solid #e2e8f0', marginBottom:16, boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
        <p style={{ fontSize:q.rtl ? 20 : 16, fontWeight:600, color:'#1e293b', direction: q.rtl ? 'rtl' : 'ltr', textAlign: q.rtl ? 'right' : 'left', margin:0, lineHeight:1.7 }}>
          {q.question}
        </p>
      </div>
      <div style={{ display:'grid', gap:10, marginBottom:16 }}>
        {q.options.map((opt, i) => {
          let bg = '#f8fafc', border = '#e2e8f0', color = '#1e293b';
          if (selected === opt && !revealed) { bg='#ede9fe'; border='#7c3aed'; }
          if (revealed) {
            if (opt === q.answer) { bg='#dcfce7'; border='#16a34a'; color='#15803d'; }
            else if (opt === selected && opt !== q.answer) { bg='#fee2e2'; border='#dc2626'; color='#b91c1c'; }
          }
          return (
            <button key={i} onClick={() => handleSelect(opt)} style={{
              background:bg, border:`2px solid ${border}`, borderRadius:12, padding:'12px 16px',
              fontSize: q.rtl ? 17 : 14, direction: q.rtl ? 'rtl' : 'ltr', textAlign:'left',
              cursor: revealed ? 'default' : 'pointer', color, fontWeight:500, transition:'all 0.2s',
              display:'flex', alignItems:'flex-start', gap:10,
            }}>
              <span style={{ minWidth:24, height:24, borderRadius:99, background: selected===opt && !revealed ? '#7c3aed' : '#e2e8f0', color: selected===opt && !revealed ? '#fff' : '#64748b', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, flexShrink:0 }}>
                {optLabels[i]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {revealed && q.explanation && (
        <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, padding:'10px 14px', fontSize:13, color:'#166534', marginBottom:16 }}>
          💡 <strong>Explanation:</strong> {q.explanation}
        </div>
      )}
      {!revealed ? (
        <button onClick={handleConfirm} disabled={!selected} style={{
          width:'100%', background: selected ? 'linear-gradient(135deg,#1d4ed8,#7c3aed)' : '#e2e8f0',
          color: selected ? '#fff' : '#94a3b8', border:'none', borderRadius:12, padding:'14px 0',
          fontSize:15, fontWeight:700, cursor: selected ? 'pointer' : 'default',
        }}>
          Confirm Answer ✔
        </button>
      ) : (
        <button onClick={handleNext} style={{ width:'100%', background:'linear-gradient(135deg,#059669,#0d9488)', color:'#fff', border:'none', borderRadius:12, padding:'14px 0', fontSize:15, fontWeight:700, cursor:'pointer' }}>
          {current + 1 >= total ? 'Finish Level 🏁' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}

// ── Screen: Level Result ──────────────────────────────────────────────────────
function LevelResult({ level, score, total, passed, onNext, onRetry, isLast }) {
  return (
    <div style={{ textAlign:'center', padding:'48px 20px' }}>
      <div style={{ fontSize:56, marginBottom:12 }}>{passed ? '🎉' : '💪'}</div>
      <LevelBadge level={level} />
      <h2 style={{ fontSize:24, fontWeight:800, color:'#1e293b', margin:'16px 0 8px' }}>
        {level.name} ({level.cefr}) — {passed ? 'Passed!' : 'Attempt Again'}
      </h2>
      <div style={{ fontSize:48, fontWeight:900, color: passed ? '#059669' : '#dc2626', margin:'8px 0' }}>
        {score}/{total}
      </div>
      <p style={{ color:'#64748b', margin:'0 0 24px', fontSize:14 }}>
        {passed
          ? (isLast ? 'Outstanding! You have completed all levels.' : 'Excellent! You may proceed to the next level.')
          : 'You need 70% to advance. Review the vocabulary and grammar for ' + level.name + ' and try again.'}
      </p>
      <ProgressBar value={score} max={total} color={passed ? '#059669' : '#dc2626'} />
      <p style={{ fontSize:12, color:'#94a3b8', margin:'8px 0 28px' }}>{Math.round((score/total)*100)}% — Pass mark: 70%</p>
      <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
        {!passed && <button onClick={onRetry} style={{ background:'linear-gradient(135deg,#d97706,#b45309)', color:'#fff', border:'none', borderRadius:12, padding:'12px 28px', fontSize:14, fontWeight:700, cursor:'pointer' }}>
          Retry Level 🔄
        </button>}
        <button onClick={onNext} style={{ background:'linear-gradient(135deg,#1d4ed8,#7c3aed)', color:'#fff', border:'none', borderRadius:12, padding:'12px 28px', fontSize:14, fontWeight:700, cursor:'pointer' }}>
          {passed && !isLast ? 'Next Level →' : 'View Full Report 📋'}
        </button>
      </div>
    </div>
  );
}

// ── Screen: Final Report ──────────────────────────────────────────────────────
function FinalReport({ studentName, schoolType, levelResults, onRestart }) {
  const [showCert, setShowCert] = useState(false);

  const passedLevels = levelResults.filter(r => r.passed);
  const highestPassed = passedLevels.length > 0 ? passedLevels[passedLevels.length - 1] : null;
  const finalLevelId = highestPassed ? highestPassed.levelId : 'mubtadi';
  const finalLevel = LEVELS.find(l => l.id === finalLevelId) || LEVELS[0];
  const school = SCHOOL_TYPES.find(s => s.id === schoolType);

  return (
    <div style={{ maxWidth:640, margin:'0 auto', padding:'32px 16px' }}>
      {showCert && (
        <CertificateView
          studentName={studentName}
          schoolType={schoolType}
          finalLevel={finalLevelId}
          levelResults={levelResults}
          onClose={() => setShowCert(false)}
        />
      )}
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <div style={{ fontSize:52, marginBottom:8 }}>📋</div>
        <h2 style={{ fontSize:24, fontWeight:800, color:'#1e293b', margin:'0 0 4px' }}>Full Exam Report</h2>
        {studentName && <p style={{ fontSize:15, color:'#7c3aed', fontWeight:600, margin:'0 0 4px' }}>{studentName}</p>}
        <p style={{ fontSize:13, color:'#64748b', margin:0 }}>{school?.name} • {new Date().toLocaleDateString('en-GB', {year:'numeric',month:'long',day:'numeric'})}</p>
      </div>
      <div style={{ background:'linear-gradient(135deg,#1e293b,#3b4f6b)', borderRadius:16, padding:'24px 28px', marginBottom:24, color:'#fff', textAlign:'center' }}>
        <p style={{ fontSize:12, color:'#94a3b8', margin:'0 0 4px', letterSpacing:2, textTransform:'uppercase' }}>Certified Proficiency Level</p>
        <div style={{ background:finalLevel.bg, color:finalLevel.color, display:'inline-block', padding:'6px 20px', borderRadius:20, fontSize:18, fontWeight:800, margin:'0 0 4px' }}>
          {finalLevel.name}
        </div>
        <p style={{ fontSize:14, color:'#94a3b8', margin:0 }}>{finalLevel.cefr} — {finalLevel.description}</p>
      </div>
      <div style={{ display:'grid', gap:12, marginBottom:24 }}>
        {levelResults.map((r) => {
          const lv = LEVELS.find(l => l.id === r.levelId);
          return (
            <div key={r.levelId} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div>
                <div style={{ fontWeight:700, color:'#1e293b', fontSize:14 }}>{lv?.name} ({lv?.cefr})</div>
                <div style={{ fontSize:12, color:'#64748b' }}>{r.score}/10 — {Math.round((r.score/10)*100)}%</div>
              </div>
              <span style={{ fontWeight:800, fontSize:13, color: r.passed ? '#059669' : '#dc2626', background: r.passed ? '#dcfce7' : '#fee2e2', padding:'4px 12px', borderRadius:20 }}>
                {r.passed ? '✓ PASSED' : '✕ STOPPED'}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
        <button onClick={() => setShowCert(true)} style={{ flex:1, minWidth:160, background:'linear-gradient(135deg,#1d4ed8,#7c3aed)', color:'#fff', border:'none', borderRadius:12, padding:'14px 0', fontSize:14, fontWeight:700, cursor:'pointer' }}>
          🏅 View Certificate
        </button>
        <button onClick={onRestart} style={{ flex:1, minWidth:160, background:'#f1f5f9', color:'#475569', border:'none', borderRadius:12, padding:'14px 0', fontSize:14, fontWeight:700, cursor:'pointer' }}>
          🔄 Start New Exam
        </button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function PathwaysExam() {
  const [screen, setScreen] = useState('welcome');     // welcome | school | levelIntro | exam | levelResult | report
  const [studentName, setStudentName] = useState('');
  const [schoolType, setSchoolType] = useState(null);
  const [levelIndex, setLevelIndex] = useState(0);
  const [levelResults, setLevelResults] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState([]);

  const level = LEVELS[levelIndex];
  const school = SCHOOL_TYPES.find(s => s.id === schoolType);

  function handleStart(name) {
    setStudentName(name);
    setScreen('school');
  }

  function handleSchoolSelect(sType) {
    setSchoolType(sType);
    setLevelIndex(0);
    setLevelResults([]);
    setScreen('levelIntro');
  }

  function handleBeginLevel() {
    setScreen('exam');
  }

  function handleLevelFinish(answers) {
    const score = calcScore(answers);
    const passed = score >= 7;
    const result = { levelId: level.id, score, passed, answers };
    const newResults = [...levelResults, result];
    setLevelResults(newResults);
    setCurrentAnswers(answers);
    setScreen('levelResult');
    // Auto-save to localStorage on each level completion
    if (passed && levelIndex + 1 >= LEVELS.length) {
      // Final level done - save full result
      const record = {
        id: Date.now(),
        studentName,
        schoolType,
        finalLevel: level.id,
        date: new Date().toISOString(),
        levelResults: newResults,
      };
      saveResult(record);
    }
  }

  function handleLevelResultNext() {
    const lastResult = levelResults[levelResults.length - 1];
    if (!lastResult.passed || levelIndex + 1 >= LEVELS.length) {
      // Failed or completed all levels — go to report
      // Save full result to localStorage
      const record = {
        id: Date.now(),
        studentName,
        schoolType,
        finalLevel: lastResult.passed ? level.id : (levelIndex > 0 ? LEVELS[levelIndex - 1].id : null),
        date: new Date().toISOString(),
        levelResults,
      };
      saveResult(record);
      setScreen('report');
    } else {
      setLevelIndex(i => i + 1);
      setScreen('levelIntro');
    }
  }

  function handleLevelRetry() {
    const newResults = levelResults.slice(0, -1);
    setLevelResults(newResults);
    setScreen('exam');
  }

  function handleRestart() {
    setScreen('welcome');
    setStudentName('');
    setSchoolType(null);
    setLevelIndex(0);
    setLevelResults([]);
    setCurrentAnswers([]);
  }

  const lastResult = levelResults[levelResults.length - 1];
  const qs = schoolType && level ? QUESTIONS[schoolType]?.[level.id] || [] : [];

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#f8f9ff 0%,#f0f4ff 100%)', paddingBottom:48 }}>
      <div style={{ maxWidth:720, margin:'0 auto', padding:'0 16px' }}>
        {screen === 'welcome'     && <WelcomeScreen onStart={handleStart} />}
        {screen === 'school'      && <SchoolSelector onSelect={handleSchoolSelect} />}
        {screen === 'levelIntro'  && <LevelIntro level={level} levelIndex={levelIndex} schoolName={school?.name || ''} onBegin={handleBeginLevel} />}
        {screen === 'exam'        && <ExamScreen questions={qs} level={level} schoolName={school?.name || ''} onFinish={handleLevelFinish} />}
        {screen === 'levelResult' && lastResult && (
          <LevelResult
            level={level}
            score={lastResult.score}
            total={10}
            passed={lastResult.passed}
            onNext={handleLevelResultNext}
            onRetry={handleLevelRetry}
            isLast={!lastResult.passed || levelIndex + 1 >= LEVELS.length}
          />
        )}
        {screen === 'report' && (
          <FinalReport
            studentName={studentName}
            schoolType={schoolType}
            levelResults={levelResults}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
