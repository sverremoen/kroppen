import { useMemo, useState } from 'react'
import './App.css'

const PARTS = [
  {
    id: 'head',
    name: 'Hode',
    emoji: '🧠',
    color: '#f59e0b',
    say: 'Dette er hodet. Inni hodet ligger hjernen som hjelper deg å tenke og lære.',
    tip: 'Husk hjelm når du sykler.',
    fun: 'Hjernen jobber hele døgnet, også når du sover!',
  },
  {
    id: 'eyes',
    name: 'Øyne',
    emoji: '👀',
    color: '#22d3ee',
    say: 'Med øynene kan du se farger, former, bokstaver og ansikter.',
    tip: 'Gi øynene små pauser fra skjerm.',
    fun: 'Du blunker automatisk mange ganger i minuttet.',
  },
  {
    id: 'ears',
    name: 'Ører',
    emoji: '👂',
    color: '#38bdf8',
    say: 'Ørene hjelper deg å høre stemmer, musikk og lyder.',
    tip: 'Lyd på hodetelefoner bør være passe lav.',
    fun: 'Øret hjelper også kroppen med balanse.',
  },
  {
    id: 'nose',
    name: 'Nese',
    emoji: '👃',
    color: '#a78bfa',
    say: 'Nesen hjelper deg å puste og lukte.',
    tip: 'Pust rolig inn med nesen når du vil slappe av.',
    fun: 'Du kan kjenne lukt av mat før du smaker den.',
  },
  {
    id: 'mouth',
    name: 'Munn',
    emoji: '👄',
    color: '#fb7185',
    say: 'Munnen brukes til å snakke, smile, spise og synge.',
    tip: 'Puss tennene morgen og kveld.',
    fun: 'Tungen hjelper deg å smake søtt, surt og salt.',
  },
  {
    id: 'heart',
    name: 'Hjerte',
    emoji: '❤️',
    color: '#ef4444',
    say: 'Hjertet er en superpumpe som sender blod rundt i kroppen.',
    tip: 'Lek og bevegelse gjør hjertet sterkere.',
    fun: 'Hjertet ditt slår hele tiden, også når du hviler.',
  },
  {
    id: 'lungs',
    name: 'Lunger',
    emoji: '🫁',
    color: '#34d399',
    say: 'Lungene tar inn luft slik at kroppen får oksygen.',
    tip: 'Frisk luft ute er bra for lungene.',
    fun: 'Du puster tusenvis av ganger hver dag.',
  },
  {
    id: 'stomach',
    name: 'Mage',
    emoji: '🍎',
    color: '#f97316',
    say: 'Magen hjelper til med å gjøre maten om til energi.',
    tip: 'Spis variert mat og drikk vann.',
    fun: 'Magen lager små lyder når den jobber.',
  },
  {
    id: 'arms',
    name: 'Armer',
    emoji: '💪',
    color: '#60a5fa',
    say: 'Armer hjelper deg å løfte, kaste, tegne og klemme.',
    tip: 'Strekk armene etter mye stillesitting.',
    fun: 'Hender og armer kan gjøre veldig små og veldig store bevegelser.',
  },
  {
    id: 'hands',
    name: 'Hender',
    emoji: '✋',
    color: '#0ea5e9',
    say: 'Hendene hjelper deg å holde, bygge, knytte og vinke.',
    tip: 'Vask hendene godt med såpe.',
    fun: 'Hver hånd har fem fingre med mange små muskler.',
  },
  {
    id: 'legs',
    name: 'Ben',
    emoji: '🦵',
    color: '#8b5cf6',
    say: 'Ben hjelper deg å stå, gå, hoppe og løpe.',
    tip: 'Løp og hopp ute – det er super trening for bena.',
    fun: 'Lårbeinet er det lengste beinet i kroppen.',
  },
  {
    id: 'feet',
    name: 'Føtter',
    emoji: '🦶',
    color: '#14b8a6',
    say: 'Føttene bærer deg rundt hele dagen.',
    tip: 'Bruk sko som sitter godt på foten.',
    fun: 'Føttene har mange små knokler som jobber sammen.',
  },
]

