import { SubjectItem, Teacher, LiveSession, ContinueWatchingItem, VideoChapter, LessonItem, QAComment, ChatMessage } from '../types';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1UPa3jPM7Lr0XjrM9nuDe-BU2zKiUV1cKBN0RmXKrdYKJ_KwFC3PF2DEC5O0TgZylQG-d-lRXIYYJtjYNigI0XDzapddWWn0MM0uP-dXvPbpfYdFC7b0qh8WXAlQcIFH_T2NhCkC7AQffdve-a7u04A9-oO2l7kN_9NF-XDUtoRrKiseU9aY7dD5kvyGCy4PJDvLT_x9Ml66bTi7EGkWSDzI_T-yOW-yeHMLDSbu5fW7yqBDLZT_H3jYEPC';

export const STUDENT_PROFILE = {
  name: 'أحمد القحطاني',
  grade: 'الصف الثالث الثانوي',
  track: 'المسار العلمي',
  badge: 'مستواك متقدم ⭐',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTrnkyZ28ovHuLmOpFwIDNIb3kFN_X5nHAU3kFxrEmxvGbVo4UI6GUyAPs4EjCiFlEZlw9_eDO3wOj0iUUsleQv01VRoB0qObaAWhX0XjluetVSLJvNHkH4Z67JbUqlvKCwO3oge284JOR_8YzcQ8A7IJwAHEJtKm_HmAaknPXIx7TW0qqD7yxQ7Fsr8J7X1wvvNM7kJSSX50ib4SQLAPRnQr0PcyQvvCWN5KpoexcFfDcUKdQVKduQA',
  completedClasses: 28,
  watchHours: 34,
  passedQuizzes: 18,
  attendanceRate: '96%',
};

export const TEACHERS: Record<string, Teacher> = {
  fahad: {
    id: 'fahad',
    name: 'أ. فهد السعيد',
    title: 'معلم مادة الرياضيات',
    subject: 'الرياضيات',
    experience: '١٢ عام خبرة',
    rating: 4.9,
    reviewsCount: 1240,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtCJWhu-nU_mpfAciXDEP2qNL5O_ZwyoHF7e58854MfT6-7LZ5-S8jF07MbNRzxxT12NmovtvnnjvdK-PnV00cXgZR924SiY9A8XxevU4n0x0nV7_z4U7AtwKtDP6e7LT3wXTX6e9KSft3DF-CLsFdH1yAVcb1N2ZXVXewQbYYtAj6addbwqMUL8gBNsjFs0m6x0zumSot6sXqtqxGIFvB90ntAZZ21Ksutnn7S567Hk7kvsgHYUmbBQ',
    isVerified: true,
  },
  omar: {
    id: 'omar',
    name: 'د. عمر المهندس',
    title: 'كبير معلمي مادة الفيزياء',
    subject: 'الفيزياء',
    experience: '١٤ عام خبرة',
    rating: 4.95,
    reviewsCount: 1890,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTVEUJbaZ_L1tw7v8iRT8WCwWftLJNhUIFdIQqOwzMT2ZnzrNpVa5i4lYosVL158AaX44PMbdXxxFVk0cGC249-ZEjnki5QeJPMD-m3dVSXawHl7mEzrX_AmVX2alHKnl3u68_rMztzza715TYQl3idKNpnVPeoe7R65ZaCyqUZfc0IU290cPYCcDQUM-0Q2qHs4lfa5eswoNkzM9UZ_81YSZM3kzQls3PBiWBb6zH61CAH3E597Snwg',
    isVerified: true,
  },
  mona: {
    id: 'mona',
    name: 'أ. منى الزهراني',
    title: 'معلمة الكيمياء المعتمدة',
    subject: 'الكيمياء',
    experience: '٩ أعوام خبرة',
    rating: 4.8,
    reviewsCount: 840,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYiDrPjYZCCQpH9AhMfXp_tdJjTFHp7hP2-fNPJa9IrJMin_8lbCa_XH9An2yKMJ3bkQqz7i3A_CB2XFE82vcPQF-TRWuKnhvVB1iF9g1K8Y_EfFbAhHscZgwNTrjgU8pvE4tNpNVvaemSvF6KY6KUZxvDkwpt7wRps5NfCUV1VejZTmGsfEfYqVLrtf8_-k0P_A3otjXOBj-eLr4yFCd_GoAeI6rkUdjvc9F1iOCO5BF7jzRBiAAfDA',
    isVerified: true,
  },
  david: {
    id: 'david',
    name: 'Mr. David Al-Khatib',
    title: 'Senior English Educator',
    subject: 'اللغة الإنجليزية',
    experience: '١١ عام خبرة',
    rating: 4.9,
    reviewsCount: 950,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATbIBwcKjHp3G7vPSf8EVZdAY31S_99IHfUjL9Ynyqgs9SKZp6zNKL9eECMpTomxthy7VcD0wTPrkkSezAtJLYx__SQWOiKarWOmVFNdK_3JEv3adEhlGLp8C6n383Uy2q1crU4wY7bIhmnM9S1LgSVxdzSnCDq1QuVX63T3YGvA0NCKDSMcxUVdHxUTvhXc28mW3nAwumvVjOYNP_0ZLlldb4xTWOnuBFb52EA9Lht6WALCU_qNe0Aw',
    isVerified: true,
  },
  saeed: {
    id: 'saeed',
    name: 'د. سعيد القحطاني',
    title: 'أستاذ البلاغة والنقد',
    subject: 'اللغة العربية',
    experience: '١٦ عام خبرة',
    rating: 4.92,
    reviewsCount: 1420,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABcuDxw5zS1B2_IjdNZwWFqBxoUWwV1udM2mGsqs_5jQVUUqaqXUz-gcG8s3IfM5QpmJNaw0rqa2S7xEf-ByzQ45nO5rnfrhlymgCiOc89WKKMRQNR0VtlpHWwCCQYJm5Z5Jm7vg_JXYCtJsx9B5zSCJmHBRFHmFBK5serKnuXEaTWGdXf1TNfKZ2Ozn9HGnpXd6izee8Z93euW7xB62h6yjT6OWcWP78vcbjjRl3f38I6s7WmxIqzdw',
    isVerified: true,
  }
};

