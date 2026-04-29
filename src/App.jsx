import { useState, useCallback } from 'react';
import {
  questions,
  employees,
  getPlayerPersonality,
  mergeVotes,
} from './mockData';
import EntryPage      from './components/EntryPage';
import QuestionPage   from './components/QuestionPage';
import FeedbackPage   from './components/FeedbackPage';
import CompletePage   from './components/CompletePage';
import ResultCardPage from './components/ResultCardPage';
import ShareCardPage  from './components/ShareCardPage';
import StatsPage      from './components/StatsPage';

export default function App() {
  const [phase, setPhase]               = useState('entry');
  const [playerName, setPlayerName]     = useState('');
  const [currentQ, setCurrentQ]         = useState(0);
  const [answers, setAnswers]           = useState([]);
  const [lastEmployee, setLastEmployee] = useState(null);
  const [stars, setStars]               = useState(0);

  const handleStart = useCallback((name) => {
    setPlayerName(name.trim() || '粽子觀察家');
    setPhase('question');
  }, []);

  const handleAnswer = useCallback((employeeId) => {
    const q   = questions[currentQ];
    const emp = employees.find((e) => e.id === employeeId);
    setAnswers((prev) => [
      ...prev,
      { questionId: q.id, questionType: q.type, employeeId, feedback: q.feedback },
    ]);
    setLastEmployee(emp);
    setStars((s) => s + 1);
    setPhase('feedback');
  }, [currentQ]);

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setPhase('question');
    } else {
      setPhase('complete');
    }
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    setPhase('entry');
    setPlayerName('');
    setCurrentQ(0);
    setAnswers([]);
    setLastEmployee(null);
    setStars(0);
  }, []);

  const playerPersonality  = getPlayerPersonality(answers);
  const mergedVotes        = mergeVotes(answers);

  const pageProps = { onRestart: handleRestart };

  return (
    <div className="min-h-screen bg-rice texture-bg font-sans">
      {phase === 'entry' && (
        <EntryPage onStart={handleStart} />
      )}
      {phase === 'question' && (
        <QuestionPage
          question={questions[currentQ]}
          employees={employees}
          currentIndex={currentQ}
          total={questions.length}
          stars={stars}
          onAnswer={handleAnswer}
        />
      )}
      {phase === 'feedback' && (
        <FeedbackPage
          employee={lastEmployee}
          feedback={answers[answers.length - 1]?.feedback}
          isLast={currentQ >= questions.length - 1}
          onNext={handleNext}
        />
      )}
      {phase === 'complete' && (
        <CompletePage
          playerName={playerName}
          stars={stars}
          total={questions.length}
          onViewResult={() => setPhase('result')}
          onViewStats={() => setPhase('stats')}
          {...pageProps}
        />
      )}
      {phase === 'result' && (
        <ResultCardPage
          playerName={playerName}
          personality={playerPersonality}
          answers={answers}
          onShare={() => setPhase('share')}
          onBack={() => setPhase('complete')}
        />
      )}
      {phase === 'share' && (
        <ShareCardPage
          playerName={playerName}
          personality={playerPersonality}
          onBack={() => setPhase('result')}
        />
      )}
      {phase === 'stats' && (
        <StatsPage
          mergedVotes={mergedVotes}
          employees={employees}
          onBack={() => setPhase('complete')}
        />
      )}
    </div>
  );
}
