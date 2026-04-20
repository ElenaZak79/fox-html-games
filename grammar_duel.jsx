import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Trophy, RotateCcw, Swords, Zap, Crown, Clock, X, Check, ChevronRight, Flag } from "lucide-react";

// ============================================================================
// TENSES & EXERCISE BANK
// ============================================================================
const TENSES = [
  {
    id: "present_simple",
    name: "Present Simple",
    nameRu: "Настоящее простое",
    emoji: "☀️",
    color: "#F59E0B",
    colorLight: "#FEF3C7",
    colorDark: "#B45309",
  },
  {
    id: "present_continuous",
    name: "Present Continuous",
    nameRu: "Настоящее длительное",
    emoji: "🌊",
    color: "#0EA5E9",
    colorLight: "#E0F2FE",
    colorDark: "#0369A1",
  },
  {
    id: "present_perfect",
    name: "Present Perfect",
    nameRu: "Настоящее совершенное",
    emoji: "💎",
    color: "#8B5CF6",
    colorLight: "#EDE9FE",
    colorDark: "#6D28D9",
  },
  {
    id: "past_simple",
    name: "Past Simple",
    nameRu: "Прошедшее простое",
    emoji: "🏴‍☠️",
    color: "#DC2626",
    colorLight: "#FEE2E2",
    colorDark: "#991B1B",
  },
];

