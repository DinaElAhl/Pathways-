import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { spellingAgeBands, spellingStages, spellingWords, letterTiles, seededShuffle, spellingMatches, roundSummary } from '../data/spellingBee.js'
import { playGameSound } from '../services/gameAudio.js'
import './spellingBee.css'

const validTrack = value => /^(ES|MS|HS)-[CBA]$/.test(value || '') ? value : 'ES-C'
const clock = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

function BeeMark() {
  return <svg className="bee-mark" viewBox="0 0 240 210" role="img" aria-label="A cheerful spelling bee carrying an Arabic letter card">
    <circle cx="125" cy="108" r="98" fill="#f8e7a3" />
    <ellipse cx="108" cy="60" rx="22" ry="33" transform="rotate(-34 108 60)" fill="#fffaf0" stroke="#194e59" strokeWidth="4" />
    <ellipse cx="148" cy="60" rx="22" ry="33" transform="rotate(34 148 60)" fill="#fffaf0" stroke="#194e59" strokeWidth="4" />
    <ellipse cx="126" cy="107" rx="58" ry="43" fill="#f1cc52" stroke="#194e59" strokeWidth="4" />
    <path d="M112 67v80m29-79v77" stroke="#194e59" strokeWidth="15" />
    <circle cx="77" cy="105" r="32" fill="#f1cc52" stroke="#194e59" strokeWidth="4" />
    <path d="M65 80 54 66m30 13 8-18M62 101h1m20 0h1m-17 14q9 9 17 0" stroke="#194e59" strokeWidth="5" strokeLinecap="round" fill="none" />
    <circle cx="58" cy="109" r="5" fill="#eead9e" />
    <rect x="100" y="138" width="87" height="58" rx="12" fill="#afd3a4" stroke="#194e59" strokeWidth="4" />
    <text x="144" y="177" textAnchor="middle" fontSize="42" fill="#194e59" lang="ar">ب</text>
    <path d="m194 94 20-7m-14 24 18 5M24 131l-12 7" stroke="#eead9e" strokeWidth="5" strokeLinecap="round" />
  </svg>
}

