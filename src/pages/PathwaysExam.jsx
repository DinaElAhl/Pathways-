import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SCHOOL_TYPES, LEVELS, QUESTIONS, EXAM_META, calcScore } from '../data/examData';

// ── Helpers ────────────────────────────────────────────────────────────────────
const SECTION_LABELS = {
  vocabulary: 'Vocabulary / المفردات',
  grammar:    'Grammar / القواعد',
  reading:    'Reading / القراءة',
  quran:      'Quran & Tajweed / القرآن والتجويد',
  writing:    'Writing Skills / مهارات الكتابة',
};

function pad(n) { return String(n).padStart(2, '0'); }

function useTimer(seconds, onEnd) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) { onEnd(); return; }
    const id = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(id);
  }, [left, onEnd]);
  return left;
}

// ── Sub-components ─────────────────────────────────────────────────────────────
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

// ── Screen: Welcome ────────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>📖</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1e293b', margin: '0 0 12px' }}>
        Pathways Arabic & Quran Proficiency Exam
      </h1>
      <p style={{ fontSize: 13, color: '#7c3aed', fontWeight: 700, letterSpacing: 1, margin: '0 0 8px' }}>
        RAQP — امتحان مهارات اللغة العربية والقرآن الكريم
      </p>
      <p style={{ color: '#64748b', maxWidth: 540, margin: '0 auto 32px', lineHeight: 1.7 }}>
        A fully adaptive, internationally-aligned proficiency assessment covering four levels (A1–C1).
        You begin at Level 1. Pass each level to advance. Your final level is your certified proficiency.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, maxWidth: 560, margin: '0 auto 36px' }}>
        {[
          { icon: '🎯', title: '4 Progressive Levels', desc: 'Mubtadi A1 → Asasi B1 → Mutawassit B2 → Mutaqaddim C1' },
          { icon: '🏫', title: 'Age-Appropriate', desc: 'Questions adapt to your school level for fair assessment' },
          { icon: '✅', title: '10 Questions / Level', desc: 'Vocabulary, grammar, reading, Quran & writing' },
          { icon: '⏱️', title: '25 Min / Level', desc: 'International standard timing — auto-submits on timeout' },
        ].map((f, i) => (
          <div key={i} style={{ background: '#f8fafc', borderRadius: 12, padding: '14px 16px', textAlign: 'left', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>{f.title}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{f.desc}</div>
          </div>
        ))}
      </div>
      <button onClick={onStart} style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 40px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
        Start Exam ← ابدأ الامتحان
      </button>
    </div>
  );
}

