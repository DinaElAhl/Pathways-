import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SCHOOL_TYPES, LEVELS, QUESTIONS, calcScore } from '../data/examData';

// ─── Global CSS (injected once) ───────────────────────────────────────────────
const CSS = `
@keyframes popIn   { 0%{transform:scale(0.7);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
@keyframes shake   { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
@keyframes slideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
@keyframes glow    { 0%,100%{box-shadow:0 0 0 0 rgba(88,204,2,0)} 50%{box-shadow:0 0 0 12px rgba(88,204,2,0.18)} }
@keyframes heartBeat{ 0%,100%{transform:scale(1)} 30%{transform:scale(1.35)} 60%{transform:scale(0.9)} }
@keyframes xpFloat { 0%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-48px) scale(1.5)} }
@keyframes progressFill { from{width:0} to{width:100%} }
@keyframes spin    { to{transform:rotate(360deg)} }
@keyframes streakPop { 0%{transform:scale(1)} 50%{transform:scale(1.4) rotate(-8deg)} 100%{transform:scale(1)} }
.duo-opt { transition: transform 0.12s, box-shadow 0.12s; }
.duo-opt:active { transform: scale(0.97); }
.duo-opt.correct { animation: glow 0.6s ease; }
.duo-opt.wrong   { animation: shake 0.4s ease; }
.duo-btn { transition: transform 0.1s, opacity 0.1s; }
.duo-btn:active { transform: scale(0.97); }
.xp-float { animation: xpFloat 1s ease forwards; }
.heart-pop { animation: heartBeat 0.4s ease; }
.streak-pop { animation: streakPop 0.5s ease; }
`;