const QUIZ = [
  { question: 'Hvilken kroppsdel pumper blod?', answer: 'Hjerte', options: ['Hjerte', 'Nese', 'Føtter'] },
  { question: 'Hvilken kroppsdel bruker vi for å se?', answer: 'Øyne', options: ['Øyne', 'Mage', 'Armer'] },
  { question: 'Hva bruker vi for å puste?', answer: 'Lunger', options: ['Lunger', 'Hender', 'Munn'] },
  { question: 'Hva bruker vi for å gå og løpe?', answer: 'Ben', options: ['Ben', 'Ører', 'Nese'] },
  { question: 'Hva bruker vi for å holde ting?', answer: 'Hender', options: ['Hender', 'Hode', 'Øyne'] },
]

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'nb-NO'
  utterance.rate = 0.92
  utterance.pitch = 1.02
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

function App() {
  const [tab, setTab] = useState('utforsk')
  const [selected, setSelected] = useState(PARTS[0])
  const [score, setScore] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizMsg, setQuizMsg] = useState('')
  const [target, setTarget] = useState('Hjerte')
  const [huntMsg, setHuntMsg] = useState('Trykk på riktig kroppsdel i figuren!')
  const [streak, setStreak] = useState(0)

  const quiz = QUIZ[quizIndex]
  const quizOptions = useMemo(() => [...quiz.options].sort(() => Math.random() - 0.5), [quizIndex])

  function choosePart(part) {
    setSelected(part)

    if (tab === 'finn') {
      if (part.name === target) {
        setHuntMsg(`Fantastisk! Du fant ${target}! 🌟`)
        setStreak((s) => s + 1)
        speak(`Ja! Du fant ${target}`)
        const pool = PARTS.map((p) => p.name).filter((name) => name !== target)
        setTarget(pool[Math.floor(Math.random() * pool.length)])
      } else {
        setHuntMsg(`Nesten! Se etter ${target}.`)
        setStreak(0)
      }
    }
  }

  function answerQuiz(option) {
    if (option === quiz.answer) {
      setScore((s) => s + 1)
      setQuizMsg('Riktig! Du er rå! 🎉')
      speak(`Riktig! ${quiz.answer}`)
    } else {
      setQuizMsg(`Godt forsøk! Riktig svar er ${quiz.answer}.`)
      speak(`Riktig svar er ${quiz.answer}`)
    }
  }

  function nextQuiz() {
    setQuizIndex((i) => (i + 1) % QUIZ.length)
    setQuizMsg('')
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <h1>Kroppen min</h1>
          <p>Interaktiv læring for 6-åringer – med tydelige illustrasjoner, lyd og lek.</p>
        </div>
        <button className="primary" onClick={() => speak('Velkommen! Trykk på en kroppsdel for å lære mer.')}>🔊 Start med lyd</button>
      </header>

      <nav className="tabs">
        <button className={tab === 'utforsk' ? 'active' : ''} onClick={() => setTab('utforsk')}>Utforsk</button>
        <button className={tab === 'quiz' ? 'active' : ''} onClick={() => setTab('quiz')}>Quiz</button>
        <button className={tab === 'finn' ? 'active' : ''} onClick={() => setTab('finn')}>Finn kroppsdelen</button>
      </nav>

      <section className="content-grid">
        <article className="panel figure-panel">
          <svg viewBox="0 0 300 500" className="figure" aria-label="Illustrasjon av kropp">
            <defs>
              <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>

            <circle className={selected.id === 'head' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'head'))} cx="150" cy="70" r="48" />

            <ellipse className={selected.id === 'eyes' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'eyes'))} cx="132" cy="67" rx="8" ry="6" />
            <ellipse className={selected.id === 'eyes' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'eyes'))} cx="168" cy="67" rx="8" ry="6" />

            <circle className={selected.id === 'ears' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'ears'))} cx="96" cy="75" r="9" />
            <circle className={selected.id === 'ears' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'ears'))} cx="204" cy="75" r="9" />

            <rect className={selected.id === 'nose' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'nose'))} x="145" y="77" width="10" height="16" rx="5" />
            <rect className={selected.id === 'mouth' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'mouth'))} x="134" y="100" width="32" height="8" rx="4" />

            <rect x="98" y="125" width="104" height="165" rx="34" fill="url(#shirt)" />

            <ellipse className={selected.id === 'heart' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'heart'))} cx="135" cy="185" rx="14" ry="14" />
            <ellipse className={selected.id === 'lungs' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'lungs'))} cx="150" cy="178" rx="24" ry="18" />
            <ellipse className={selected.id === 'stomach' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'stomach'))} cx="150" cy="235" rx="24" ry="18" />

            <rect className={selected.id === 'arms' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'arms'))} x="58" y="138" width="30" height="118" rx="15" />
            <rect className={selected.id === 'arms' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'arms'))} x="212" y="138" width="30" height="118" rx="15" />

            <circle className={selected.id === 'hands' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'hands'))} cx="72" cy="266" r="14" />
            <circle className={selected.id === 'hands' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'hands'))} cx="228" cy="266" r="14" />

            <rect className={selected.id === 'legs' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'legs'))} x="118" y="290" width="24" height="145" rx="12" />
            <rect className={selected.id === 'legs' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'legs'))} x="158" y="290" width="24" height="145" rx="12" />

            <ellipse className={selected.id === 'feet' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'feet'))} cx="128" cy="448" rx="28" ry="12" />
            <ellipse className={selected.id === 'feet' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'feet'))} cx="172" cy="448" rx="28" ry="12" />
          </svg>

          <div className="chips">
            {PARTS.map((part) => (
              <button key={part.id} className={`chip ${selected.id === part.id ? 'active' : ''}`} onClick={() => choosePart(part)}>
                {part.emoji} {part.name}
              </button>
            ))}
          </div>
        </article>

        <article className="panel side-panel">
          {tab === 'utforsk' && (
            <>
              <h2>{selected.emoji} {selected.name}</h2>
              <p className="lead">{selected.say}</p>
              <ul>
                <li><strong>Visste du:</strong> {selected.fun}</li>
                <li><strong>Tips:</strong> {selected.tip}</li>
              </ul>
              <div className="row">
                <button onClick={() => speak(`${selected.name}. ${selected.say}`)}>🔊 Les opp</button>
                <button onClick={() => speak(`Kan du peke på ${selected.name}?`)}>🎯 Oppdrag</button>
              </div>
            </>
          )}

          {tab === 'quiz' && (
            <>
              <h2>Quiz 🧠</h2>
              <p className="lead">{quiz.question}</p>
              <div className="answers">
                {quizOptions.map((option) => (
                  <button key={option} onClick={() => answerQuiz(option)}>{option}</button>
                ))}
              </div>
              <p className="message">{quizMsg}</p>
              <div className="row">
                <button onClick={() => speak(quiz.question)}>🔊 Les spørsmål</button>
                <button onClick={nextQuiz}>➡️ Neste</button>
                <span className="badge">Poeng: {score}</span>
              </div>
            </>
          )}

          {tab === 'finn' && (
            <>
              <h2>Finn kroppsdelen 🔎</h2>
              <p className="lead">Trykk på riktig område i figuren.</p>
              <div className="target">👉 {target}</div>
              <p className="message">{huntMsg}</p>
              <div className="row">
                <button onClick={() => speak(`Finn ${target}`)}>🔊 Si oppgaven</button>
                <span className="badge">Streak: {streak}</span>
              </div>
            </>
          )}
        </article>
      </section>
    </div>
  )
}

export default App