export const SUBJECTS: SubjectItem[] = [
  { id: 'math', name: 'رياضيات', icon: 'calculate', colorClass: 'text-primary', bgClass: 'bg-surface-container-high' },
  { id: 'physics', name: 'فيزياء', icon: 'cyclone', colorClass: 'text-tertiary', bgClass: 'bg-tertiary-fixed' },
  { id: 'chemistry', name: 'كيمياء', icon: 'science', colorClass: 'text-secondary', bgClass: 'bg-secondary-fixed' },
  { id: 'arabic', name: 'لغة عربية', icon: 'history_edu', colorClass: 'text-primary', bgClass: 'bg-surface-container-high' },
  { id: 'english', name: 'إنجليزي', icon: 'translate', colorClass: 'text-on-secondary-container', bgClass: 'bg-secondary-container' },
  { id: 'biology', name: 'أحياء', icon: 'psychology_alt', colorClass: 'text-primary', bgClass: 'bg-primary-fixed' },
];

export const TODAY_SCHEDULE: LiveSession[] = [
  {
    id: 's1',
    title: 'الكيمياء العامة: الروابط الجزيئية',
    subject: 'الكيمياء',
    grade: 'الصف الثالث الثانوي',
    term: 'الفصل الدراسي الثاني',
    time: '٤:٠٠ م',
    duration: '٤٥ دقيقة',
    teacher: {
      ...TEACHERS.mona,
      name: 'أ. خالد السالم',
      title: 'معلم كيمياء',
    },
    status: 'completed',
    studentCount: 312,
    hasRecording: true,
  },
  {
    id: 's2',
    title: 'الفيزياء التطبيقية: الديناميكا الحرارية والقوى',
    subject: 'الفيزياء',
    grade: 'الصف الثالث الثانوي',
    term: 'الفصل الدراسي الثاني',
    time: '٦:٠٠ م - الآن',
    duration: '٥٠ دقيقة',
    teacher: TEACHERS.omar,
    status: 'live',
    studentCount: 298,
    roomNumber: 'قاعة افتراضية رقم ٤',
  },
  {
    id: 's3',
    title: 'اللغة العربية: مراجعة شاملة للبلاغة والاستعارة',
    subject: 'اللغة العربية',
    grade: 'الصف الثالث الثانوي',
    term: 'الفصل الدراسي الثاني',
    time: '٨:٣٠ م',
    duration: 'ساعة ونصف',
    teacher: TEACHERS.saeed,
    status: 'upcoming',
    studentCount: 190,
    notesPdf: true,
  },
];

