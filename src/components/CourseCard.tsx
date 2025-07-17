import React from 'react';
import { Clock, Star, Users, Play } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
  onContinue: (courseId: string) => void;
  isEnrolled: boolean;
  progress?: number;
}

export default function CourseCard({ course, onEnroll, onContinue, isEnrolled, progress = 0 }: CourseCardProps) {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[course.difficulty]}`}>
            {course.difficulty}
          </span>
        </div>
        {isEnrolled && (
          <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg">
            <Play className="h-4 w-4 text-blue-600" />
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Instructor: <span className="font-medium">{course.instructor}</span>
        </div>

        {isEnrolled && progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onClick={() => isEnrolled ? onContinue(course.id) : onEnroll(course.id)}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isEnrolled
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
          }`}
        >
          {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
}