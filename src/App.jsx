import { useMemo, useState } from 'react'
import './App.css'

const PARTS = [
  { id: 'head', no: 'Hode', desc: 'Hodet hjelper oss å tenke, se, høre og snakke.', emoji: '🧠', x: 50, y: 13 },
  { id: 'eyes', no: 'Øyne', desc: 'Med øynene kan vi se farger, former og venner.', emoji: '👀', x: 50, y: 18 },
  { id: 'ears', no: 'Ører', desc: 'Ørene hjelper oss å høre lyd og musikk.', emoji: '👂', x: 68, y: 20 },
  { id: 'nose', no: 'Nese', desc: 'Nesen lar oss lukte og puste inn luft.', emoji: '👃', x: 50, y: 22 },
  { id: 'mouth', no: 'Munn', desc: 'Munnen brukes til å spise, snakke og smile.', emoji: '👄', x: 50, y: 26 },
  { id: 'heart', no: 'Hjerte', desc: 'Hjertet pumper blod rundt i kroppen din.', emoji: '❤️', x: 50, y: 40 },
  { id: 'lungs', no: 'Lunger', desc: 'Lungene hjelper deg å puste inn oksygen.', emoji: '🫁', x: 58, y: 38 },
  { id: 'stomach', no: 'Mage', desc: 'Magen hjelper kroppen å fordøye maten.', emoji: '🍎', x: 50, y: 52 },
  { id: 'arm', no: 'Arm', desc: 'Armer kan løfte, klemme og tegne.', emoji: '💪', x: 24, y: 42 },
  { id: 'hand', no: 'Hånd', desc: 'Med hendene kan vi holde, bygge og vinke.', emoji: '✋', x: 18, y: 58 },
  { id: 'leg', no: 'Ben', desc: 'Ben hjelper deg å stå, gå og hoppe.', emoji: '🦵', x: 40, y: 74 },
  { id: 'foot', no: 'Fot', desc: 'Føttene bærer deg når du løper og danser.', emoji: '🦶', x: 40, y: 90 },
]

const QUIZ = [
  { q: 'Hva bruker vi for å se?', answer: 'Øyne', options: ['Øyne', 'Nese', 'Mage'] },
  { q: 'Hva pumper blod i kroppen?', answer: 'Hjerte', options: ['Lunger', 'Hjerte', 'Fot'] },
  { q: 'Hva bruker vi for å høre?', answer: 'Ører', options: ['Munn', 'Ører', 'Hånd'] },
  { q: 'Hva bruker vi for å gå og løpe?', answer: 'Ben', options: ['Ben', 'Øyne', 'Nese'] },
  { q: 'Hva hjelper oss å puste?', answer: 'Lunger', options: ['Lunger', 'Mage', 'Arm'] },
]

const gameParts = ['Hode', 'Øyne', 'Nese', 'Munn', 'Hjerte', 'Mage', 'Arm', 'Hånd', 'Ben', 'Fot']

function speak(text) {
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'nb-NO'
  u.rate = 0.9
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}