export const UPCOMING_CLASSES_HOME = [
  {
    id: 'live-math-stream',
    title: 'الميكانيكا الكلاسيكية وتطبيقات قوانين نيوتن',
    subject: 'الفيزياء',
    subjectId: 'physics',
    teacher: TEACHERS.omar,
    studentCount: 184,
    countdownSeconds: 14 * 60 + 29,
    accentBorder: 'bg-tertiary-container',
  },
  {
    id: 'chem-upcoming',
    title: 'الكيمياء العضوية: تفاعلات الألكينات والألكانات',
    subject: 'الكيمياء',
    subjectId: 'chemistry',
    teacher: TEACHERS.mona,
    seatsRemaining: '٤٥ مقعد متبقي',
    timeLabel: 'اليوم ٦:٣٠ م',
    accentBorder: 'bg-primary-container',
  },
  {
    id: 'eng-upcoming',
    title: 'Grammar Mastery: Conditional Sentences & Tenses',
    subject: 'اللغة الإنجليزية',
    subjectId: 'english',
    teacher: TEACHERS.david,
    seatsRemaining: 'شامل المذكرة التفاعلية',
    timeLabel: 'غداً ٤:٠٠ م',
    accentBorder: 'bg-secondary',
  }
];

export const CONTINUE_WATCHING_LIST: ContinueWatchingItem[] = [
  {
    id: 'bio-watch',
    title: 'الانقسام المنصف والخلايا الجذعية',
    subject: 'الأحياء',
    unit: 'الفصل الثاني',
    duration: '42:10',
    remainingMinutes: 12,
    progressPercent: 70,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkCsApUqsKTI6HpCqNWGE3YYlH6ZHSCLkkyhhxOnSEEJkLAHxqgoL2VWFs_KnC4M36bmBZkSnVjqzPyxLCDfLnzViVCvAy2cmp-Bcv7LZyx6vAPHYOur7AxS-gEgovWGpOTlZEvV4wfUwpRsqOr6rdbfNfb9k2I0Y__S1t_s4U5HB_aQREwupzyGUoDk6hiGSlPlckkXkVky3oQrhbnsdwOHpqxFbA8uo8_Hf0WvbjM8QaT2cIMyoaAg',
  },
  {
    id: 'arb-watch',
    title: 'النحو والبلاغة: المفعول المطلق وأنواعه',
    subject: 'اللغة العربية',
    unit: 'القواعد',
    duration: '35:00',
    remainingMinutes: 22,
    progressPercent: 35,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_s1af8AnsljoZtNn56uhSbQZYIArTDdY40Y9lxb6uZWKSH7OCrPET6Gl604goQwSslOCoRCC1P96pHu4DCWDU6EitJ2reS2ydh7S3zQaJ8bZ9mRxyxD0vsNvn0o8ao2N7rkX-blBw0nzl9MbDpVARfhxlbOIBiRvkec59KAw73eNcINKq_smQ8r5O9f1GxzeoZwdXQyzwB5lq_rB_1NtJdVeS7QnSVbO__FI7Iunh_4T8NzOWnlZYxg',
  },
];

