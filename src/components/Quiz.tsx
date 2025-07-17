import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, Trophy } from 'lucide-react';
import { Quiz as QuizType, QuizResult } from '../types';

interface QuizProps {
  quiz: QuizType;
  onComplete: (result: QuizResult) => void;
}

export default function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let correct = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / quiz.questions.length) * 100);
    const quizResult: QuizResult = {
      score,
      totalQuestions: quiz.questions.length,
      answers,
      passed: score >= 70
    };

    setResult(quizResult);
    setShowResult(true);
    onComplete(quizResult);
  };

  const question = quiz.questions[currentQuestion];

  if (showResult && result) {
    return (
      <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            result.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {result.passed ? (
              <Trophy className="h-8 w-8 text-green-600" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600" />
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {result.passed ? 'Congratulations!' : 'Keep Learning!'}
          </h3>
          
          <p className="text-gray-600 mb-6">
            You scored {result.score}% on this quiz
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Correct Answers</span>
              <span className="font-semibold">
                {Object.values(answers).filter((answer, index) => 
                  answer === quiz.questions[index].correctAnswer
                ).length} / {result.totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${result.passed ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>

          {result.passed ? (
            <p className="text-green-600 font-medium">
              Great job! You can proceed to the next lesson.
            </p>
          ) : (
            <p className="text-red-600 font-medium">
              You need 70% to pass. Review the material and try again.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">{quiz.title}</h3>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          {question.question}
        </h4>

        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[question.id] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                    {answers[question.id] === index && (
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    )}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="space-y-3">
            {['True', 'False'].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[question.id] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                    {answers[question.id] === index && (
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    )}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={nextQuestion}
          disabled={answers[question.id] === undefined}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span>{currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}