// Multiple-choice questions for duels (fast to answer)
// Each question has: q (with gap), options, correct index, tense for context
const DUEL_QUESTIONS = [
  // Present Simple
  { q: "She ___ coffee every morning.", options: ["drink","drinks","is drinking","drank"], correct: 1, tense: "present_simple" },
  { q: "My brothers ___ football on Sundays.", options: ["plays","play","are playing","played"], correct: 1, tense: "present_simple" },
  { q: "Tom ___ like broccoli.", options: ["don't","doesn't","isn't","didn't"], correct: 1, tense: "present_simple" },
  { q: "___ your sister speak French?", options: ["Do","Does","Is","Did"], correct: 1, tense: "present_simple" },
  { q: "The sun ___ in the east.", options: ["rise","rises","is rising","rose"], correct: 1, tense: "present_simple" },
  { q: "I never ___ tea in the evening.", options: ["drinks","drink","am drinking","drank"], correct: 1, tense: "present_simple" },
  { q: "We ___ to school by bus.", options: ["goes","going","go","gone"], correct: 2, tense: "present_simple" },
  { q: "He ___ English very well.", options: ["speak","speaks","is speaking","spoke"], correct: 1, tense: "present_simple" },
  { q: "My mum ___ pizza on Fridays.", options: ["make","makes","is making","made"], correct: 1, tense: "present_simple" },
  { q: "They usually ___ TV after dinner.", options: ["watches","watch","are watching","watched"], correct: 1, tense: "present_simple" },
  { q: "Water ___ at 100 degrees.", options: ["boil","boils","is boiling","boiled"], correct: 1, tense: "present_simple" },
  { q: "___ you like ice cream?", options: ["Do","Does","Are","Is"], correct: 0, tense: "present_simple" },

  // Present Continuous
  { q: "Look! The baby ___!", options: ["sleeps","is sleeping","sleep","slept"], correct: 1, tense: "present_continuous" },
  { q: "I ___ my homework right now.", options: ["do","am doing","does","did"], correct: 1, tense: "present_continuous" },
  { q: "They ___ TV at the moment.", options: ["watch","watches","are watching","watched"], correct: 2, tense: "present_continuous" },
  { q: "She ___ a blue dress today.", options: ["wears","is wearing","wear","wore"], correct: 1, tense: "present_continuous" },
  { q: "Listen! Someone ___ the piano.", options: ["plays","is playing","play","played"], correct: 1, tense: "present_continuous" },
  { q: "We ___ for you. Hurry up!", options: ["wait","waits","are waiting","waited"], correct: 2, tense: "present_continuous" },
  { q: "It ___ heavily outside now.", options: ["rain","rains","is raining","rained"], correct: 2, tense: "present_continuous" },
  { q: "The kids ___ in the pool now.", options: ["swim","swims","are swimming","swam"], correct: 2, tense: "present_continuous" },
  { q: "Why ___ you ___ at me?", options: ["do / shout","are / shouting","is / shouting","did / shout"], correct: 1, tense: "present_continuous" },
  { q: "Be quiet! Grandpa ___.", options: ["sleeps","is sleeping","sleep","slept"], correct: 1, tense: "present_continuous" },
  { q: "I ___ a great book this week.", options: ["read","reads","am reading","read"], correct: 2, tense: "present_continuous" },
  { q: "My dad ___ dinner right now.", options: ["cooks","is cooking","cook","cooked"], correct: 1, tense: "present_continuous" },

  // Present Perfect
  { q: "I ___ just ___ my homework.", options: ["have / finished","have / finish","am / finishing","did / finish"], correct: 0, tense: "present_perfect" },
  { q: "She ___ never ___ to London.", options: ["has / been","have / been","is / being","was"], correct: 0, tense: "present_perfect" },
  { q: "We ___ already ___ the film.", options: ["watched","have watched","are watching","have watching"], correct: 1, tense: "present_perfect" },
  { q: "___ you ever ___ sushi?", options: ["Did / eat","Have / eaten","Are / eating","Do / eat"], correct: 1, tense: "present_perfect" },
  { q: "He hasn't finished the book ___.", options: ["already","just","yet","ever"], correct: 2, tense: "present_perfect" },
  { q: "They ___ lived here for 10 years.", options: ["are","have","has","did"], correct: 1, tense: "present_perfect" },
  { q: "I ___ been to Paris three times.", options: ["am","was","have","has"], correct: 2, tense: "present_perfect" },
  { q: "She ___ lost her keys. She can't find them.", options: ["have","has","is","was"], correct: 1, tense: "present_perfect" },
  { q: "My sister ___ ___ her breakfast already.", options: ["has / eaten","have / eaten","is / eating","did / eat"], correct: 0, tense: "present_perfect" },
  { q: "We ___ known each other since 2015.", options: ["know","are knowing","have known","knew"], correct: 2, tense: "present_perfect" },
  { q: "___ he arrived yet?", options: ["Did","Does","Has","Have"], correct: 2, tense: "present_perfect" },
  { q: "I ___ never ___ such a big dog!", options: ["have / saw","have / seen","did / see","am / seeing"], correct: 1, tense: "present_perfect" },

  // Past Simple
  { q: "I ___ my friends yesterday.", options: ["meet","meets","met","have met"], correct: 2, tense: "past_simple" },
  { q: "She ___ to school last Monday.", options: ["goes","went","gone","was going"], correct: 1, tense: "past_simple" },
  { q: "They ___ watch the film.", options: ["don't","doesn't","didn't","haven't"], correct: 2, tense: "past_simple" },
  { q: "___ you have a good weekend?", options: ["Do","Does","Did","Have"], correct: 2, tense: "past_simple" },
  { q: "We ___ a sandcastle on the beach.", options: ["build","built","builds","have built"], correct: 1, tense: "past_simple" },
  { q: "My grandpa ___ born in 1950.", options: ["is","was","were","has been"], correct: 1, tense: "past_simple" },
  { q: "The kids ___ happy at the party.", options: ["is","was","were","are"], correct: 2, tense: "past_simple" },
  { q: "Columbus ___ America in 1492.", options: ["discover","discovered","has discovered","discovers"], correct: 1, tense: "past_simple" },
  { q: "I ___ pizza for dinner last night.", options: ["have","had","has","am having"], correct: 1, tense: "past_simple" },
  { q: "She ___ the piano when she was 5.", options: ["plays","played","has played","is playing"], correct: 1, tense: "past_simple" },
  { q: "Where ___ you ___ your holiday?", options: ["do / spent","did / spend","have / spent","are / spending"], correct: 1, tense: "past_simple" },
  { q: "My brother ___ his leg last week.", options: ["break","broke","has broken","breaks"], correct: 1, tense: "past_simple" },

  // MIXED — spot the correct tense
  { q: "Right now, she ___ a letter.", options: ["writes","is writing","has written","wrote"], correct: 1, tense: "mixed" },
  { q: "I ___ my keys yesterday.", options: ["lose","am losing","have lost","lost"], correct: 3, tense: "mixed" },
  { q: "He ___ already ___ his homework.", options: ["has / done","have / done","is / doing","did / do"], correct: 0, tense: "mixed" },
  { q: "We ___ English every day.", options: ["study","are studying","have studied","studied"], correct: 0, tense: "mixed" },
  { q: "Tom ___ to Paris last summer.", options: ["goes","is going","has gone","went"], correct: 3, tense: "mixed" },
  { q: "Look! The cat ___ on the tree!", options: ["climbs","is climbing","has climbed","climbed"], correct: 1, tense: "mixed" },
  { q: "My mum usually ___ tea in the morning.", options: ["drinks","is drinking","has drunk","drank"], correct: 0, tense: "mixed" },
  { q: "___ you ever ___ to Italy?", options: ["Do / go","Are / going","Have / been","Did / go"], correct: 2, tense: "mixed" },
];

