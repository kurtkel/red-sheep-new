'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions, scaleLabels, sections, RespondentRole } from '@/lib/questions';

interface PageProps {
  params: Promise<{
    role: string;
  }>;
}

export default function SurveyPage({ params }: PageProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<RespondentRole | null>(null);

  // Unwrap params and validate role
  useState(() => {
    params.then(({ role: urlRole }) => {
      if (urlRole !== 'leader' && urlRole !== 'staff') {
        router.push('/');
      } else {
        setRole(urlRole as RespondentRole);
      }
    });
  });

  if (!role) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const currentQuestionData = questions[currentQuestion];
  const questionText = role === 'leader' ? currentQuestionData.leaderText : currentQuestionData.staffText;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const currentSection = sections.find(s => s.name === currentQuestionData.section);

  const handleAnswer = (score: number) => {
    setAnswers({ ...answers, [currentQuestionData.id]: score });
  };

  const handleNext = () => {
    if (answers[currentQuestionData.id] === undefined) {
      alert('Please select an answer before continuing.');
      return;
    }

    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
          answers: questions.map(q => ({
            questionNumber: q.id,
            sectionName: q.section,
            score: answers[q.id],
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/survey/complete?surveyId=${data.surveyId}`);
      } else {
        alert('Error submitting survey. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Error submitting survey. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {role === 'leader' ? 'Leader Assessment' : 'Staff Assessment'}
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          {/* Section Header */}
          <div className="mb-6">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Section {currentSection?.number}: {currentQuestionData.section}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
            {questionText}
          </h2>

          {/* Scale */}
          <div className="space-y-3">
            {scaleLabels.map((scale) => (
              <label
                key={scale.value}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  answers[currentQuestionData.id] === scale.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionData.id}`}
                  value={scale.value}
                  checked={answers[currentQuestionData.id] === scale.value}
                  onChange={() => handleAnswer(scale.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 dark:text-white flex-1">
                  {scale.label}
                </span>
                <span className="text-gray-500 dark:text-gray-400 font-semibold">
                  {scale.value}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit' : 'Next'}
          </button>
        </div>

        {/* Question Overview */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Progress by Section
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
                  answers[q.id] !== undefined
                    ? 'bg-green-500 text-white'
                    : idx === currentQuestion
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                title={`Question ${q.id}`}
              >
                {q.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
