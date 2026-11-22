import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, Flame, HelpCircle, ArrowRight, Video } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ISL_DICTIONARY } from '../data/islDictionary';
import ISLAvatarPlayer from './ISLAvatarPlayer';
import { tokenizeTextToISL } from '../utils/islMatcher';
import { BotanicalBranch } from './BotanicalDecorations';

export default function PracticeStudio({ speechHook, onNavigateToWebcam = null }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizPool, setQuizPool] = useState([]);

  useEffect(() => {
    generateNewQuiz();
  }, []);

  const generateNewQuiz = () => {
    const shuffled = [...ISL_DICTIONARY].sort(() => 0.5 - Math.random()).slice(0, 5);
    const questions = shuffled.map(targetSign => {
      const wrongOptions = ISL_DICTIONARY
        .filter(d => d.id !== targetSign.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(d => d.word);
      const allOptions = [...wrongOptions, targetSign.word].sort(() => 0.5 - Math.random());
      return {
        targetSign,
        options: allOptions
      };
    });
    setQuizPool(questions);
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const currentQ = quizPool[currentQuestionIdx];

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.targetSign.word;
    if (isCorrect) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#263F32', '#A65338', '#A8B49A', '#C4775C']
      });
      speechHook.speak(`Correct! The sign is ${option}`);
    } else {
      setStreak(0);
      speechHook.speak(`Not quite. The correct sign is ${currentQ.targetSign.word}`);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < quizPool.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#263F32', '#A65338', '#A8B49A', '#C4775C']
      });
    }
  };

  const isCompleted = quizPool.length > 0 && currentQuestionIdx >= quizPool.length - 1 && isAnswered;

  return (
    <div className="practice-studio-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Stats Banner */}
      <div
        className="card"
        style={{
          padding: '20px 26px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <BotanicalBranch size={20} color="var(--color-forest-green)" />
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-forest-green)' }}>
              ISL Practice & Quiz Studio
            </h2>
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Strengthen your Indian Sign Language comprehension with visual quizzes
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={18} color="var(--color-forest-green)" />
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>{score} pts</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={18} color="var(--color-rust)" />
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-rust)' }}>{streak} Streak</span>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={generateNewQuiz}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', padding: '6px 14px' }}
          >
            <RotateCcw size={13} /> Reset Quiz
          </button>
        </div>
      </div>

      {/* Quiz Play Area */}
      {currentQ && (
        <div className="workbench-grid">
          {/* Sign Demonstration Avatar to Identify */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                QUESTION {currentQuestionIdx + 1} OF {quizPool.length}
              </span>
              <span className="badge badge-sage">
                Difficulty: {currentQ.targetSign.difficulty}
              </span>
            </div>

            <ISLAvatarPlayer
              tokens={tokenizeTextToISL(currentQ.targetSign.word)}
              currentIndex={0}
              autoPlay={true}
              height={360}
            />
          </div>

          {/* Multiple Choice Options */}
          <div
            className="card"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: '1.35rem', color: 'var(--color-forest-green)' }}>
                Which ISL sign is being demonstrated?
              </h3>
              <p style={{ margin: '0 0 20px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Observe the handshape, movement trajectory, and facial cue.
              </p>

              {/* 4 Answer Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = opt === currentQ.targetSign.word;

                  let btnStyle = {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: isAnswered ? 'default' : 'pointer',
                    transition: 'all var(--transition-fast)',
                    border: '1.5px solid var(--color-beige)',
                    backgroundColor: 'var(--color-warm-ivory)',
                    color: 'var(--color-charcoal)'
                  };

                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle.border = '2px solid var(--color-forest-green)';
                      btnStyle.backgroundColor = 'var(--color-muted-sage)';
                      btnStyle.color = 'var(--color-forest-green)';
                    } else if (isSelected) {
                      btnStyle.border = '2px solid var(--color-rust)';
                      btnStyle.backgroundColor = 'rgba(166, 83, 56, 0.12)';
                      btnStyle.color = 'var(--color-rust)';
                    }
                  } else if (isSelected) {
                    btnStyle.border = '2px solid var(--color-forest-green)';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      style={btnStyle}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-beige)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: 'var(--color-charcoal)'
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswered && (
                        <span>
                          {isCorrect && <CheckCircle2 size={18} color="var(--color-forest-green)" />}
                          {!isCorrect && isSelected && <XCircle size={18} color="var(--color-rust)" />}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Feedback & Next Button */}
            {isAnswered && (
              <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--color-beige)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: selectedAnswer === currentQ.targetSign.word ? 'var(--color-forest-green)' : 'var(--color-rust)' }}>
                      {selectedAnswer === currentQ.targetSign.word ? '🎉 Spot on!' : `💡 Correct answer: ${currentQ.targetSign.word}`}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {currentQ.targetSign.englishMeaning}
                    </div>
                  </div>

                  {!isCompleted ? (
                    <button
                      className="btn btn-primary"
                      onClick={handleNextQuestion}
                      style={{ backgroundColor: 'var(--color-rust)', color: '#FFFDF8', fontWeight: 700 }}
                    >
                      <span>Next Question</span> <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button
                      className="btn btn-forest"
                      onClick={generateNewQuiz}
                      style={{ fontWeight: 700 }}
                    >
                      <Sparkles size={15} /> Play Again
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
