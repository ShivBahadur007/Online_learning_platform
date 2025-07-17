import React, { useState } from 'react';
import { mockUser, mockCourses } from './data/mockData';
import { Course, User, QuizResult } from './types';
import Header from './components/Header';
import CourseCard from './components/CourseCard';
import LessonPage from './components/LessonPage';
import Dashboard from './components/Dashboard';

type View = 'dashboard' | 'courses' | 'lesson';

function App() {
  const [user, setUser] = useState<User>(mockUser);
  const [courses] = useState<Course[]>(mockCourses);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const enrolledCourses = courses.filter(course => 
    user.enrolledCourses.includes(course.id)
  );

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnroll = (courseId: string) => {
    setUser(prev => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, courseId]
    }));
  };

  const handleContinueCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setSelectedLesson(0);
      setCurrentView('lesson');
    }
  };

  const handleLessonComplete = (lessonId: string, quizResult?: QuizResult) => {
    setUser(prev => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId],
      quizScores: quizResult ? { ...prev.quizScores, [lessonId]: quizResult.score } : prev.quizScores
    }));
  };

  const handleNextLesson = () => {
    if (selectedCourse && selectedLesson < selectedCourse.lessons.length - 1) {
      setSelectedLesson(prev => prev + 1);
    }
  };

  const getCourseProgress = (course: Course) => {
    const completedLessons = user.completedLessons.filter(lessonId => 
      lessonId.startsWith(course.id)
    ).length;
    return (completedLessons / course.totalLessons) * 100;
  };

  // Navigation
  const navigation = [
    { name: 'Dashboard', id: 'dashboard' as View },
    { name: 'Courses', id: 'courses' as View }
  ];

  if (currentView === 'lesson' && selectedCourse) {
    const lesson = selectedCourse.lessons[selectedLesson];
    return (
      <LessonPage
        course={selectedCourse}
        lesson={lesson}
        onBack={() => setCurrentView('courses')}
        onComplete={handleLessonComplete}
        onNext={handleNextLesson}
        hasNext={selectedLesson < selectedCourse.lessons.length - 1}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onSearch={setSearchQuery} />
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-12">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`border-b-2 transition-colors ${
                  currentView === item.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <Dashboard user={user} enrolledCourses={enrolledCourses} />
        )}

        {currentView === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
                <p className="text-gray-600 mt-2">Discover and enroll in courses to expand your knowledge</p>
              </div>
            </div>

            {searchQuery && (
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing results for "<span className="font-medium">{searchQuery}</span>"
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnroll}
                  onContinue={handleContinueCourse}
                  isEnrolled={user.enrolledCourses.includes(course.id)}
                  progress={getCourseProgress(course)}
                />
              ))}
            </div>

            {filteredCourses.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No courses found matching your search.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;