function App() {
  const [selected, setSelected] = useState(PARTS[0])
  const [tab, setTab] = useState('utforsk')
  const [quizIx, setQuizIx] = useState(0)
  const [quizMsg, setQuizMsg] = useState('')
  const [score, setScore] = useState(0)
  const [target, setTarget] = useState(gameParts[Math.floor(Math.random() * gameParts.length)])
  const [findMsg, setFindMsg] = useState('Trykk på riktig kroppsdel i figuren!')

  const shuffledQuizOptions = useMemo(() => {
    return [...QUIZ[quizIx].options].sort(() => Math.random() - 0.5)
  }, [quizIx])

  function selectPart(part) {
    setSelected(part)
    if (tab === 'lek') {
      if (part.no === target) {
        setFindMsg(`Yes! Du fant ${target}! 🎉`)
        speak(`Flott! Du fant ${target}`)
        const next = gameParts.filter((p) => p !== target)
        setTarget(next[Math.floor(Math.random() * next.length)])
      } else {
        setFindMsg(`Nesten! Se etter ${target}.`) 
      }
    }
  }

  function answerQuiz(option) {
    const current = QUIZ[quizIx]
    if (option === current.answer) {
      setQuizMsg('Riktig! Supert! 🌟')
      setScore((s) => s + 1)
      speak(`Riktig! ${current.answer}`)
    } else {
      setQuizMsg(`Godt forsøk! Riktig svar er ${current.answer}.`)
      speak(`Riktig svar er ${current.answer}`)
    }
  }

  function nextQuiz() {
    setQuizIx((q) => (q + 1) % QUIZ.length)
    setQuizMsg('')
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>Kroppen min 🧒🫀</h1>
        <p>En leken app for 6-åringer som lærer om kroppen med illustrasjoner, stemme og mini-spill.</p>
      </header>

      <nav className="tabs">
        <button className={tab === 'utforsk' ? 'active' : ''} onClick={() => setTab('utforsk')}>Utforsk</button>
        <button className={tab === 'quiz' ? 'active' : ''} onClick={() => setTab('quiz')}>Quiz</button>
        <button className={tab === 'lek' ? 'active' : ''} onClick={() => setTab('lek')}>Finn kroppsdelen</button>
      </nav>

      <section className="layout">
        <article className="panel figure-panel">
          <svg viewBox="0 0 240 420" className="kid" aria-label="Illustrasjon av barn">
            <defs>
              <linearGradient id="shirt" x1="0" x2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <circle cx="120" cy="55" r="36" fill="#f4c9a9" />
            <rect x="82" y="90" width="76" height="118" rx="22" fill="url(#shirt)" />
            <rect x="56" y="100" width="24" height="90" rx="12" fill="#f4c9a9" />
            <rect x="160" y="100" width="24" height="90" rx="12" fill="#f4c9a9" />
            <rect x="92" y="208" width="22" height="110" rx="11" fill="#1e293b" />
            <rect x="126" y="208" width="22" height="110" rx="11" fill="#1e293b" />
            <ellipse cx="103" cy="330" rx="24" ry="11" fill="#334155" />
            <ellipse cx="137" cy="330" rx="24" ry="11" fill="#334155" />

            {PARTS.map((p) => (
              <g key={p.id} onClick={() => selectPart(p)} className="hotspot" transform={`translate(${(p.x / 100) * 240}, ${(p.y / 100) * 420})`}>
                <circle r="11" className={selected.id === p.id ? 'dot active' : 'dot'} />
              </g>
            ))}
          </svg>

          <div className="legend">
            {PARTS.map((p) => (
              <button key={p.id} className={`chip ${selected.id === p.id ? 'active' : ''}`} onClick={() => selectPart(p)}>
                {p.emoji} {p.no}
              </button>
            ))}
          </div>
        </article>

        <article className="panel info">
          {tab === 'utforsk' && (
            <>
              <h2>{selected.emoji} {selected.no}</h2>
              <p>{selected.desc}</p>
              <div className="row">
                <button onClick={() => speak(`${selected.no}. ${selected.desc}`)}>🔊 Les opp</button>
                <button onClick={() => speak(`Kan du peke på ${selected.no}?`)}>🎯 Oppdrag</button>
              </div>
            </>
          )}

          {tab === 'quiz' && (
            <>
              <h2>Quiz-tid! 🧠</h2>
              <p className="question">{QUIZ[quizIx].q}</p>
              <div className="answers">
                {shuffledQuizOptions.map((opt) => (
                  <button key={opt} onClick={() => answerQuiz(opt)}>{opt}</button>
                ))}
              </div>
              <p className="msg">{quizMsg}</p>
              <div className="row">
                <button onClick={() => speak(QUIZ[quizIx].q)}>🔊 Les spørsmål</button>
                <button onClick={nextQuiz}>➡️ Neste spørsmål</button>
                <span className="score">Poeng: {score}</span>
              </div>
            </>
          )}

          {tab === 'lek' && (
            <>
              <h2>Finn kroppsdelen 🔎</h2>
              <p>Trykk på riktig punkt i figuren:</p>
              <div className="target">👉 {target}</div>
              <p className="msg">{findMsg}</p>
              <div className="row">
                <button onClick={() => speak(`Finn ${target}`)}>🔊 Si oppgave</button>
                <button onClick={() => setFindMsg('Trykk på riktig kroppsdel i figuren!')}>♻️ Nullstill melding</button>
              </div>
            </>
          )}
        </article>
      </section>
    </div>
  )
}

export default App
