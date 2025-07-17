import React from 'react';
import { TrendingUp, Clock, Trophy, Target, BookOpen, Users } from 'lucide-react';
import { User, Course } from '../types';

interface DashboardProps {
  user: User;
  enrolledCourses: Course[];
}

export default function Dashboard({ user, enrolledCourses }: DashboardProps) {
  const totalLessons = enrolledCourses.reduce((sum, course) => sum + course.totalLessons, 0);
  const completedLessons = user.completedLessons.length;
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const averageScore = Object.values(user.quizScores).length > 0 
    ? Object.values(user.quizScores).reduce((sum, score) => sum + score, 0) / Object.values(user.quizScores).length
    : 0;

  const stats = [
    {
      title: 'Courses Enrolled',
      value: enrolledCourses.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Lessons Completed',
      value: completedLessons,
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Overall Progress',
      value: `${Math.round(overallProgress)}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Average Score',
      value: `${Math.round(averageScore)}%`,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-blue-100 text-lg">Continue your learning journey and achieve your goals.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue Learning */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Continue Learning</h2>
          <div className="space-y-4">
            {enrolledCourses.slice(0, 3).map((course) => {
              const courseProgress = (user.completedLessons.filter(lessonId => 
                lessonId.startsWith(course.id)
              ).length / course.totalLessons) * 100;

              return (
                <div key={course.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${courseProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{Math.round(courseProgress)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Quiz Scores */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Quiz Scores</h2>
          <div className="space-y-4">
            {Object.entries(user.quizScores).slice(-5).map(([lessonId, score]) => (
              <div key={lessonId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Lesson Quiz</h3>
                  <p className="text-sm text-gray-600">Lesson ID: {lessonId}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                    {score}%
                  </div>
                  <div className={`text-xs ${score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                    {score >= 70 ? 'Passed' : 'Failed'}
                  </div>
                </div>
              </div>
            ))}
            
            {Object.keys(user.quizScores).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No quiz scores yet</p>
                <p className="text-sm">Complete lessons with quizzes to see your scores here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="font-medium text-gray-900">Browse Courses</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Clock className="h-6 w-6 text-green-600" />
            <span className="font-medium text-gray-900">View Schedule</span>
          </button>
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-6 w-6 text-purple-600" />
            <span className="font-medium text-gray-900">Join Community</span>
          </button>
        </div>
      </div>
    </div>
  );
}