const ROUNDS_DEFAULT = 10;
const TIME_PER_QUESTION = 15; // seconds
const STORAGE_KEY = "duel-stats-v1";

// Scoring: base 100 points per correct, plus time bonus (up to 50)
function calculatePoints(timeLeft, totalTime) {
  return 100 + Math.round((timeLeft / totalTime) * 50);
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function GrammarDuel() {
  const [screen, setScreen] = useState("menu"); // menu | setup | duel | result
  const [audioOn, setAudioOn] = useState(true);
  const [settings, setSettings] = useState({
    rounds: ROUNDS_DEFAULT,
    filter: "mixed", // mixed | present_simple | present_continuous | present_perfect | past_simple
    p1Name: "Player 1",
    p2Name: "Player 2",
  });
  const [duelState, setDuelState] = useState(null);
  const [stats, setStats] = useState(null);

  // Load stats
  useEffect(() => {
    const load = async () => {
      try {
        const r = await window.storage.get(STORAGE_KEY);
        if (r && r.value) setStats(JSON.parse(r.value));
        else setStats({ totalDuels: 0, history: [] });
      } catch {
        setStats({ totalDuels: 0, history: [] });
      }
    };
    load();
  }, []);

  // Save stats
  const saveStats = async (newStats) => {
    setStats(newStats);
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(newStats));
    } catch (e) {
      console.error(e);
    }
  };

  const speak = (text) => {
    if (!audioOn) return;
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  const startDuel = () => {
    // Pick questions based on filter
    let pool = DUEL_QUESTIONS;
    if (settings.filter !== "mixed") {
      pool = DUEL_QUESTIONS.filter((q) => q.tense === settings.filter || q.tense === "mixed");
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, settings.rounds);

    setDuelState({
      questions: shuffled,
      round: 0,
      p1Score: 0,
      p2Score: 0,
      p1Wins: 0,
      p2Wins: 0,
      p1Answer: null, // { chosen, time }
      p2Answer: null,
      roundEnded: false,
      startTime: Date.now(),
    });
    setScreen("duel");
  };

  const endDuel = async (finalState) => {
    // Determine winner
    const winner = finalState.p1Score > finalState.p2Score ? "p1" :
                   finalState.p2Score > finalState.p1Score ? "p2" : "tie";
    const newStats = {
      totalDuels: (stats?.totalDuels || 0) + 1,
      history: [
        ...(stats?.history || []),
        {
          date: Date.now(),
          p1Name: settings.p1Name,
          p2Name: settings.p2Name,
          p1Score: finalState.p1Score,
          p2Score: finalState.p2Score,
          winner,
          rounds: settings.rounds,
          filter: settings.filter,
        },
      ].slice(-20), // keep last 20
    };
    await saveStats(newStats);
    setScreen("result");
  };

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        background: screen === "duel"
          ? "linear-gradient(180deg, #FEE2E2 0%, #FECACA 50%, #FCA5A5 100%)"
          : "linear-gradient(180deg, #FED7AA 0%, #FEF3C7 50%, #FDE68A 100%)",
        fontFamily: "'Fredoka', 'Nunito', system-ui, sans-serif",
      }}
    >
      <button
        onClick={() => setAudioOn(!audioOn)}
        className="fixed top-3 right-3 z-50 bg-white rounded-full p-2.5 shadow-lg hover:scale-110 transition-transform border-4 border-amber-600"
      >
        {audioOn ? <Volume2 className="w-5 h-5 text-amber-700" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
      </button>

      <div className="max-w-4xl mx-auto p-2 sm:p-4">
        {screen === "menu" && (
          <MenuScreen onStart={() => setScreen("setup")} stats={stats} />
        )}
        {screen === "setup" && (
          <SetupScreen
            settings={settings}
            setSettings={setSettings}
            onStart={startDuel}
            onBack={() => setScreen("menu")}
          />
        )}
        {screen === "duel" && duelState && (
          <DuelScreen
            duelState={duelState}
            setDuelState={setDuelState}
            settings={settings}
            onEnd={endDuel}
            speak={speak}
            audioOn={audioOn}
          />
        )}
        {screen === "result" && duelState && (
          <ResultScreen
            duelState={duelState}
            settings={settings}
            onRematch={startDuel}
            onMenu={() => setScreen("menu")}
          />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MENU
// ============================================================================
function MenuScreen({ onStart, stats }) {
  const lastDuels = stats?.history?.slice(-3).reverse() || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] py-6">
      <div className="bg-white/95 backdrop-blur rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border-8 border-red-400 max-w-xl w-full relative overflow-hidden">
        {/* Decorations */}
        <div className="absolute top-2 left-2 text-3xl opacity-40">⚔️</div>
        <div className="absolute top-2 right-2 text-3xl opacity-40">⚔️</div>

        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-3 text-5xl sm:text-7xl mb-2">
            <span>🦊</span>
            <Swords className="w-12 h-12 sm:w-16 sm:h-16 text-red-600" strokeWidth={2.5} />
            <span>🦊</span>
          </div>
          <h1
            className="text-3xl sm:text-5xl font-black text-red-700 tracking-tight"
            style={{ textShadow: "3px 3px 0 #FEE2E2" }}
          >
            GRAMMAR DUEL
          </h1>
          <p className="text-sm sm:text-base text-red-600 font-bold italic mt-1">
            Грамматическая дуэль на время ⚡
          </p>
        </div>

        <div className="bg-red-50 rounded-2xl p-4 mb-5 border-4 border-red-300">
          <p className="font-black text-red-700 mb-2 text-sm sm:text-base">⚔️ Как играть:</p>
          <ul className="space-y-1 text-xs sm:text-sm text-gray-700 font-semibold">
            <li>👥 <b>Два игрока</b> на одном устройстве (экран делится пополам)</li>
            <li>⏱️ <b>15 секунд</b> на каждый вопрос</li>
            <li>⚡ <b>Быстрее ответил — больше очков!</b> (100 баллов + до 50 за скорость)</li>
            <li>✅ Очки только за правильный ответ</li>
            <li>🏆 Кто набрал больше — тот чемпион!</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-gradient-to-b from-red-500 to-red-700 text-white font-black text-xl sm:text-2xl py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform border-b-8 border-red-900 flex items-center justify-center gap-3"
        >
          <Swords className="w-7 h-7" />
          НАЧАТЬ ДУЭЛЬ
          <Swords className="w-7 h-7 scale-x-[-1]" />
        </button>

        {/* Recent duels */}
        {lastDuels.length > 0 && (
          <div className="mt-5 pt-5 border-t-2 border-dashed border-red-200">
            <p className="text-xs font-black text-red-700 uppercase mb-2 flex items-center gap-1">
              <Trophy className="w-4 h-4" /> Последние дуэли
            </p>
            <div className="space-y-1.5">
              {lastDuels.map((d, i) => (
                <div key={i} className="bg-white rounded-lg p-2 shadow-sm border border-red-100 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-700">
                      {d.p1Name} <span className={d.winner === "p1" ? "text-green-600" : "text-gray-500"}>{d.p1Score}</span>
                    </span>
                    <span className="text-gray-400">vs</span>
                    <span className="font-bold text-gray-700">
                      <span className={d.winner === "p2" ? "text-green-600" : "text-gray-500"}>{d.p2Score}</span> {d.p2Name}
                    </span>
                  </div>
                  <div className="text-sm">
                    {d.winner === "tie" ? "🤝" : (d.winner === "p1" ? "👑" : "👑")}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 text-center mt-1">
              Всего дуэлей: {stats.totalDuels}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SETUP
// ============================================================================
function SetupScreen({ settings, setSettings, onStart, onBack }) {
  return (
    <div className="py-4">
      <button
        onClick={onBack}
        className="mb-3 bg-white text-red-700 font-bold px-3 py-1.5 rounded-xl shadow-md hover:scale-105 transition-transform border-2 border-red-300 text-sm flex items-center gap-1"
      >
        ← Назад
      </button>

      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 shadow-2xl border-8 border-red-300">
        <h1 className="text-2xl sm:text-3xl font-black text-red-700 mb-4 text-center">
          ⚔️ Подготовка к дуэли
        </h1>

        {/* Player names */}
        <div className="space-y-3 mb-5">
          <div>
            <label className="text-xs font-black text-red-700 uppercase flex items-center gap-1 mb-1">
              <span className="text-lg">🦊</span> Игрок 1 (левая сторона)
            </label>
            <input
              type="text"
              value={settings.p1Name}
              onChange={(e) => setSettings({ ...settings, p1Name: e.target.value.slice(0, 15) })}
              className="w-full border-4 border-orange-300 focus:border-orange-500 rounded-xl px-4 py-2.5 font-bold text-base outline-none"
              placeholder="Имя первого игрока"
            />
          </div>
          <div>
            <label className="text-xs font-black text-red-700 uppercase flex items-center gap-1 mb-1">
              <span className="text-lg">🦊</span> Игрок 2 (правая сторона)
            </label>
            <input
              type="text"
              value={settings.p2Name}
              onChange={(e) => setSettings({ ...settings, p2Name: e.target.value.slice(0, 15) })}
              className="w-full border-4 border-sky-300 focus:border-sky-500 rounded-xl px-4 py-2.5 font-bold text-base outline-none"
              placeholder="Имя второго игрока"
            />
          </div>
        </div>

        {/* Rounds */}
        <div className="mb-4">
          <label className="text-xs font-black text-red-700 uppercase mb-1 block">
            🎯 Количество раундов
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15, 20].map((n) => (
              <button
                key={n}
                onClick={() => setSettings({ ...settings, rounds: n })}
                className={`py-3 rounded-xl font-black text-lg border-4 transition-all ${
                  settings.rounds === n
                    ? "bg-red-500 text-white border-red-700 scale-105"
                    : "bg-white text-red-600 border-red-200 hover:border-red-400"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Topic filter */}
        <div className="mb-5">
          <label className="text-xs font-black text-red-700 uppercase mb-1 block">
            📚 Тема дуэли
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => setSettings({ ...settings, filter: "mixed" })}
              className={`p-3 rounded-xl font-bold text-sm border-4 transition-all text-left ${
                settings.filter === "mixed"
                  ? "bg-gradient-to-r from-red-500 to-purple-500 text-white border-red-700"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="text-xl mb-0.5">🎲</div>
              Микс всех времён
              <div className="text-[10px] opacity-80">все 4 времени вперемешку</div>
            </button>
            {TENSES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSettings({ ...settings, filter: t.id })}
                className={`p-3 rounded-xl font-bold text-sm border-4 transition-all text-left ${
                  settings.filter === t.id ? "text-white scale-[1.02]" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                }`}
                style={settings.filter === t.id ? { background: t.color, borderColor: t.colorDark } : {}}
              >
                <div className="text-xl mb-0.5">{t.emoji}</div>
                {t.name}
                <div className="text-[10px] opacity-80">{t.nameRu}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          disabled={!settings.p1Name.trim() || !settings.p2Name.trim()}
          className="w-full bg-gradient-to-b from-red-500 to-red-700 text-white font-black text-xl py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform border-b-8 border-red-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Zap className="w-6 h-6" /> В БОЙ!
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// DUEL SCREEN — split into two halves
// ============================================================================
function DuelScreen({ duelState, setDuelState, settings, onEnd, speak, audioOn }) {
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [countdown, setCountdown] = useState(3); // "3... 2... 1... GO!"
  const [phase, setPhase] = useState("countdown"); // countdown | playing | reveal | between
  const timerRef = useRef(null);
  const questionStartRef = useRef(Date.now());

  const currentQ = duelState.questions[duelState.round];
  const totalRounds = duelState.questions.length;

  // Countdown before each question
  useEffect(() => {
    if (phase !== "countdown") return;
    setCountdown(3);
    const iv = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(iv);
          setPhase("playing");
          setTimeLeft(TIME_PER_QUESTION);
          questionStartRef.current = Date.now();
          if (audioOn && currentQ) {
            setTimeout(() => speak(currentQ.q.replace(/___/g, "blank")), 300);
          }
          return 0;
        }
        return c - 1;
      });
    }, 700);
    return () => clearInterval(iv);
  }, [phase, duelState.round]);

  // Main timer
  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          clearInterval(timerRef.current);
          endRound();
          return 0;
        }
        return t - 0.1;
      });
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // Check if both players answered
  useEffect(() => {
    if (phase !== "playing") return;
    if (duelState.p1Answer !== null && duelState.p2Answer !== null) {
      clearInterval(timerRef.current);
      endRound();
    }
  }, [duelState.p1Answer, duelState.p2Answer, phase]);

  const handleAnswer = (player, chosenIdx) => {
    if (phase !== "playing") return;
    const key = player === 1 ? "p1Answer" : "p2Answer";
    if (duelState[key] !== null) return; // already answered
    const timeUsed = (Date.now() - questionStartRef.current) / 1000;
    const timeLeftAtAnswer = Math.max(0, TIME_PER_QUESTION - timeUsed);
    setDuelState({
      ...duelState,
      [key]: { chosen: chosenIdx, timeLeft: timeLeftAtAnswer },
    });
  };

  const endRound = () => {
    setPhase("reveal");
    // Calculate scores
    const p1A = duelState.p1Answer;
    const p2A = duelState.p2Answer;
    let p1Points = 0, p2Points = 0;
    let p1Correct = false, p2Correct = false;

    if (p1A && p1A.chosen === currentQ.correct) {
      p1Correct = true;
      p1Points = calculatePoints(p1A.timeLeft, TIME_PER_QUESTION);
    }
    if (p2A && p2A.chosen === currentQ.correct) {
      p2Correct = true;
      p2Points = calculatePoints(p2A.timeLeft, TIME_PER_QUESTION);
    }

    // Who wins the round? (faster correct answer)
    let roundWin = null;
    if (p1Correct && p2Correct) {
      roundWin = p1A.timeLeft > p2A.timeLeft ? "p1" : "p2";
    } else if (p1Correct) roundWin = "p1";
    else if (p2Correct) roundWin = "p2";

    setDuelState({
      ...duelState,
      p1Score: duelState.p1Score + p1Points,
      p2Score: duelState.p2Score + p2Points,
      p1Wins: duelState.p1Wins + (roundWin === "p1" ? 1 : 0),
      p2Wins: duelState.p2Wins + (roundWin === "p2" ? 1 : 0),
      lastRound: { p1Correct, p2Correct, p1Points, p2Points, roundWin },
    });

    // Show reveal for 2.5 seconds, then next round or end
    setTimeout(() => {
      if (duelState.round + 1 >= totalRounds) {
        // End
        const finalState = {
          ...duelState,
          p1Score: duelState.p1Score + p1Points,
          p2Score: duelState.p2Score + p2Points,
          p1Wins: duelState.p1Wins + (roundWin === "p1" ? 1 : 0),
          p2Wins: duelState.p2Wins + (roundWin === "p2" ? 1 : 0),
        };
        onEnd(finalState);
      } else {
        setDuelState((prev) => ({
          ...prev,
          round: prev.round + 1,
          p1Answer: null,
          p2Answer: null,
          lastRound: null,
        }));
        setPhase("countdown");
      }
    }, 2800);
  };

  if (!currentQ) return null;

  const tense = TENSES.find((t) => t.id === currentQ.tense);

  return (
    <div className="py-2 min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-white/95 rounded-2xl p-2 shadow-md border-2 border-red-400 mb-2 flex items-center justify-between">
        <button
          onClick={() => {
            if (confirm("Закончить дуэль?")) onEnd(duelState);
          }}
          className="bg-gray-100 text-gray-700 font-bold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 hover:bg-gray-200"
        >
          <X className="w-3 h-3" /> Сдаться
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-red-700">
            Раунд {duelState.round + 1}/{totalRounds}
          </span>
          {tense && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: tense.color }}>
              {tense.emoji} {tense.name}
            </span>
          )}
        </div>
        <div className="w-12"></div>
      </div>

      {/* Countdown overlay */}
      {phase === "countdown" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="text-white text-xl sm:text-2xl font-bold mb-4">Раунд {duelState.round + 1}</div>
            <div className="text-white text-[12rem] sm:text-[16rem] font-black leading-none animate-ping-slow">
              {countdown}
            </div>
          </div>
        </div>
      )}

      {/* Timer bar */}
      {phase === "playing" && (
        <div className="w-full bg-white rounded-full h-3 mb-2 overflow-hidden border-2 border-red-400 shadow">
          <div
            className={`h-full transition-all ${
              timeLeft < 5 ? "bg-red-500 animate-pulse" : "bg-gradient-to-r from-green-400 to-yellow-400"
            }`}
            style={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
          />
        </div>
      )}

      {/* Question */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg border-4 border-red-400 mb-2 text-center">
        <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">Вопрос</div>
        <div className="text-base sm:text-xl font-black text-gray-800">{currentQ.q}</div>
        <div className="flex items-center justify-center gap-3 mt-2 text-xs">
          <Clock className="w-4 h-4 text-red-600" />
          <span className="font-black text-red-600 text-lg">{Math.ceil(timeLeft)}s</span>
        </div>
      </div>

      {/* Two player areas */}
      <div className="flex-1 grid grid-cols-2 gap-2">
        <PlayerPanel
          player={1}
          name={settings.p1Name}
          score={duelState.p1Score}
          wins={duelState.p1Wins}
          answer={duelState.p1Answer}
          question={currentQ}
          phase={phase}
          lastRound={duelState.lastRound}
          onAnswer={(idx) => handleAnswer(1, idx)}
          playerColor="#F97316"
          playerColorDark="#9A3412"
          playerColorLight="#FED7AA"
        />
        <PlayerPanel
          player={2}
          name={settings.p2Name}
          score={duelState.p2Score}
          wins={duelState.p2Wins}
          answer={duelState.p2Answer}
          question={currentQ}
          phase={phase}
          lastRound={duelState.lastRound}
          onAnswer={(idx) => handleAnswer(2, idx)}
          playerColor="#0EA5E9"
          playerColorDark="#0C4A6E"
          playerColorLight="#BAE6FD"
        />
      </div>

      {/* Reveal overlay */}
      {phase === "reveal" && duelState.lastRound && (
        <div className="fixed inset-x-0 bottom-0 top-1/3 bg-black/40 flex items-center justify-center z-40 pointer-events-none p-4">
          <div className="bg-white rounded-3xl p-5 shadow-2xl border-8 border-amber-400 max-w-md text-center">
            <div className="text-sm font-bold text-gray-500 mb-1">Правильный ответ:</div>
            <div className="text-2xl sm:text-3xl font-black text-green-600 mb-3">
              {String.fromCharCode(65 + currentQ.correct)}. {currentQ.options[currentQ.correct]}
            </div>
            {duelState.lastRound.roundWin ? (
              <div className="text-xl font-black text-amber-700 flex items-center justify-center gap-2">
                <Zap className="w-6 h-6 text-amber-500" />
                {duelState.lastRound.roundWin === "p1" ? settings.p1Name : settings.p2Name} — быстрее!
              </div>
            ) : (
              <div className="text-lg font-bold text-gray-600">😅 Никто не угадал...</div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes ping-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
        .animate-ping-slow { animation: ping-slow 0.7s ease-in-out; }
      `}</style>
    </div>
  );
}

function PlayerPanel({ player, name, score, wins, answer, question, phase, lastRound, onAnswer, playerColor, playerColorDark, playerColorLight }) {
  const mirrored = player === 2; // optional styling

  const hasAnswered = answer !== null;
  const myLastRound = lastRound ? (player === 1 ? {
    correct: lastRound.p1Correct,
    points: lastRound.p1Points,
    won: lastRound.roundWin === "p1",
  } : {
    correct: lastRound.p2Correct,
    points: lastRound.p2Points,
    won: lastRound.roundWin === "p2",
  }) : null;

  return (
    <div
      className="rounded-2xl p-2 sm:p-3 shadow-lg border-4 flex flex-col relative overflow-hidden"
      style={{ background: playerColorLight, borderColor: playerColor }}
    >
      {/* Player header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b-2" style={{ borderColor: playerColor + "66" }}>
        <div className="flex items-center gap-1.5">
          <div className="text-2xl sm:text-3xl">🦊</div>
          <div>
            <div className="font-black text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px]" style={{ color: playerColorDark }}>
              {name}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="flex items-center gap-0.5" style={{ color: playerColorDark }}>
                <Zap className="w-3 h-3" /> {score}
              </span>
              <span className="flex items-center gap-0.5 text-gray-600">
                <Trophy className="w-3 h-3" /> {wins}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Answers area */}
      {phase === "playing" && (
        <div className="grid grid-cols-1 gap-1.5 flex-1">
          {question.options.map((opt, i) => {
            const isChosen = hasAnswered && answer.chosen === i;
            return (
              <button
                key={i}
                onClick={() => onAnswer(i)}
                disabled={hasAnswered}
                className={`p-2 rounded-lg font-bold text-xs sm:text-sm border-2 transition-all text-left ${
                  isChosen
                    ? "bg-white scale-[1.02]"
                    : hasAnswered
                    ? "bg-white/50 opacity-50"
                    : "bg-white hover:scale-[1.02] active:scale-95"
                }`}
                style={{
                  borderColor: isChosen ? playerColorDark : playerColor + "66",
                  color: playerColorDark,
                  borderWidth: isChosen ? "3px" : "2px",
                }}
              >
                <span className="inline-block w-5 h-5 rounded-full text-center font-black mr-1 text-[10px] text-white" style={{ background: playerColor, lineHeight: "20px" }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Waiting state */}
      {phase === "playing" && hasAnswered && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl">
          <div className="text-center">
            <div className="text-4xl mb-1">✅</div>
            <div className="text-sm font-black" style={{ color: playerColorDark }}>Ответ принят!</div>
            <div className="text-[10px] font-bold text-gray-600">Жди соперника...</div>
          </div>
        </div>
      )}

      {/* Reveal */}
      {phase === "reveal" && myLastRound && (
        <div className="absolute inset-0 bg-white/95 flex items-center justify-center rounded-2xl">
          <div className="text-center">
            <div className="text-5xl mb-1">
              {myLastRound.correct ? (myLastRound.won ? "🏆" : "✅") : "❌"}
            </div>
            {myLastRound.correct ? (
              <>
                <div className="text-xl font-black text-green-600">+{myLastRound.points}</div>
                {myLastRound.won && (
                  <div className="text-xs font-bold text-amber-600 flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3" /> Быстрее!
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm font-bold text-red-500">
                {answer === null ? "Не успел(а)" : "Неверно"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// RESULT SCREEN
// ============================================================================
function ResultScreen({ duelState, settings, onRematch, onMenu }) {
  const p1Won = duelState.p1Score > duelState.p2Score;
  const p2Won = duelState.p2Score > duelState.p1Score;
  const tie = duelState.p1Score === duelState.p2Score;

  return (
    <div className="flex items-center justify-center min-h-[90vh] py-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-8 border-amber-400 max-w-lg w-full text-center relative overflow-hidden">
        {/* Confetti decorations */}
        <div className="absolute top-2 left-2 text-3xl animate-bounce">🎉</div>
        <div className="absolute top-2 right-2 text-3xl animate-bounce" style={{ animationDelay: "0.3s" }}>🎊</div>
        <div className="absolute bottom-2 left-2 text-3xl animate-pulse">⭐</div>
        <div className="absolute bottom-2 right-2 text-3xl animate-pulse" style={{ animationDelay: "0.5s" }}>⭐</div>

        <Crown className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500 mx-auto mb-2" />
        <h1 className="text-3xl sm:text-4xl font-black text-amber-700 mb-1">
          {tie ? "НИЧЬЯ!" : "ПОБЕДА!"}
        </h1>
        {!tie && (
          <p className="text-lg sm:text-xl font-black mb-4" style={{ color: p1Won ? "#F97316" : "#0EA5E9" }}>
            🦊 {p1Won ? settings.p1Name : settings.p2Name} — чемпион!
          </p>
        )}

        {/* Score comparison */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            className={`rounded-2xl p-4 border-4 ${p1Won ? "bg-orange-100 border-orange-500 scale-105" : "bg-gray-50 border-gray-300"}`}
          >
            <div className="text-3xl mb-1">🦊{p1Won ? "👑" : ""}</div>
            <div className="font-black text-sm text-orange-800 truncate">{settings.p1Name}</div>
            <div className="text-3xl font-black text-orange-600">{duelState.p1Score}</div>
            <div className="text-[10px] font-bold text-orange-700">
              {duelState.p1Wins} раундов
            </div>
          </div>
          <div
            className={`rounded-2xl p-4 border-4 ${p2Won ? "bg-sky-100 border-sky-500 scale-105" : "bg-gray-50 border-gray-300"}`}
          >
            <div className="text-3xl mb-1">🦊{p2Won ? "👑" : ""}</div>
            <div className="font-black text-sm text-sky-800 truncate">{settings.p2Name}</div>
            <div className="text-3xl font-black text-sky-600">{duelState.p2Score}</div>
            <div className="text-[10px] font-bold text-sky-700">
              {duelState.p2Wins} раундов
            </div>
          </div>
        </div>

        {/* Differential */}
        {!tie && (
          <div className="text-sm text-gray-600 font-bold mb-4">
            Разрыв: <span className="text-amber-700">{Math.abs(duelState.p1Score - duelState.p2Score)} очков</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onMenu}
            className="flex-1 bg-white text-gray-700 font-bold py-3 rounded-xl shadow border-2 border-gray-300 hover:scale-105 transition-transform text-sm flex items-center justify-center gap-1"
          >
            <Flag className="w-4 h-4" /> В меню
          </button>
          <button
            onClick={onRematch}
            className="flex-1 bg-gradient-to-b from-red-500 to-red-700 text-white font-black py-3 rounded-xl shadow-lg hover:scale-105 transition-transform border-b-4 border-red-900 text-sm flex items-center justify-center gap-1"
          >
            <Swords className="w-4 h-4" /> Реванш!
          </button>
        </div>
      </div>
    </div>
  );
}