export default function SpellingBee() {
  const [params, setParams] = useSearchParams()
  const initial = validTrack(params.get('track'))
  const [age, setAge] = useState(initial.split('-')[0])
  const [stage, setStage] = useState(initial.split('-')[1])
  const [mode, setMode] = useState(params.get('mode') === 'challenge' ? 'challenge' : 'practice')
  const [round, setRound] = useState(null)
  const [index, setIndex] = useState(0)
  const [entries, setEntries] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [picked, setPicked] = useState([])
  const [typed, setTyped] = useState('')
  const [inputMode, setInputMode] = useState('tiles')
  const [attempts, setAttempts] = useState(0)
  const [assisted, setAssisted] = useState(false)
  const [deadline, setDeadline] = useState(null)
  const [remaining, setRemaining] = useState(0)
  const [finished, setFinished] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const [sound, setSound] = useState(true)
  const [audioMessage, setAudioMessage] = useState('')
  const [playing, setPlaying] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const audio = useRef(null)
  const feedbackPanel = useRef(null)
  const gamePanel = useRef(null)
  const busy = useRef(false)
  const question = round?.[index]
  const track = `${age}-${stage}`
  const definition = spellingStages[stage]
  const tiles = useMemo(() => question ? seededShuffle(letterTiles(question.text).map((text, id) => ({ text, id })), question.id + '-tiles') : [], [question])
  const answer = inputMode === 'type' ? typed : picked.map(id => tiles.find(tile => tile.id === id)?.text || '').join('')
  const summary = roundSummary(entries, round?.length || 0)

  useEffect(() => { const player = audio.current; return () => player?.pause() }, [])
  useEffect(() => {
    audio.current?.pause()
    setPlaying(false)
    setAudioMessage('')
  }, [question?.id, finished])
  useEffect(() => {
    if (!deadline || finished) return
    const tick = () => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
      setRemaining(left)
      if (!left) { setTimedOut(true); setFinished(true) }
    }
    tick()
    const timer = setInterval(tick, 500)
    return () => clearInterval(timer)
  }, [deadline, finished])
  useEffect(() => {
    if (feedback) {
      feedbackPanel.current?.focus({ preventScroll: true })
      feedbackPanel.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
    }
  }, [feedback])
  useEffect(() => {
    if (round) {
      gamePanel.current?.focus({ preventScroll: true })
      gamePanel.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
  }, [round, index, finished])

  function resetAnswer() {
    setPicked([]); setTyped(''); setFeedback(null); setAttempts(0); setAssisted(false); busy.current = false
  }
  function start() {
    const seed = `${track}-starter-1`
    setRound(seededShuffle(spellingWords[stage], seed)); setIndex(0); setEntries({}); setFinished(false); setTimedOut(false)
    resetAnswer(); setDeadline(mode === 'challenge' ? Date.now() + definition.seconds * 1000 : null); setRemaining(definition.seconds)
    setShareMessage(''); setParams({ track, mode }, { replace: true })
  }
  function hear(item = question) {
    if (!item?.audio || !audio.current) return
    const player = audio.current
    player.pause(); player.src = import.meta.env.BASE_URL + item.audio; player.currentTime = 0; player.volume = 1; player.muted = false
    setAudioMessage('')
    player.play().catch(() => { setPlaying(false); setAudioMessage('Audio could not play. Check your volume, then tap again or open the recording below. You can also use Show model and practise visually.') })
  }
  function check(event) {
    event?.preventDefault()
    if (!question || feedback || busy.current || !answer.trim()) return
    if (deadline && Date.now() >= deadline) { setFinished(true); setTimedOut(true); return }
    busy.current = true
    const right = spellingMatches(answer, question.text)
    const firstTry = right && attempts === 0 && !assisted
    setEntries(previous => ({ ...previous, [question.id]: previous[question.id] ? { ...previous[question.id], corrected: right && !previous[question.id].firstTry } : { firstTry, corrected: right && !firstTry } }))
    setAttempts(value => value + 1); setFeedback({ correct: right }); audio.current?.pause()
    if (sound) playGameSound(right)
  }
  function retry() {
    setPicked([]); setTyped(''); setFeedback(null); setAssisted(true); busy.current = false
  }
  function next() {
    if (index + 1 === round.length) { setFinished(true); return }
    setIndex(value => value + 1); resetAnswer()
  }
  function chooseInput(value) { setInputMode(value); setPicked([]); setTyped('') }
  function returnToSetup() { audio.current?.pause(); setRound(null); setDeadline(null); setFinished(false); resetAnswer() }
  async function copyChallenge() {
    const url = new URL(import.meta.env.BASE_URL + 'spelling-bee', window.location.origin)
    url.searchParams.set('track', track); url.searchParams.set('mode', 'challenge')
    try { await navigator.clipboard.writeText(url.href); setShareMessage('Challenge link copied. Everyone using this track gets the same starter round. Scores are compared manually by a teacher.') }
    catch { setShareMessage(url.href) }
  }

  return <div className={`container-page bee-page bee-stage-${stage.toLowerCase()}`}>
    <audio ref={audio} hidden preload="none" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setPlaying(false); setAudioMessage('This recording could not load. Retry or use Show model to practise visually.') }} />
    <header className="bee-hero"><div><p className="bee-eyebrow">ROOTS SPELLING BEE · تَحَدِّي الْهِجَاءِ</p><h1>Hear it.<br /><span>Build it. Spell it.</span></h1><p>Small words. Brave attempts. Choose a Roots stage and play right here—with vowelled letters, gentle corrections and another chance to try.</p><div className="bee-badges"><span>Free starter rounds</span><span>No personal details</span></div></div><BeeMark /></header>
    {!round ? <section className="bee-setup" aria-labelledby="bee-choose">
      <h2 id="bee-choose">Find your starting point</h2>
      <p>Age and reading stage are separate. ES/MS/HS group learners by age; C/B/A are Roots stages, not CEFR ratings. Each age band uses the same starter word bank at its selected stage.</p>
      <fieldset><legend>Learner group</legend><div className="bee-pills">{spellingAgeBands.map(band => <button key={band.id} type="button" aria-pressed={age === band.id} onClick={() => setAge(band.id)}>{band.label}</button>)}</div></fieldset>
      <div className="bee-stage-grid">{Object.entries(spellingStages).map(([id, item]) => <button key={id} type="button" className={`bee-level bee-level-${id.toLowerCase()}`} aria-pressed={stage === id} onClick={() => setStage(id)}><strong>{age}-{id}</strong><h3>{item.title}</h3><span lang="ar" dir="rtl">{item.arabic}</span><p>{item.description}</p><small>{spellingWords[id].length} prompts · {clock(item.seconds)} timed option</small></button>)}</div>
      <p className="bee-mobile-stage-detail">{track}: {definition.description} {spellingWords[stage].length} prompts · {clock(definition.seconds)} timed option.</p>
      <fieldset><legend>How would you like to play?</legend><div className="bee-pills"><button type="button" aria-pressed={mode === 'practice'} onClick={() => setMode('practice')}>Practise · no timer</button><button type="button" aria-pressed={mode === 'challenge'} onClick={() => setMode('challenge')}>Classroom challenge · timed</button></div></fieldset>
      <p className="bee-mode-note">{mode === 'practice' ? 'Take your time. Hear each word, build or type it, then check and retry.' : 'The timer runs through the whole round, including feedback. First-try, unassisted answers earn a point; the round ends when time runs out.'}</p>
      <div className="bee-actions"><button className="bee-button" onClick={start}>Start {track} {mode === 'practice' ? 'practice' : 'challenge'} →</button><button className="bee-button secondary" onClick={copyChallenge}>Copy class challenge link</button></div><p className="bee-small" role="status">{shareMessage}</p>
      <aside className="bee-teacher-note"><h3>Play together, without a public leaderboard</h3><p>Teachers can share the same starter round, let learners use their own devices and compare first-try results themselves. This version has no shared rankings, event registration or prizes. Results stay in this tab and reset when you leave.</p><p>Synthetic practice recordings are used, not a human pronunciation assessment. This small starter bank is for friendly practice; it is not a validated competition or placement exam.</p></aside>
    </section> : finished ? <section ref={gamePanel} tabIndex={-1} className="bee-results" aria-labelledby="bee-results-title">
      <span className="bee-tag">{track} · {mode === 'challenge' ? 'CLASSROOM CHALLENGE' : 'PRACTICE'}</span><h2 id="bee-results-title">{timedOut ? 'Time is up. Let’s see what grew.' : 'Round complete. Keep growing!'}</h2>
      <div className="bee-score-grid"><div><strong>{summary.firstTry}/{round.length}</strong><span>First try, without a model</span></div><div><strong>{summary.corrected}</strong><span>Correct after help or retry</span></div><div><strong>{summary.unanswered}</strong><span>Not answered</span></div></div>
      <p>This is your result on this device, not an entry in a public competition. A corrected answer is progress, even when it does not earn a first-try point.</p>
      <h3>Your words and next steps</h3><ul className="bee-result-list">{round.map(item => <li key={item.id}><div><bdi lang="ar" dir="rtl">{item.text}</bdi><p>{item.meaning}</p><span>{entries[item.id]?.firstTry ? '✓ First try' : entries[item.id]?.corrected ? '✓ Corrected with practice' : '↻ Practise this one'}</span></div><button type="button" className="bee-button secondary" onClick={() => hear(item)} aria-label={`Hear ${item.meaning}`}>Hear it</button></li>)}</ul>
      <div className="bee-actions"><button className="bee-button" onClick={start}>Try this round again</button><button className="bee-button secondary" onClick={returnToSetup}>Choose another stage</button><Link className="bee-text-link" to="/free-sample">Continue with a free lesson →</Link></div>
    </section> : <section ref={gamePanel} tabIndex={-1} className="bee-game" aria-labelledby="bee-round-title">
      <div className="bee-game-top"><span className="bee-tag">{track} · {mode === 'challenge' ? 'TIMED ROUND' : 'UNTIMED PRACTICE'}</span>{deadline && <span className="bee-clock" role="timer" aria-label={`${remaining} seconds remaining`}>{clock(remaining)}</span>}</div>
      <h2 id="bee-round-title">{question.meaning}</h2><p>Prompt {index + 1} of {round.length} · {summary.firstTry} first-try points</p><progress aria-label="Round progress" value={index} max={round.length} />
      <div className="bee-hear-row"><button type="button" className="bee-hear" onClick={() => hear()}><span aria-hidden="true">◖))</span><span>{playing ? 'Hear it again' : 'Tap to hear Arabic'}<small lang="ar" dir="rtl">اِسْتَمِعْ ثُمَّ اكْتُبْ</small></span></button>{playing && <button className="bee-text-link" onClick={() => audio.current?.pause()}>Stop</button>}</div>
      <p className="bee-small" role="status">{audioMessage}{audioMessage && <a href={import.meta.env.BASE_URL + question.audio} target="_blank" rel="noopener noreferrer"> Open recording →</a>}</p>
      <div className="bee-pills" aria-label="Answer input method"><button aria-pressed={inputMode === 'tiles'} disabled={!!feedback} onClick={() => chooseInput('tiles')}>Build with tiles</button><button aria-pressed={inputMode === 'type'} disabled={!!feedback} onClick={() => chooseInput('type')}>Type Arabic</button></div>
      <form onSubmit={check}>
        {inputMode === 'type' ? <label className="bee-input-label">Your Arabic spelling<input autoComplete="off" autoCapitalize="off" spellCheck={false} dir="rtl" lang="ar" value={typed} disabled={!!feedback} onChange={event => setTyped(event.target.value.slice(0, 100))} placeholder="اُكْتُبْ هُنَا" /></label> : <><div className="bee-built-word" dir="rtl" lang="ar" aria-label="Your word in Arabic reading order">{answer || <span className="bee-small">Choose the letters below</span>}</div><div className="bee-tiles" dir="rtl">{tiles.map(tile => <button key={tile.id} type="button" data-tile={tile.id} aria-label={tile.text === ' ' ? 'Word space' : `Letter ${tile.text}, tile ${tile.id + 1}`} disabled={!!feedback || picked.includes(tile.id)} onClick={() => setPicked(previous => [...previous, tile.id])}><bdi lang="ar" dir="rtl">{tile.text === ' ' ? '␣' : tile.text}</bdi>{tile.text === ' ' && <small>space</small>}</button>)}</div></>}
        <p className="bee-small">Choose letters in reading order, right to left. Vowel marks are optional in the spelling check; hamzah and word spaces matter.</p>
        <div className="bee-actions"><button type="submit" className="bee-button" disabled={!!feedback || !answer.trim()}>Check my spelling</button><button type="button" className="bee-button secondary" disabled={!!feedback || !answer} onClick={() => inputMode === 'tiles' ? setPicked(previous => previous.slice(0, -1)) : setTyped('')}>{inputMode === 'tiles' ? 'Undo' : 'Clear'}</button><button type="button" className="bee-text-link" disabled={!!feedback} onClick={() => setAssisted(true)}>Show model · no first-try point</button></div>
      </form>
      {assisted && !feedback && <div className="bee-model"><bdi lang="ar" dir="rtl">{question.text}</bdi><p>Look, listen, then build it. This attempt counts as supported practice.</p></div>}
      {feedback && <div ref={feedbackPanel} tabIndex={-1} role="status" className={`bee-feedback ${feedback.correct ? 'is-correct' : 'needs-retry'}`}><h3>{feedback.correct ? 'You’ve got it!' : 'Let’s fix it together.'}</h3><p>Correct spelling:</p><bdi className="bee-correct-word" lang="ar" dir="rtl">{question.text}</bdi><p>{question.clue}</p>{!feedback.correct && <button className="bee-button secondary" onClick={retry}>Try this word again</button>}<button className="bee-button" onClick={next}>{index + 1 === round.length ? 'See my result' : 'Next prompt'} →</button></div>}
      <div className="bee-game-footer"><button className="bee-text-link" onClick={() => setSound(value => !value)} aria-pressed={sound}>Feedback sounds: {sound ? 'on' : 'off'}</button><button className="bee-text-link" onClick={returnToSetup}>End round and choose again</button></div>
    </section>}
    {finished && <p className="bee-small" role="status">{playing ? 'Playing Arabic…' : ''}{audioMessage}</p>}
    <p className="bee-small mt-8">No microphone, email or learner name is collected. A teacher can support listening and pronunciation. This game is separate from RQAP and awards no certificate.</p>
    <p className="mt-5"><Link className="bee-text-link" to="/play">← More Roots games</Link></p>
  </div>
}