function injectCSS() {
  if (document.getElementById('duo-css')) return;
  const s = document.createElement('style');
  s.id = 'duo-css'; s.textContent = CSS;
  document.head.appendChild(s);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const pad = n => String(n).padStart(2, '0');
const LS_KEY = 'raqp_results';
function saveResult(r) { try { const p=JSON.parse(localStorage.getItem(LS_KEY)||'[]'); p.unshift(r); localStorage.setItem(LS_KEY,JSON.stringify(p.slice(0,100))); } catch(e){} }

function useTimer(secs, onEnd) {
  const [left, setLeft] = useState(secs);
  useEffect(() => { if(left<=0){onEnd();return;} const id=setTimeout(()=>setLeft(l=>l-1),1000); return ()=>clearTimeout(id); }, [left, onEnd]);
  return left;
}

// ─── Prep "flashcard" questions (5 per level, timed 8s, 3 hearts) ────────────
// Uses first 5 questions from the level as warm-up with immediate feedback & XP
function PrepScreen({ questions, level, onDone }) {
  const [idx,   setIdx]    = useState(0);
  const [hearts, setHearts]= useState(3);
  const [xp,     setXp]    = useState(0);
  const [streak, setStreak]= useState(0);
  const [picked, setPicked]= useState(null);   // null | 'correct' | 'wrong'
  const [chosenOpt, setChosen] = useState(null);
  const [xpAnim,  setXpAnim]  = useState(false);
  const [timeKey, setTimeKey] = useState(0);
  const prepQs = questions.slice(0, 5);
  const q = prepQs[idx];
  if (!q) { onDone({ xp, hearts }); return null; }

  const handleTimeout = useCallback(() => {
    if (picked) return;
    setHearts(h => Math.max(0, h-1));
    setPicked('wrong');
    setStreak(0);
  }, [picked]);

  const timeLeft = useTimer(8, handleTimeout);

  function choose(opt) {
    if (picked) return;
    const correct = opt === q.answer;
    setChosen(opt);
    setPicked(correct ? 'correct' : 'wrong');
    if (correct) {
      const earned = 10 + streak*2;
      setXp(x => x+earned);
      setStreak(s => s+1);
      setXpAnim(true);
      setTimeout(()=>setXpAnim(false), 1000);
    } else {
      setHearts(h => Math.max(0,h-1));
      setStreak(0);
    }
  }

  function next() {
    if (idx+1 >= prepQs.length || hearts === 0) {
      onDone({ xp, hearts });
    } else {
      setIdx(i=>i+1);
      setPicked(null);
      setChosen(null);
      setTimeKey(k=>k+1);
    }
  }

  const pct = ((8-timeLeft)/8)*100;
  const timerColor = timeLeft<3 ? '#ff4b4b' : timeLeft<5 ? '#ffc800' : '#58cc02';

  return (
    <div style={{ minHeight:'100vh', background:'#fff', display:'flex', flexDirection:'column' }}>
      {/* Top bar */}
      <div style={{ display:'flex', alignItems:'center', padding:'16px 20px', gap:16, borderBottom:'2px solid #e5e5e5', position:'sticky', top:0, background:'#fff', zIndex:10 }}>
        <div style={{ display:'flex', gap:4 }}>
          {[0,1,2].map(i=>(
            <span key={i} style={{ fontSize:20, filter: i>=hearts ? 'grayscale(1) opacity(0.3)' : 'none', transition:'all 0.3s' }}
              className={i===hearts-1 && picked==='wrong' ? 'heart-pop' : ''}>
              ❤️
            </span>
          ))}
        </div>
        <div style={{ flex:1, background:'#e5e5e5', borderRadius:99, height:8, overflow:'hidden' }}>
          <div style={{ width: ((idx)/prepQs.length*100)+'%', background:'#58cc02', height:'100%', transition:'width 0.4s', borderRadius:99 }} />
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:16 }}>⚡</span>
          <span style={{ fontWeight:800, color:'#ff9600', fontSize:15 }}>{xp} XP</span>
          {streak>1 && <span style={{ fontSize:13, fontWeight:700, color:'#ff4b4b', background:'#fff0f0', borderRadius:12, padding:'2px 8px' }} className="streak-pop">🔥{streak}</span>}
        </div>
        {/* Timer ring */}
        <div style={{ position:'relative', width:36, height:36 }}>
          <svg width="36" height="36" style={{ transform:'rotate(-90deg)' }}>
            <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e5e5" strokeWidth="4"/>
            <circle cx="18" cy="18" r="14" fill="none" stroke={timerColor} strokeWidth="4"
              strokeDasharray={2*Math.PI*14} strokeDashoffset={2*Math.PI*14*(1-pct/100)}
              style={{ transition:'stroke-dashoffset 1s linear, stroke 0.3s' }}/>
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color:timerColor }}>
            {timeLeft}
          </div>
        </div>
      </div>

      {/* XP floating */}
      {xpAnim && <div className="xp-float" style={{ position:'fixed', top:80, right:80, fontSize:20, fontWeight:900, color:'#58cc02', zIndex:100 }}>+{10+streak*2} XP</div>}

      {/* Question */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', maxWidth:620, margin:'0 auto', width:'100%', padding:'32px 20px' }}>
        <div style={{ marginBottom:8, fontSize:13, fontWeight:700, color:'#afafaf', letterSpacing:1, textTransform:'uppercase' }}>
          Warm-up {idx+1} of {prepQs.length} • {level.name} ({level.cefr})
        </div>
        <div style={{ fontSize:12, fontWeight:700, color:level.color, background:level.bg, display:'inline-block', padding:'3px 10px', borderRadius:20, marginBottom:20, alignSelf:'flex-start' }}>
          {level.cefr} • Prep Mode
        </div>
        <div style={{ fontSize: q.rtl?22:18, fontWeight:700, color:'#1f1f1f', direction:q.rtl?'rtl':'ltr', textAlign:q.rtl?'right':'left', lineHeight:1.6, marginBottom:28, padding:'0 4px', animation:'popIn 0.3s ease' }}>
          {q.question}
        </div>
        <div style={{ display:'grid', gap:12 }}>
          {q.options.map((opt,i)=>{
            let bg='#fff', border='#e5e5e5', color='#1f1f1f', extra='';
            if (picked) {
              if (opt===q.answer) { bg='#d7ffb8'; border='#58cc02'; color='#2d7a00'; extra=' correct'; }
              else if (opt===chosenOpt && opt!==q.answer) { bg='#ffdfe0'; border='#ff4b4b'; color='#8b0000'; extra=' wrong'; }
            } else if (opt===chosenOpt) { bg='#ddf4ff'; border='#1cb0f6'; }
            return (
              <button key={i} onClick={()=>choose(opt)} className={'duo-opt'+extra} style={{
                background:bg, border:`2px solid ${border}`, borderRadius:14, padding:'14px 18px',
                textAlign: q.rtl?'right':'left', fontSize:q.rtl?18:15, direction:q.rtl?'rtl':'ltr',
                cursor:picked?'default':'pointer', color, fontWeight:600, display:'flex', alignItems:'center', gap:12,
                boxShadow: opt===q.answer && picked ? '0 4px 0 #58cc02' : opt===chosenOpt && picked && opt!==q.answer ? '0 4px 0 #ff4b4b' : '0 4px 0 #e5e5e5',
                transform:'translateY(-2px)',
              }}>
                <span style={{ minWidth:28, height:28, borderRadius:8, border:`2px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:border, background:'transparent', flexShrink:0 }}>
                  {['A','B','C','D'][i]}
                </span>
                {opt}
                {picked && opt===q.answer && <span style={{ marginLeft:'auto', fontSize:18 }}>✅</span>}
                {picked && opt===chosenOpt && opt!==q.answer && <span style={{ marginLeft:'auto', fontSize:18 }}>❌</span>}
              </button>
            );
          })}
        </div>

        {/* Feedback panel */}
        {picked && (
          <div style={{ marginTop:20, borderRadius:14, padding:'16px 18px', background: picked==='correct'?'#d7ffb8':'#ffdfe0', border:`2px solid ${picked==='correct'?'#58cc02':'#ff4b4b'}`, animation:'slideUp 0.3s ease' }}>
            <div style={{ fontWeight:800, fontSize:16, color:picked==='correct'?'#2d7a00':'#a00000', marginBottom:4 }}>
              {picked==='correct' ? '🎊 Excellent! ✨' : '💪 Almost there!'}
            </div>
            <div style={{ fontSize:13, color:picked==='correct'?'#3a8a00':'#c00000' }}>
              {picked==='correct' ? 'Great work! Keep the streak going.' : `Correct answer: ${q.answer}`}
            </div>
            {q.explanation && picked==='wrong' && <div style={{ fontSize:12, color:'#666', marginTop:6 }}>💡 {q.explanation}</div>}
          </div>
        )}
      </div>

      {/* Bottom action */}
      {picked && (
        <div style={{ padding:'16px 20px', borderTop:'2px solid #e5e5e5', background: picked==='correct'?'#d7ffb8':'#ffdfe0', animation:'slideUp 0.3s ease' }}>
          <div style={{ maxWidth:620, margin:'0 auto' }}>
            <button onClick={next} className="duo-btn" style={{
              width:'100%', background: picked==='correct'?'#58cc02':'#ff4b4b', color:'#fff',
              border:'none', borderRadius:14, padding:'16px 0', fontSize:16, fontWeight:800, cursor:'pointer',
              boxShadow: picked==='correct'?'0 4px 0 #3d9900':'0 4px 0 #c03030',
            }}>
              {idx+1>=prepQs.length||hearts===0 ? '🏁 Finish Warm-Up →' : 'Continue →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Prep Summary (between prep and exam) ────────────────────────────────────
function PrepSummary({ level, xp, hearts, onStartExam, onRetryPrep }) {
  const stars = hearts>=3?3:hearts>=2?2:hearts>=1?1:0;
  return (
    <div style={{ minHeight:'100vh', background:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 20px', textAlign:'center' }}>
      <div style={{ fontSize:72, marginBottom:8, animation:'popIn 0.5s ease' }}>{stars===3?'🌟':stars===2?'💫':stars===1?'💪':'💡'}</div>
      <h2 style={{ fontSize:26, fontWeight:900, color:'#1f1f1f', margin:'0 0 6px' }}>Warm-Up Complete!</h2>
      <p style={{ fontSize:15, color:'#777', margin:'0 0 24px' }}>You are ready for the real exam</p>

      {/* Stars */}
      <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:20 }}>
        {[1,2,3].map(s=>(
          <span key={s} style={{ fontSize:32, filter: s<=stars?'none':'grayscale(1) opacity(0.3)', animation:s<=stars?`popIn 0.4s ease ${s*0.15}s both`:'' }}>⭐</span>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display:'flex', gap:20, justifyContent:'center', marginBottom:32 }}>
        <div style={{ background:'#fff7e0', borderRadius:14, padding:'14px 20px', textAlign:'center', border:'2px solid #ffc800' }}>
          <div style={{ fontSize:22, fontWeight:900, color:'#ff9600' }}>{xp}</div>
          <div style={{ fontSize:12, color:'#999', fontWeight:700 }}>XP EARNED</div>
        </div>
        <div style={{ background: hearts>0?'#fff0f0':'#f0f0f0', borderRadius:14, padding:'14px 20px', textAlign:'center', border:`2px solid ${hearts>0?'#ff4b4b':'#ddd'}` }}>
          <div style={{ fontSize:22 }}>{'❤️'.repeat(hearts)||'💔'}</div>
          <div style={{ fontSize:12, color:'#999', fontWeight:700 }}>HEARTS LEFT</div>
        </div>
      </div>

      <div style={{ background:'#fffbe0', borderRadius:16, padding:'16px 20px', maxWidth:400, width:'100%', marginBottom:28, border:'2px solid #ffc800' }}>
        <div style={{ fontWeight:800, color:'#b07800', marginBottom:4, fontSize:14 }}>📋 What's next?</div>
        <div style={{ fontSize:13, color:'#7a5800', lineHeight:1.6 }}>
          The real exam has <strong>10 questions</strong>, 25 minutes, no timer per question. You need <strong>70%</strong> to pass and advance to the next level.
        </div>
      </div>

      <div style={{ display:'flex', gap:12, flexDirection:'column', width:'100%', maxWidth:400 }}>
        <button onClick={onStartExam} className="duo-btn" style={{ background:'#58cc02', color:'#fff', border:'none', borderRadius:14, padding:'16px 0', fontSize:16, fontWeight:800, cursor:'pointer', boxShadow:'0 4px 0 #3d9900' }}>
          🏁 Start Real Exam →
        </button>
        <button onClick={onRetryPrep} className="duo-btn" style={{ background:'#fff', color:'#1cb0f6', border:'2px solid #1cb0f6', borderRadius:14, padding:'14px 0', fontSize:14, fontWeight:700, cursor:'pointer' }}>
          🔄 Redo Warm-Up
        </button>
      </div>
    </div>
  );
}

// ─── Real Exam Screen (Duolingo-style full-focus) ─────────────────────────────
function ExamScreen({ questions, level, schoolName, prepXp, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [chosen,  setChosen]  = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers,  setAnswers]  = useState([]);
  const [examXp,   setExamXp]  = useState(prepXp||0);
  const [xpAnim,   setXpAnim]  = useState(false);

  const q = questions[current];
  const total = questions.length;
  const pct = (current/total)*100;
  if (!q) { return null; }

  const handleEnd = useCallback(() => {
    onFinish([...answers, {q:q?.id, chosen:null, correct:q?.answer, passed:false}]);
  }, [answers, q, onFinish]);

  const timeLeft = useTimer(25*60, handleEnd);
  const mm = Math.floor(timeLeft/60), ss = timeLeft%60;
  const timerColor = timeLeft<120?'#ff4b4b':timeLeft<300?'#ffc800':'#777';

  function pickAnswer(opt) { if (!revealed) setChosen(opt); }
  function confirm() {
    if (!chosen || revealed) return;
    setRevealed(true);
    if (chosen === q.answer) {
      setExamXp(x=>x+15);
      setXpAnim(true);
      setTimeout(()=>setXpAnim(false),900);
    }
  }
  function next() {
    const rec = { q:q.id, chosen, correct:q.answer, passed: chosen===q.answer };
    const newAns = [...answers, rec];
    if (current+1>=total) { onFinish(newAns); }
    else {
      setAnswers(newAns);
      setCurrent(c=>c+1);
      setChosen(null);
      setRevealed(false);
    }
  }

  const isCorrect = revealed && chosen===q.answer;
  const isWrong   = revealed && chosen!==q.answer;

  return (
    <div style={{ minHeight:'100vh', background:'#fff', display:'flex', flexDirection:'column' }}>
      {/* Top bar */}
      <div style={{ display:'flex', alignItems:'center', padding:'14px 20px', gap:16, borderBottom:'2px solid #e5e5e5', position:'sticky', top:0, background:'#fff', zIndex:10 }}>
        <div style={{ flex:1, background:'#e5e5e5', borderRadius:99, height:10, overflow:'hidden' }}>
          <div style={{ width:pct+'%', background:'#58cc02', height:'100%', borderRadius:99, transition:'width 0.5s', minWidth: pct>0?8:0 }}/>
        </div>
        <div style={{ fontSize:12, fontWeight:800, color:timerColor, fontVariantNumeric:'tabular-nums' }}>
          ⏱ {pad(mm)}:{pad(ss)}
        </div>
        <div style={{ fontSize:12, fontWeight:800, color:'#ff9600' }}>⚡ {examXp} XP</div>
      </div>

      {xpAnim && <div className="xp-float" style={{ position:'fixed', top:70, right:60, fontSize:18, fontWeight:900, color:'#58cc02', zIndex:100 }}>+15 XP</div>}

      {/* Question body */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', maxWidth:640, margin:'0 auto', width:'100%', padding:'28px 20px 12px' }}>
        <div style={{ fontSize:12, fontWeight:700, color:'#afafaf', marginBottom:6, textTransform:'uppercase', letterSpacing:1 }}>
          Question {current+1} of {total}
        </div>
        <div style={{ fontSize:14, fontWeight:700, color:level.color, marginBottom:20 }}>
          {level.name} ({level.cefr}) • Real Exam
        </div>
        <div style={{ fontSize: q.rtl?22:18, fontWeight:700, color:'#1f1f1f', direction:q.rtl?'rtl':'ltr', textAlign:q.rtl?'right':'left', lineHeight:1.7, marginBottom:28, animation:'popIn 0.25s ease' }}>
          {q.question}
        </div>

        <div style={{ display:'grid', gap:12 }}>
          {q.options.map((opt,i)=>{
            let bg='#fff', border='#e5e5e5', color='#1f1f1f', shadow='0 4px 0 #e5e5e5', cls='duo-opt';
            if (!revealed && opt===chosen) { bg='#ddf4ff'; border='#1cb0f6'; shadow='0 4px 0 #1cb0f6'; }
            if (revealed) {
              if (opt===q.answer)                          { bg='#d7ffb8'; border='#58cc02'; color='#2d7a00'; shadow='0 4px 0 #3d9900'; cls+=' correct'; }
              else if (opt===chosen && opt!==q.answer)     { bg='#ffdfe0'; border='#ff4b4b'; color='#8b0000'; shadow='0 4px 0 #c03030'; cls+=' wrong'; }
            }
            return (
              <button key={i} onClick={()=>pickAnswer(opt)} className={cls} style={{
                background:bg, border:`2px solid ${border}`, borderRadius:14, padding:'14px 18px',
                textAlign:q.rtl?'right':'left', fontSize:q.rtl?18:15, direction:q.rtl?'rtl':'ltr',
                cursor:revealed?'default':'pointer', color, fontWeight:600,
                display:'flex', alignItems:'center', gap:12,
                boxShadow:shadow, transform:'translateY(-2px)',
              }}>
                <span style={{ minWidth:28, height:28, borderRadius:8, border:`2px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:border, flexShrink:0 }}>
                  {['A','B','C','D'][i]}
                </span>
                <span>{opt}</span>
                {revealed && opt===q.answer && <span style={{ marginLeft:'auto', fontSize:16 }}>✅</span>}
                {revealed && opt===chosen && opt!==q.answer && <span style={{ marginLeft:'auto', fontSize:16 }}>❌</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom action */}
      <div style={{ padding:'16px 20px', borderTop:'2px solid #e5e5e5', background: revealed?(isCorrect?'#d7ffb8':'#ffdfe0'):'#fff', transition:'background 0.3s', animation: revealed?'slideUp 0.3s ease':'' }}>
        {revealed && (
          <div style={{ maxWidth:640, margin:'0 auto 12px', display:'flex', alignItems:'flex-start', gap:12 }}>
            <span style={{ fontSize:24 }}>{isCorrect?'🎊':'💪'}</span>
            <div>
              <div style={{ fontWeight:800, color:isCorrect?'#2d7a00':'#a00000', fontSize:15 }}>
                {isCorrect ? 'Correct! ✨' : 'Correct answer:'}
              </div>
              {!isCorrect && <div style={{ fontSize:14, fontWeight:600, color:'#c00000', marginTop:2 }}>{q.answer}</div>}
              {q.explanation && !isCorrect && <div style={{ fontSize:12, color:'#888', marginTop:4 }}>💡 {q.explanation}</div>}
            </div>
          </div>
        )}
        <div style={{ maxWidth:640, margin:'0 auto' }}>
          {!revealed ? (
            <button onClick={confirm} disabled={!chosen} className="duo-btn" style={{
              width:'100%', background: chosen?'#58cc02':'#e5e5e5', color: chosen?'#fff':'#afafaf',
              border:'none', borderRadius:14, padding:'16px 0', fontSize:16, fontWeight:800,
              cursor:chosen?'pointer':'default', boxShadow: chosen?'0 4px 0 #3d9900':'0 4px 0 #ccc',
            }}>
              Check Answer
            </button>
          ) : (
            <button onClick={next} className="duo-btn" style={{
              width:'100%', background:isCorrect?'#58cc02':'#ff4b4b', color:'#fff',
              border:'none', borderRadius:14, padding:'16px 0', fontSize:16, fontWeight:800, cursor:'pointer',
              boxShadow:isCorrect?'0 4px 0 #3d9900':'0 4px 0 #c03030',
            }}>
              {current+1>=total ? '🏁 Finish Exam' : 'Continue →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Level Result (celebration / retry) ──────────────────────────────────────
function LevelResult({ level, score, total, passed, xp, onNext, onRetry, isLast }) {
  const pct = Math.round((score/total)*100);
  return (
    <div style={{ minHeight:'100vh', background:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 20px', textAlign:'center' }}>
      <div style={{ fontSize:80, marginBottom:12, animation:'popIn 0.5s ease' }}>
        {passed ? (isLast?'🏆':'🎉') : '💪'}
      </div>
      <h2 style={{ fontSize:28, fontWeight:900, color:'#1f1f1f', margin:'0 0 4px', animation:'slideUp 0.4s ease' }}>
        {passed ? (isLast ? 'All Levels Complete!' : 'Level Passed!') : 'Keep Practising!'}
      </h2>
      <p style={{ fontSize:15, color:'#777', margin:'0 0 28px' }}>
        {passed ? (isLast ? "All levels done. Outstanding work." : "Good job! Advance to the next level.") : "Review this level and try again. Keep going!"}
      </p>

      {/* Score ring */}
      <div style={{ position:'relative', width:120, height:120, marginBottom:24 }}>
        <svg width="120" height="120" style={{ transform:'rotate(-90deg)' }}>
          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e5e5" strokeWidth="10"/>
          <circle cx="60" cy="60" r="50" fill="none" stroke={passed?'#58cc02':'#ff4b4b'} strokeWidth="10"
            strokeDasharray={2*Math.PI*50} strokeDashoffset={2*Math.PI*50*(1-pct/100)}
            style={{ transition:'stroke-dashoffset 1s ease 0.3s' }}/>
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <div style={{ fontSize:28, fontWeight:900, color:passed?'#58cc02':'#ff4b4b' }}>{score}/{total}</div>
          <div style={{ fontSize:12, color:'#aaa', fontWeight:700 }}>{pct}%</div>
        </div>
      </div>

      {/* XP earned */}
      <div style={{ display:'flex', gap:16, justifyContent:'center', marginBottom:32, flexWrap:'wrap' }}>
        <div style={{ background:'#fff7e0', borderRadius:14, padding:'12px 20px', border:'2px solid #ffc800', textAlign:'center' }}>
          <div style={{ fontSize:20, fontWeight:900, color:'#ff9600' }}>{xp} XP</div>
          <div style={{ fontSize:11, color:'#999', fontWeight:700, textTransform:'uppercase' }}>Total Earned</div>
        </div>
        <div style={{ background: passed?'#d7ffb8':'#ffdfe0', borderRadius:14, padding:'12px 20px', border:`2px solid ${passed?'#58cc02':'#ff4b4b'}`, textAlign:'center' }}>
          <div style={{ fontSize:20, fontWeight:900, color:passed?'#2d7a00':'#c00000' }}>{passed?'PASSED':'TRY AGAIN'}</div>
          <div style={{ fontSize:11, color:'#999', fontWeight:700, textTransform:'uppercase' }}>Pass mark: 70%</div>
        </div>
      </div>

      <div style={{ display:'flex', gap:12, flexDirection:'column', width:'100%', maxWidth:420 }}>
        {passed && (
          <button onClick={onNext} className="duo-btn" style={{ background:'#58cc02', color:'#fff', border:'none', borderRadius:14, padding:'16px 0', fontSize:16, fontWeight:800, cursor:'pointer', boxShadow:'0 4px 0 #3d9900' }}>
            {isLast ? '📋 View Full Report' : 'Next Level →'}
          </button>
        )}
        {!passed && (
          <>
            <button onClick={onRetry} className="duo-btn" style={{ background:'#58cc02', color:'#fff', border:'none', borderRadius:14, padding:'16px 0', fontSize:16, fontWeight:800, cursor:'pointer', boxShadow:'0 4px 0 #3d9900' }}>
              🔄 Try Again
            </button>
            <button onClick={onNext} className="duo-btn" style={{ background:'#fff', color:'#afafaf', border:'2px solid #e5e5e5', borderRadius:14, padding:'14px 0', fontSize:14, fontWeight:700, cursor:'pointer' }}>
              Skip to Report
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Final Report with certificate ───────────────────────────────────────────
function FinalReport({ studentName, schoolType, levelResults, totalXp, onRestart }) {
  const [showCert, setShowCert] = useState(false);
  const passedLevels = levelResults.filter(r=>r.passed);
  const highest = passedLevels.length>0 ? passedLevels[passedLevels.length-1] : null;
  const finalLevelId = highest?.levelId || 'mubtadi';
  const finalLevel = LEVELS.find(l=>l.id===finalLevelId)||LEVELS[0];
  const school = SCHOOL_TYPES.find(s=>s.id===schoolType);

  function printCert() {
    const date = new Date().toLocaleDateString('en-GB',{year:'numeric',month:'long',day:'numeric'});
    const w = window.open('','_blank');
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>RAQP Certificate</title>
<style>body{margin:0;background:#fff;font-family:'Georgia',serif}.cert{width:900px;min-height:640px;margin:20px auto;border:12px solid #1e293b;padding:48px 60px;position:relative;box-sizing:border-box;background:linear-gradient(145deg,#fdfbf7,#f8f4ed)}.cert:before{content:'';position:absolute;inset:8px;border:2px solid #c9a84c;pointer-events:none}.center{text-align:center}.seal{font-size:56px;margin-bottom:8px}.title-ar{font-size:20px;color:#c9a84c;direction:rtl;margin-bottom:4px}.title-en{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#64748b;margin-bottom:24px}.name{font-size:36px;font-weight:700;color:#1e293b;border-bottom:2px solid #c9a84c;display:inline-block;padding:0 40px 6px}.badge{font-size:24px;font-weight:700;background:${finalLevel.bg};color:${finalLevel.color};padding:8px 32px;border-radius:40px;display:inline-block;margin:12px 0}.scores{margin:20px 0}.sr{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #e2e8f0;font-size:13px}.pass{color:#059669;font-weight:700}.fail{color:#ef4444;font-weight:700}.footer{display:flex;justify-content:space-between;margin-top:32px}.sig{border-top:1px solid #1e293b;padding-top:6px;font-size:11px;color:#64748b;text-align:center;width:180px}@media print{body{margin:0}.cert{margin:0}}</style></head><body>
<div class="cert">
<div class="center"><div class="seal">📖</div>
<div class="title-ar">شهادة كفاءة اللغة العربية والقرآن الكريم</div>
<div class="title-en">Pathways Arabic &amp; Quran Proficiency Certificate — RAQP</div>
<p style="color:#64748b;font-size:14px">This certifies that</p>
<div class="name">${studentName||'Student'}</div>
<p style="font-size:13px;color:#64748b;margin:12px 0 4px">has demonstrated proficiency at</p>
<div class="badge">${finalLevel.name} — ${finalLevel.cefr}</div>
<p style="font-size:13px;color:#64748b">School Track: ${school?.name||schoolType} &bull; Total XP: ${totalXp}</p></div>
<div class="scores">${levelResults.map(r=>{const lv=LEVELS.find(l=>l.id===r.levelId);return`<div class="sr"><span>${lv?.name||r.levelId} (${lv?.cefr})</span><span class="${r.passed?'pass':'fail'}">${r.score}/10 &mdash; ${r.passed?'PASSED':'STOPPED'}</span></div>`;}).join('')}</div>
<div class="footer"><div class="sig">Pathways Education<br/>Authorised Examiner</div><div class="center" style="font-size:11px;color:#aaa">Issued: ${date}</div><div class="sig">RAQP Certification<br/>Official Record</div></div>
</div><script>window.onload=()=>window.print();</script></body></html>`);
    w.document.close();
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', paddingBottom:48 }}>
      <div style={{ background:'linear-gradient(135deg,#1e293b,#3b4f6b)', padding:'32px 24px', textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:8 }}>🏆</div>
        <h2 style={{ fontSize:22, fontWeight:900, color:'#fff', margin:'0 0 4px' }}>Exam Complete!</h2>
        <div style={{ background:finalLevel.bg, color:finalLevel.color, display:'inline-block', padding:'4px 16px', borderRadius:20, fontWeight:800, fontSize:16, margin:'8px 0 4px' }}>
          {finalLevel.name} — {finalLevel.cefr}
        </div>
        {studentName && <p style={{ color:'#94a3b8', margin:'4px 0 0', fontSize:14 }}>{studentName}</p>}
        <div style={{ color:'#ffc800', fontWeight:800, fontSize:18, marginTop:8 }}>⚡ {totalXp} XP Earned</div>
      </div>
      <div style={{ maxWidth:600, margin:'0 auto', padding:'24px 16px' }}>
        <div style={{ display:'grid', gap:12, marginBottom:20 }}>
          {levelResults.map(r=>{
            const lv=LEVELS.find(l=>l.id===r.levelId);
            return (
              <div key={r.levelId} style={{ background:'#fff', borderRadius:14, padding:'16px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', border:'1px solid #e2e8f0', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                <div>
                  <div style={{ fontWeight:700, color:'#1e293b', fontSize:14 }}>{lv?.name} ({lv?.cefr})</div>
                  <div style={{ fontSize:12, color:'#64748b', marginTop:2 }}>{r.score}/10 — {Math.round((r.score/10)*100)}%</div>
                </div>
                <span style={{ fontWeight:800, fontSize:13, color:r.passed?'#059669':'#dc2626', background:r.passed?'#dcfce7':'#fee2e2', padding:'4px 12px', borderRadius:20 }}>
                  {r.passed?'✓ PASSED':'✕ STOPPED'}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          <button onClick={printCert} className="duo-btn" style={{ flex:1, minWidth:160, background:'#58cc02', color:'#fff', border:'none', borderRadius:14, padding:'14px 0', fontSize:14, fontWeight:800, cursor:'pointer', boxShadow:'0 4px 0 #3d9900' }}>
            🏅 Print Certificate
          </button>
          <button onClick={onRestart} className="duo-btn" style={{ flex:1, minWidth:160, background:'#fff', color:'#1cb0f6', border:'2px solid #1cb0f6', borderRadius:14, padding:'12px 0', fontSize:14, fontWeight:700, cursor:'pointer' }}>
            🔄 Start New Exam
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Welcome Screen (Duolingo-inspired hero) ──────────────────────────────────
function WelcomeScreen({ onStart }) {
  const [name, setName] = useState('');
  const steps = [
    { icon:'🔥', color:'#ff9600', title:'Warm-Up', desc:'5 flashcard questions with hearts, XP & streaks' },
    { icon:'🏁', color:'#1cb0f6', title:'Real Exam', desc:'10 focused questions — no hearts, just focus' },
    { icon:'🏆', color:'#58cc02', title:'Certificate', desc:'Print your certified CEFR proficiency level' },
  ];
  return (
    <div style={{ minHeight:'100vh', background:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 20px' }}>
      <div style={{ maxWidth:480, width:'100%', textAlign:'center' }}>
        <div style={{ fontSize:64, marginBottom:12, animation:'popIn 0.5s ease' }}>📖</div>
        <h1 style={{ fontSize:28, fontWeight:900, color:'#1f1f1f', margin:'0 0 6px', lineHeight:1.2 }}>
          Arabic & Quran<br/>Proficiency Exam
        </h1>
        <p style={{ color:'#afafaf', fontWeight:700, fontSize:13, letterSpacing:1, margin:'0 0 28px', textTransform:'uppercase' }}>
          RAQP • امتحان الكفاءة العربية
        </p>

        {/* 3-step flow */}
        <div style={{ display:'flex', gap:0, marginBottom:28, position:'relative' }}>
          <div style={{ position:'absolute', top:20, left:'16%', right:'16%', height:3, background:'#e5e5e5', zIndex:0 }}/>
          {steps.map((s,i)=>(
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', position:'relative', zIndex:1 }}>
              <div style={{ width:40, height:40, borderRadius:99, background:s.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, marginBottom:8, boxShadow:`0 4px 0 rgba(0,0,0,0.1)` }}>
                {s.icon}
              </div>
              <div style={{ fontSize:12, fontWeight:800, color:'#1f1f1f', marginBottom:2 }}>{s.title}</div>
              <div style={{ fontSize:10, color:'#afafaf', textAlign:'center', lineHeight:1.4, padding:'0 4px' }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Name input */}
        <div style={{ marginBottom:20 }}>
          <label style={{ display:'block', fontSize:12, fontWeight:800, color:'#afafaf', textTransform:'uppercase', letterSpacing:1, marginBottom:8, textAlign:'left' }}>
            Your Name (optional — appears on certificate)
          </label>
          <input type="text" value={name} onChange={e=>setName(e.target.value)}
            placeholder="اكتب اسمك / Enter your name"
            style={{ width:'100%', border:'2px solid #e5e5e5', borderRadius:14, padding:'14px 16px', fontSize:15, boxSizing:'border-box', outline:'none', fontWeight:600, color:'#1f1f1f' }}
            onFocus={e=>e.target.style.borderColor='#1cb0f6'}
            onBlur={e=>e.target.style.borderColor='#e5e5e5'}
          />
        </div>

        <button onClick={()=>onStart(name.trim())} className="duo-btn" style={{
          width:'100%', background:'#58cc02', color:'#fff', border:'none', borderRadius:14,
          padding:'18px 0', fontSize:17, fontWeight:900, cursor:'pointer', boxShadow:'0 4px 0 #3d9900', letterSpacing:0.5,
        }}>
          لنبدأ → START EXAM
        </button>
        <p style={{ fontSize:12, color:'#afafaf', marginTop:12 }}>4 levels • A1–C1 CEFR • Age-appropriate questions</p>
      </div>
    </div>
  );
}

// ─── School Selector ──────────────────────────────────────────────────────────
function SchoolSelector({ onSelect }) {
  return (
    <div style={{ minHeight:'100vh', background:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 20px' }}>
      <div style={{ maxWidth:480, width:'100%' }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🏫</div>
          <h2 style={{ fontSize:22, fontWeight:900, color:'#1f1f1f', margin:'0 0 6px' }}>What's your school level?</h2>
          <p style={{ color:'#afafaf', fontSize:14, margin:0 }}>Questions will be age-appropriate for you</p>
        </div>
        <div style={{ display:'grid', gap:12 }}>
          {SCHOOL_TYPES.map(s=>(
            <button key={s.id} onClick={()=>onSelect(s.id)} className="duo-btn" style={{
              background:'#fff', border:'2px solid #e5e5e5', borderRadius:16, padding:'18px 20px',
              cursor:'pointer', display:'flex', alignItems:'center', gap:16, boxShadow:'0 4px 0 #e5e5e5', transition:'all 0.2s',
            }}
            onMouseOver={e=>{e.currentTarget.style.borderColor='#58cc02';e.currentTarget.style.boxShadow='0 4px 0 #58cc02';}}
            onMouseOut={e=>{e.currentTarget.style.borderColor='#e5e5e5';e.currentTarget.style.boxShadow='0 4px 0 #e5e5e5';}}>
              <span style={{ fontSize:32 }}>{s.icon}</span>
              <div style={{ textAlign:'left' }}>
                <div style={{ fontWeight:800, color:'#1f1f1f', fontSize:15 }}>{s.name}</div>
                <div style={{ fontSize:12, color:'#afafaf', marginTop:2 }}>{s.ageRange}</div>
              </div>
              <span style={{ marginLeft:'auto', fontSize:18, color:'#e5e5e5' }}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Level Intro (Duolingo "Ready?" screen) ───────────────────────────────────
function LevelIntro({ level, levelIndex, schoolName, totalXp, onBeginPrep }) {
  return (
    <div style={{ minHeight:'100vh', background:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 20px', textAlign:'center' }}>
      <div style={{ maxWidth:440, width:'100%' }}>
        <div style={{ fontSize:60, marginBottom:12, animation:'popIn 0.5s ease' }}>{level.icon||'📚'}</div>
        <div style={{ background:level.bg, color:level.color, display:'inline-block', padding:'4px 14px', borderRadius:20, fontWeight:800, fontSize:13, marginBottom:12 }}>
          Level {levelIndex+1} • {level.cefr}
        </div>
        <h2 style={{ fontSize:26, fontWeight:900, color:'#1f1f1f', margin:'0 0 6px' }}>{level.nameAr || level.name}</h2>
        <p style={{ fontSize:14, color:'#777', margin:'0 0 24px', lineHeight:1.6 }}>{level.description}</p>

        <div style={{ background:'#f8fafc', borderRadius:16, padding:'16px', marginBottom:24, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {[
            { icon:'🔥', label:'Warm-Up', val:'5 questions + XP', color:'#ff9600' },
            { icon:'🏁', label:'Real Exam', val:'10 questions', color:'#1cb0f6' },
            { icon:'⏱', label:'Time Limit', val:'25 min (exam)', color:'#a855f7' },
            { icon:'✅', label:'Pass Mark', val:'7/10 — 70%', color:'#58cc02' },
          ].map((s,i)=>(
            <div key={i} style={{ background:'#fff', borderRadius:12, padding:'10px 12px', border:'2px solid #f1f5f9', textAlign:'center' }}>
              <div style={{ fontSize:20, marginBottom:4 }}>{s.icon}</div>
              <div style={{ fontSize:13, fontWeight:800, color:'#1f1f1f', marginBottom:2 }}>{s.val}</div>
              <div style={{ fontSize:10, color:'#aaa', fontWeight:700, textTransform:'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {totalXp>0 && <p style={{ fontSize:13, color:'#ff9600', fontWeight:800, marginBottom:16 }}>⚡ {totalXp} XP carried forward!</p>}

        <button onClick={onBeginPrep} className="duo-btn" style={{ width:'100%', background:'#58cc02', color:'#fff', border:'none', borderRadius:14, padding:'18px 0', fontSize:17, fontWeight:900, cursor:'pointer', boxShadow:'0 4px 0 #3d9900' }}>
          Begin Warm-Up 🔥
        </button>
        <p style={{ fontSize:12, color:'#afafaf', marginTop:10 }}>{schoolName} track</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PathwaysExam() {
  useEffect(() => { injectCSS(); }, []);

  const [screen,      setScreen]      = useState('welcome');
  const [studentName, setStudentName] = useState('');
  const [schoolType,  setSchoolType]  = useState(null);
  const [levelIndex,  setLevelIndex]  = useState(0);
  const [levelResults,setLevelResults]= useState([]);
  const [prepResult,  setPrepResult]  = useState(null);  // { xp, hearts }
  const [totalXp,     setTotalXp]     = useState(0);

  const level  = LEVELS[levelIndex];
  const school = SCHOOL_TYPES.find(s=>s.id===schoolType);
  const qs     = schoolType && level ? QUESTIONS[level.code]?.[schoolType]||[] : [];

  function handleStart(name) { setStudentName(name); setScreen('school'); }
  function handleSchool(sType) { setSchoolType(sType); setLevelIndex(0); setLevelResults([]); setTotalXp(0); setScreen('levelIntro'); }
  function handleBeginPrep() { setScreen('prep'); }

  function handlePrepDone(result) {
    setPrepResult(result);
    setTotalXp(x => x + result.xp);
    setScreen('prepSummary');
  }

  function handleStartExam() { setScreen('exam'); }
  function handleRetryPrep() { setScreen('prep'); }

  function handleExamFinish(answers) {
    const score = answers.filter(a => a.passed).length;
    const passed = score >= 7;
    const newResults = [...levelResults, { levelId: level.id, score, passed, answers }];
    setLevelResults(newResults);
    // Save to localStorage
    if (!passed || levelIndex+1>=LEVELS.length) {
      saveResult({ id:Date.now(), studentName, schoolType, finalLevel: passed?level.id:(levelIndex>0?LEVELS[levelIndex-1].id:null), date:new Date().toISOString(), levelResults:newResults, totalXp });
    }
    setScreen('levelResult');
  }

  function handleLevelNext() {
    const last = levelResults[levelResults.length-1];
    if (!last.passed || levelIndex+1>=LEVELS.length) { setScreen('report'); }
    else { setLevelIndex(i=>i+1); setPrepResult(null); setScreen('levelIntro'); }
  }

  function handleLevelRetry() { setScreen('prep'); setPrepResult(null); setLevelResults(r=>r.slice(0,-1)); }

  function handleRestart() { setScreen('welcome'); setStudentName(''); setSchoolType(null); setLevelIndex(0); setLevelResults([]); setPrepResult(null); setTotalXp(0); }

  const lastResult = levelResults[levelResults.length-1];

  return (
    <>
      {screen==='welcome'     && <WelcomeScreen onStart={handleStart} />}
      {screen==='school'      && <SchoolSelector onSelect={handleSchool} />}
      {screen==='levelIntro'  && <LevelIntro level={level} levelIndex={levelIndex} schoolName={school?.name||''} totalXp={totalXp} onBeginPrep={handleBeginPrep} />}
      {screen==='prep'        && <PrepScreen questions={qs} level={level} onDone={handlePrepDone} />}
      {screen==='prepSummary' && prepResult && <PrepSummary level={level} xp={prepResult.xp} hearts={prepResult.hearts} onStartExam={handleStartExam} onRetryPrep={handleRetryPrep} />}
      {screen==='exam'        && <ExamScreen questions={qs} level={level} schoolName={school?.name||''} prepXp={totalXp} onFinish={handleExamFinish} />}
      {screen==='levelResult' && lastResult && <LevelResult level={level} score={lastResult.score} total={10} passed={lastResult.passed} xp={totalXp} onNext={handleLevelNext} onRetry={handleLevelRetry} isLast={!lastResult.passed||levelIndex+1>=LEVELS.length} />}
      {screen==='report'      && <FinalReport studentName={studentName} schoolType={schoolType} levelResults={levelResults} totalXp={totalXp} onRestart={handleRestart} />}
    </>
  );
}
