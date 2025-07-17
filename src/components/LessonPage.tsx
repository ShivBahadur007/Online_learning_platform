import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Play, BookOpen, Award } from 'lucide-react';
import { Course, Lesson, QuizResult } from '../types';
import VideoPlayer from './VideoPlayer';
import Quiz from './Quiz';

interface LessonPageProps {
  course: Course;
  lesson: Lesson;
  onBack: () => void;
  onComplete: (lessonId: string, quizResult?: QuizResult) => void;
  onNext: () => void;
  hasNext: boolean;
}

export default function LessonPage({ course, lesson, onBack, onComplete, onNext, hasNext }: LessonPageProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'quiz'>('video');
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleVideoProgress = (progress: number) => {
    setVideoProgress(progress);
  };

  const handleVideoComplete = () => {
    setVideoCompleted(true);
    if (!lesson.quiz) {
      onComplete(lesson.id);
    }
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizCompleted(true);
    setQuizResult(result);
    onComplete(lesson.id, result);
  };

  const isLessonComplete = videoCompleted && (!lesson.quiz || quizCompleted);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Course</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-lg font-semibold text-gray-900">{course.title}</h1>
            </div>

            <div className="flex items-center space-x-4">
              {isLessonComplete && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
              
              {hasNext && (
                <button
                  onClick={onNext}
                  disabled={!isLessonComplete}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next Lesson
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm mb-6">
              {/* Lesson Header */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
                <p className="text-gray-600">{lesson.description}</p>
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                  <span>Duration: {lesson.duration}</span>
                  {videoProgress > 0 && (
                    <span>Progress: {Math.round(videoProgress)}%</span>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('video')}
                  className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                    activeTab === 'video'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Play className="h-4 w-4" />
                  <span>Video</span>
                </button>
                
                {lesson.quiz && (
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                      activeTab === 'quiz'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Quiz</span>
                    {quizCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === 'video' && (
                  <VideoPlayer
                    src={lesson.videoUrl}
                    title={lesson.title}
                    onProgress={handleVideoProgress}
                    onComplete={handleVideoComplete}
                  />
                )}

                {activeTab === 'quiz' && lesson.quiz && (
                  <Quiz
                    quiz={lesson.quiz}
                    onComplete={handleQuizComplete}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Progress</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Video Progress</span>
                    <span>{Math.round(videoProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>
                </div>

                {lesson.quiz && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Quiz</span>
                      <span>{quizCompleted ? 'Completed' : 'Pending'}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          quizCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                        style={{ width: quizCompleted ? '100%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {quizResult && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Quiz Score</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {quizResult.score}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {quizResult.passed ? 'Passed' : 'Failed'} • {quizResult.totalQuestions} questions
                  </div>
                </div>
              )}
            </div>

            {/* Course Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Lessons</h3>
              <div className="space-y-2">
                {course.lessons.map((courseLesson, index) => (
                  <div
                    key={courseLesson.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      courseLesson.id === lesson.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          {index + 1}. {courseLesson.title}
                        </h4>
                        <p className="text-xs text-gray-500">{courseLesson.duration}</p>
                      </div>
                      {courseLesson.isCompleted && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}