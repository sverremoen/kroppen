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
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="pants" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>

            <path d="M108 52c0-25 19-42 42-42s42 17 42 42v18h-84z" fill="#3f3f46" />
            <ellipse cx="150" cy="78" rx="44" ry="50" fill="#f5caa8" />
            <ellipse className={selected.id === 'head' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'head'))} cx="150" cy="78" rx="44" ry="50" />

            <ellipse className={selected.id === 'ears' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'ears'))} cx="102" cy="84" rx="8" ry="12" />
            <ellipse className={selected.id === 'ears' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'ears'))} cx="198" cy="84" rx="8" ry="12" />

            <ellipse className={selected.id === 'eyes' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'eyes'))} cx="134" cy="75" rx="10" ry="7" />
            <ellipse className={selected.id === 'eyes' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'eyes'))} cx="166" cy="75" rx="10" ry="7" />
            <circle cx="134" cy="75" r="2.4" fill="#0f172a" />
            <circle cx="166" cy="75" r="2.4" fill="#0f172a" />

            <path className={selected.id === 'nose' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'nose'))} d="M150 80l-5 16h10z" />
            <path className={selected.id === 'mouth' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'mouth'))} d="M136 101q14 10 28 0" />

            <rect x="96" y="126" width="108" height="152" rx="36" fill="url(#shirt)" />

            <rect x="56" y="140" width="30" height="126" rx="14" fill="#f5caa8" />
            <rect x="214" y="140" width="30" height="126" rx="14" fill="#f5caa8" />
            <rect className={selected.id === 'arms' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'arms'))} x="56" y="140" width="30" height="126" rx="14" />
            <rect className={selected.id === 'arms' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'arms'))} x="214" y="140" width="30" height="126" rx="14" />

            <ellipse cx="70" cy="274" rx="16" ry="13" fill="#f5caa8" />
            <ellipse cx="230" cy="274" rx="16" ry="13" fill="#f5caa8" />
            <ellipse className={selected.id === 'hands' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'hands'))} cx="70" cy="274" rx="16" ry="13" />
            <ellipse className={selected.id === 'hands' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'hands'))} cx="230" cy="274" rx="16" ry="13" />

            <ellipse className={selected.id === 'lungs' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'lungs'))} cx="136" cy="182" rx="20" ry="18" />
            <ellipse className={selected.id === 'lungs' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'lungs'))} cx="164" cy="182" rx="20" ry="18" />
            <path className={selected.id === 'heart' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'heart'))} d="M134 188c0-8 6-14 13-14 5 0 9 2 11 6 2-4 6-6 11-6 7 0 13 6 13 14 0 13-12 20-24 31-12-11-24-18-24-31z" />
            <ellipse className={selected.id === 'stomach' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'stomach'))} cx="150" cy="236" rx="25" ry="20" />

            <rect x="112" y="278" width="76" height="24" rx="10" fill="url(#pants)" />
            <rect x="112" y="300" width="30" height="138" rx="14" fill="#1e293b" />
            <rect x="158" y="300" width="30" height="138" rx="14" fill="#1e293b" />
            <rect className={selected.id === 'legs' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'legs'))} x="112" y="300" width="30" height="138" rx="14" />
            <rect className={selected.id === 'legs' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'legs'))} x="158" y="300" width="30" height="138" rx="14" />

            <ellipse cx="126" cy="448" rx="30" ry="12" fill="#0f172a" />
            <ellipse cx="174" cy="448" rx="30" ry="12" fill="#0f172a" />
            <ellipse className={selected.id === 'feet' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'feet'))} cx="126" cy="448" rx="30" ry="12" />
            <ellipse className={selected.id === 'feet' ? 'part active' : 'part'} onClick={() => choosePart(PARTS.find((p) => p.id === 'feet'))} cx="174" cy="448" rx="30" ry="12" />
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
