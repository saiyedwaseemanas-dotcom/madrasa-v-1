export type ScreenType = 'home' | 'live-classes' | 'recorded-library' | 'live-classroom' | 'my-account';

export interface SubjectItem {
  id: string;
  name: string;
  icon: string;
  colorClass: string;
  bgClass: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  subject: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  isVerified: boolean;
}

export interface LiveSession {
  id: string;
  title: string;
  subject: string;
  grade: string;
  term: string;
  time: string;
  duration: string;
  teacher: Teacher;
  status: 'completed' | 'live' | 'upcoming';
  studentCount: number;
  hasRecording?: boolean;
  notesPdf?: boolean;
  roomNumber?: string;
  countdownSeconds?: number;
}

export interface ContinueWatchingItem {
  id: string;
  title: string;
  subject: string;
  unit: string;
  duration: string;
  remainingMinutes: number;
  progressPercent: number;
  thumbnailUrl: string;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderInitials: string;
  isTeacher?: boolean;
  isSelf?: boolean;
  time: string;
  text: string;
}

export interface VideoChapter {
  id: string;
  title: string;
  timeDisplay: string;
  seconds: number;
}

export interface LessonItem {
  id: string;
  number: number;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  remainingText?: string;
  progressPercent?: number;
}

export interface QAComment {
  id: string;
  studentName: string;
  studentInitials: string;
  timestamp: string;
  ago: string;
  question: string;
  teacherReply?: {
    teacherName: string;
    text: string;
  };
}