// ── Screen: School Type Selector ───────────────────────────────────────────────
function SchoolSelector({ onSelect }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Select Your School Level</h2>
      <p style={{ color: '#64748b', marginBottom: 32 }}>اختر مرحلتك الدراسية — Questions will be age-appropriate for your selection</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, maxWidth: 700, margin: '0 auto' }}>
        {SCHOOL_TYPES.map(st => (
          <button key={st.id} onClick={() => onSelect(st)} style={{ background: '#fff', border: '2px solid #e2e8f0', borderRadius: 16, padding: '24px 16px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = ''; }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{st.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>{st.label}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>Ages {st.ages}</div>
            <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{st.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Level Intro ────────────────────────────────────────────────────────
function LevelIntro({ level, schoolType, levelIndex, totalPassed, onBegin }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ display: 'inline-block', background: level.bg, borderRadius: 16, padding: '20px 32px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: level.color, letterSpacing: 1, marginBottom: 4 }}>LEVEL {level.id} OF 4</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: level.color }}>{level.arabic}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1e293b' }}>{level.name}</div>
        <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>CEFR {level.cefr} · {level.label}</div>
      </div>
      <p style={{ color: '#475569', maxWidth: 480, margin: '0 auto 16px', lineHeight: 1.7 }}>
        {levelIndex === 0
          ? `You are starting at Level 1. This is the entry point for all students. Answer 10 questions to unlock Level 2.`
          : `Excellent! You passed Level ${levelIndex}. Now attempt Level ${level.id} to confirm your proficiency at ${level.cefr}.`}
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
        <div style={{ background: '#f1f5f9', borderRadius: 10, padding: '10px 18px', fontSize: 13 }}>
          <strong>School:</strong> {schoolType.icon} {schoolType.label}
        </div>
        <div style={{ background: '#f1f5f9', borderRadius: 10, padding: '10px 18px', fontSize: 13 }}>
          <strong>Time:</strong> {EXAM_META.timePerLevelMinutes} minutes
        </div>
        <div style={{ background: '#f1f5f9', borderRadius: 10, padding: '10px 18px', fontSize: 13 }}>
          <strong>Pass mark:</strong> 70% (7 of 10)
        </div>
      </div>
      <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 12, padding: '12px 20px', maxWidth: 440, margin: '0 auto 28px', fontSize: 13, color: '#7c3aed' }}>
        📌 Surahs tested at this level: <strong>{level.surahs}</strong>
      </div>
      <button onClick={onBegin} style={{ background: level.color, color: '#fff', border: 'none', borderRadius: 12, padding: '14px 40px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
        Begin Level {level.id} ←
      </button>
    </div>
  );
}

// ── Screen: Exam ───────────────────────────────────────────────────────────────
function ExamScreen({ level, schoolType, onComplete }) {
  const questions = QUESTIONS['L' + level.id]?.[schoolType.id] || [];
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const totalSec = EXAM_META.timePerLevelMinutes * 60;
  const handleTimeout = useCallback(() => {
    setTimedOut(true);
    const finalAnswers = [...answers, ...(new Array(questions.length - answers.length).fill(null))];
    setTimeout(() => onComplete(finalAnswers, questions), 1500);
  }, [answers, questions, onComplete]);

  const timeLeft = useTimer(totalSec, handleTimeout);
  const q = questions[qIndex];
  const timerColor = timeLeft < 120 ? '#dc2626' : timeLeft < 300 ? '#f59e0b' : '#16a34a';
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  function handleSelect(idx) {
    if (revealed) return;
    setSelected(idx);
  }

  function handleConfirm() {
    if (selected === null) return;
    setRevealed(true);
  }

  function handleNext() {
    const newAnswers = [...answers, selected];
    if (qIndex + 1 >= questions.length) {
      onComplete(newAnswers, questions);
    } else {
      setAnswers(newAnswers);
      setQIndex(qIndex + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  if (timedOut) {
    return (
      <div style={{ textAlign: 'center', padding: 48 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⏰</div>
        <h3 style={{ color: '#dc2626', marginBottom: 8 }}>Time's up!</h3>
        <p style={{ color: '#64748b' }}>Calculating your score...</p>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <LevelBadge level={level} />
        <div style={{ background: timerColor + '15', color: timerColor, borderRadius: 10, padding: '6px 14px', fontSize: 15, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
          ⏱ {pad(mins)}:{pad(secs)}
        </div>
      </div>

      <ProgressBar value={qIndex} max={questions.length} color={level.color} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', margin: '6px 0 20px' }}>
        <span>Question {qIndex + 1} of {questions.length}</span>
        <span style={{ background: '#f1f5f9', borderRadius: 20, padding: '2px 10px' }}>{SECTION_LABELS[q.section] || q.section}</span>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: 16, direction: 'rtl', textAlign: 'right', lineHeight: 1.8, fontSize: 17, fontWeight: 600, color: '#1e293b' }}>
        {q.q}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {q.opts.map((opt, i) => {
          let bg = '#fff'; let border = '#e2e8f0'; let color = '#1e293b';
          if (revealed) {
            if (i === q.answer) { bg = '#dcfce7'; border = '#16a34a'; color = '#15803d'; }
            else if (i === selected && i !== q.answer) { bg = '#fee2e2'; border = '#dc2626'; color = '#b91c1c'; }
          } else if (selected === i) { bg = '#eff6ff'; border = '#1d4ed8'; color = '#1d4ed8'; }
          return (
            <button key={i} onClick={() => handleSelect(i)} style={{ background: bg, border: '2px solid ' + border, borderRadius: 12, padding: '12px 16px', textAlign: 'right', direction: 'rtl', cursor: revealed ? 'default' : 'pointer', color, fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.15s' }}>
              <span style={{ background: border, color: revealed && i === q.answer ? '#15803d' : '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                {revealed && i === q.answer ? '✓' : revealed && i === selected && i !== q.answer ? '✗' : String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '12px 16px', marginBottom: 16, direction: 'rtl', textAlign: 'right', fontSize: 13, color: '#15803d' }}>
          <strong>💡 Explanation: </strong>{q.explain}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        {!revealed ? (
          <button onClick={handleConfirm} disabled={selected === null} style={{ background: selected === null ? '#e2e8f0' : level.color, color: '#fff', border: 'none', borderRadius: 10, padding: '11px 28px', fontSize: 14, fontWeight: 700, cursor: selected === null ? 'not-allowed' : 'pointer' }}>
            Confirm Answer ←
          </button>
        ) : (
          <button onClick={handleNext} style={{ background: level.color, color: '#fff', border: 'none', borderRadius: 10, padding: '11px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            {qIndex + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Screen: Level Result ───────────────────────────────────────────────────────
function LevelResult({ level, score, passed, schoolType, isLastLevel, onContinue, onRetry, onFinish }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>{passed ? '🎉' : '📚'}</div>
      <div style={{ background: passed ? '#dcfce7' : '#fee2e2', borderRadius: 16, padding: '20px 28px', display: 'inline-block', marginBottom: 24 }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: passed ? '#16a34a' : '#dc2626' }}>{score}%</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: passed ? '#15803d' : '#b91c1c', marginTop: 4 }}>
          {passed ? 'Level Passed! ✓' : 'Not yet — Keep studying'}
        </div>
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>
        {level.name} ({level.cefr}) — {passed ? 'Achieved' : 'Attempt Again'}
      </h3>
      <p style={{ color: '#64748b', maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.7 }}>
        {passed
          ? isLastLevel
            ? `Congratulations! You have completed all 4 levels and reached ${level.cefr} proficiency.`
            : `Well done! You are now certified at ${level.cefr}. Proceed to ${LEVELS[level.id]?.name || 'the next level'}.`
          : `You need 70% to advance. Review the vocabulary and grammar for ${level.name} and try again.`}
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {!passed && <button onClick={onRetry} style={{ background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Retry Level ↺</button>}
        {passed && !isLastLevel && <button onClick={onContinue} style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Next Level →</button>}
        {(isLastLevel && passed) || !passed
          ? <button onClick={onFinish} style={{ background: '#1e293b', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>View Full Report 📄</button>
          : null}
      </div>
    </div>
  );
}

// ── Screen: Final Report ───────────────────────────────────────────────────────
function FinalReport({ results, schoolType, onRestart }) {
  const highestPassed = results.filter(r => r.passed).at(-1);
  const cert = highestPassed || null;
  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{cert ? '🏅' : '📝'}</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', margin: '0 0 6px' }}>Exam Report</h2>
        <p style={{ color: '#64748b', margin: 0 }}>{schoolType.icon} {schoolType.label}</p>
      </div>

      {cert && (
        <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#1d4ed8,#7c3aed)', borderRadius: 20, padding: '28px 24px', color: '#fff', textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, color: '#c7d2fe', marginBottom: 4 }}>CERTIFIED LEVEL</div>
          <div style={{ fontSize: 48, fontWeight: 900, marginBottom: 4 }}>{cert.level.arabic}</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{cert.level.name} · {cert.level.cefr}</div>
          <div style={{ fontSize: 13, color: '#a5b4fc', marginTop: 6 }}>{cert.level.label} — Pathways RAQP Certification</div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {results.map((r, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{r.level.name} ({r.level.cefr})</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{r.level.label}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: r.passed ? '#16a34a' : '#dc2626' }}>{r.score}%</span>
              <span style={{ background: r.passed ? '#dcfce7' : '#fee2e2', color: r.passed ? '#15803d' : '#b91c1c', borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>
                {r.passed ? 'Passed' : 'Not passed'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {!cert && (
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 12, padding: '14px 18px', marginBottom: 24, fontSize: 13, color: '#92400e', textAlign: 'center' }}>
          You did not pass Level 1 yet. Don't worry — review the basics and try again!
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onRestart} style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Take Exam Again ↺</button>
        <Link to="/accredited-exams" style={{ background: '#1e293b', color: '#fff', borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>All Exams →</Link>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PathwaysExam() {
  const [screen, setScreen] = useState('welcome');   // welcome | school | levelIntro | exam | levelResult | report
  const [schoolType, setSchoolType] = useState(null);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [results, setResults] = useState([]);
  const [lastScore, setLastScore] = useState(null);

  const currentLevel = LEVELS[currentLevelIdx];

  function handleStart() { setScreen('school'); }
  function handleSelectSchool(st) { setSchoolType(st); setScreen('levelIntro'); }
  function handleBeginLevel() { setScreen('exam'); }

  function handleLevelComplete(answers, questions) {
    const score = calcScore(answers, questions);
    const passed = score >= EXAM_META.passMark;
    setLastScore(score);
    const newResults = [...results, { level: currentLevel, score, passed }];
    setResults(newResults);
    setScreen('levelResult');
  }

  function handleContinue() {
    setCurrentLevelIdx(i => i + 1);
    setScreen('levelIntro');
  }

  function handleRetry() {
    setScreen('levelIntro');
  }

  function handleFinish() {
    setScreen('report');
  }

  function handleRestart() {
    setScreen('welcome');
    setSchoolType(null);
    setCurrentLevelIdx(0);
    setResults([]);
    setLastScore(null);
  }

  const passed = lastScore !== null && lastScore >= EXAM_META.passMark;
  const isLastLevel = currentLevelIdx >= LEVELS.length - 1;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#f0f4ff 0%,#faf5ff 100%)', fontFamily: 'sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#1d4ed8,#7c3aed)', padding: '20px 20px 16px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: 30, padding: '6px 16px', marginBottom: 10 }}>
          <span style={{ fontSize: 14 }}>📖</span>
          <span style={{ color: '#c7d2fe', fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>PATHWAYS RAQP EXAM</span>
        </div>
        {screen !== 'welcome' && screen !== 'report' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {LEVELS.map((l, i) => (
              <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i < currentLevelIdx ? '#16a34a' : i === currentLevelIdx ? l.color : 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', border: i === currentLevelIdx ? '2px solid #fff' : 'none', transition: 'all 0.3s' }}>
                  {i < currentLevelIdx ? '✓' : l.id}
                </div>
                {i < LEVELS.length - 1 && <div style={{ width: 24, height: 2, background: i < currentLevelIdx ? '#16a34a' : 'rgba(255,255,255,0.2)' }} />}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {screen === 'welcome'     && <WelcomeScreen onStart={handleStart} />}
        {screen === 'school'      && <SchoolSelector onSelect={handleSelectSchool} />}
        {screen === 'levelIntro'  && <LevelIntro level={currentLevel} schoolType={schoolType} levelIndex={currentLevelIdx} totalPassed={results.filter(r=>r.passed).length} onBegin={handleBeginLevel} />}
        {screen === 'exam'        && <ExamScreen key={'L'+currentLevel.id+schoolType.id} level={currentLevel} schoolType={schoolType} onComplete={handleLevelComplete} />}
        {screen === 'levelResult' && <LevelResult level={currentLevel} score={lastScore} passed={passed} schoolType={schoolType} isLastLevel={isLastLevel} onContinue={handleContinue} onRetry={handleRetry} onFinish={handleFinish} />}
        {screen === 'report'      && <FinalReport results={results} schoolType={schoolType} onRestart={handleRestart} />}
      </div>
    </div>
  );
}
