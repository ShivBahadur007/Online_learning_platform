import { Course, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Student User',
  email: 'student@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  enrolledCourses: ['1', '2'],
  completedLessons: ['1-1', '1-2'],
  quizScores: {
    '1-1': 85,
    '1-2': 92
  }
};

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Master the basics of React development with hands-on projects and real-world examples.',
    instructor: 'Expert Instructor',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    duration: '8 hours',
    difficulty: 'Beginner',
    totalLessons: 12,
    rating: 4.8,
    students: 2847,
    lessons: [
      {
        id: '1-1',
        title: 'Introduction to React',
        description: 'Learn what React is and why it\'s popular for building user interfaces.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: '15:30',
        order: 1,
        quiz: {
          id: 'quiz-1-1',
          title: 'React Basics Quiz',
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question: 'What is React?',
              options: ['A JavaScript library', 'A programming language', 'A database', 'A web server'],
              correctAnswer: 0,
              explanation: 'React is a JavaScript library for building user interfaces.'
            },
            {
              id: 'q2',
              type: 'true-false',
              question: 'React was created by Facebook.',
              correctAnswer: 1,
              explanation: 'React was indeed created by Facebook (now Meta) and is maintained by them.'
            }
          ]
        }
      },
      {
        id: '1-2',
        title: 'JSX and Components',
        description: 'Understanding JSX syntax and creating your first React components.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        duration: '22:15',
        order: 2,
        quiz: {
          id: 'quiz-1-2',
          title: 'JSX and Components Quiz',
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question: 'What does JSX stand for?',
              options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
              correctAnswer: 0,
              explanation: 'JSX stands for JavaScript XML and allows you to write HTML-like syntax in JavaScript.'
            }
          ]
        }
      },
      {
        id: '1-3',
        title: 'Props and State',
        description: 'Learn how to pass data between components and manage component state.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        duration: '28:45',
        order: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Deep dive into advanced JavaScript concepts including async programming and ES6+ features.',
    instructor: 'Senior Developer',
    thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    duration: '12 hours',
    difficulty: 'Advanced',
    totalLessons: 15,
    rating: 4.9,
    students: 1823,
    lessons: [
      {
        id: '2-1',
        title: 'Async/Await and Promises',
        description: 'Master asynchronous JavaScript programming with modern syntax.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        duration: '35:20',
        order: 1
      }
    ]
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
    instructor: 'Backend Specialist',
    thumbnail: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    duration: '15 hours',
    difficulty: 'Intermediate',
    totalLessons: 18,
    rating: 4.7,
    students: 3291,
    lessons: []
  }
];