export const KEPLER_LESSON_DATA = {
  title: 'الفصل الثالث: قوانين كبلر وحركة الكواكب في الفيزياء الفلكية',
  category: 'الفيزياء الفلكية',
  grade: 'الصف الثالث الثانوي - المسار العلمي',
  coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJdCzeQG20bO_dbL-KwqCfl2vsGVPmPGLg8z-aOHUfuEvbV-Q-bw3WIf1D_r6l06wP3nDvOlsObtpFR7-3Us3qfT9RJ7PhAHs7RQzT2d-REaN-ilmdNryuLW6NaCRX372MriYS3PDAXneNsDvFya-E0mi_sN9fItD7B8mbungT0Ueqf35ZJLMNVReTIUY0ur96CRQciBAiaIVT8q5CpdA_Ab4YwihOYkAIXwFLmRgiqBPKmCqWdO6ixw',
  pdfCoverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDznN1BHwU881_zsQ9THP0Lc6EHFJfV7AyNGBH0i49M_XvJUaKzvFV6Ay42O7-pT4snUiQs4FV0XyLmS7f5ghTgr47sK-83ZFt8DScrUky76GBC3TRtv-Hle7BWmqZgl7Rjmupw6jlGkzlNPB6yahblcDjyx3ika2ZC3jVYroFw17fyrMwlqk5B96kl_MdD0_aaXiZItVZPANbEgEFFcdJvYJ5RryvI5Y41N06r4ejzeMcdPyCgwktcrw',
  teacher: TEACHERS.omar,
  durationTotal: '45:10',
  totalSeconds: 45 * 60 + 10,
  initialSeconds: 18 * 60 + 40,
  description: 'شرح تحليلي مفصل لقانون كبلر الأول (المدارات الإهليلجية)، القانون الثاني (تساوي المساحات وسرعة الكوكب في الحضيض والأوج)، والعلاقة الرياضية للقانون الثالث مع أمثلة من اختبارات الأعوام السابقة.',
  chapters: [
    { id: 'c1', title: '1. مدخل إلى مدارات كبلر والقطع الناقص', timeDisplay: '00:00', seconds: 0 },
    { id: 'c2', title: '2. إثبات قانون كبلر الثاني للسرعات المدارية', timeDisplay: '18:40', seconds: 18 * 60 + 40 },
    { id: 'c3', title: '3. تطبيقات حسابية ونسب القوانين الكونية', timeDisplay: '33:15', seconds: 33 * 60 + 15 },
  ] as VideoChapter[],
  playlist: [
    {
      id: 'l1',
      number: 1,
      title: '1. المقدمة والجاذبية الكونية',
      duration: '32 دقيقة',
      status: 'completed',
    },
    {
      id: 'l2',
      number: 2,
      title: '2. قوانين كبلر الثلاثة وتطبيقاتها',
      duration: '45 دقيقة',
      status: 'current',
      remainingText: 'متبقي 26 دقيقة (41%)',
      progressPercent: 41,
    },
    {
      id: 'l3',
      number: 3,
      title: '3. حل مسائل وتدريبات وزارية نموذجية',
      duration: '28 دقيقة',
      status: 'locked',
      remainingText: 'مقفل حتى إنهاء الدرس الحالي 🔒',
    },
  ] as LessonItem[],
  qaList: [
    {
      id: 'q1',
      studentName: 'سارة التميمي',
      studentInitials: 'س',
      timestamp: 'عند 21:15',
      ago: 'منذ 3 ساعات',
      question: 'يا دكتور، هل يختلف الثابت K في قانون كبلر الثالث إذا كان الكوكب يدور حول نجم غير شمسنا؟',
      teacherReply: {
        teacherName: 'د. عمر المهندس',
        text: 'نعم بالتأكيد يا سارة! ثابت التناسب يعتمد على كتلة النجم المركزي الحاكم للمدار (M). سنفصل ذلك في درس الجاذبية العامة.',
      },
    },
    {
      id: 'q2',
      studentName: 'فيصل الحربي',
      studentInitials: 'ف',
      timestamp: 'عند 07:30',
      ago: 'منذ 5 ساعات',
      question: 'أين تكون السرعة القصوى للكوكب في مداره الإهليلجي؟',
      teacherReply: {
        teacherName: 'د. عمر المهندس',
        text: 'تكون السرعة قصوى عند نقطة الحضيض (الأقرب للشمس) وأدنى عند نقطة الأوج بحسب قانون المساحات المتساوية.',
      },
    }
  ] as QAComment[],
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    senderName: 'أحمد القحطاني',
    senderInitials: 'أق',
    time: '١٠:٤١ ص',
    text: 'أستاذ هل هذه النظرية تأتي في الاختبار الوزاري؟',
  },
  {
    id: 'm2',
    senderName: 'أ. فهد السعيد',
    senderInitials: 'فس',
    isTeacher: true,
    time: '١٠:٤٢ ص',
    text: 'نعم يا أحمد، ركزوا على المثال الثالث صفحة ٤٢.',
  },
  {
    id: 'm3',
    senderName: 'سارة محمد',
    senderInitials: 'سم',
    time: '١٠:٤٣ ص',
    text: 'الشرح واضح جداً شكراً لك أستاذ! ✨',
  },
];
