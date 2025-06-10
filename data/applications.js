// Applications Data - Mock applications for the gallery
const applicationsData = {
    categories: [
        'All',
        'Assessment',
        'Classroom Management',
        'Communication',
        'Engineering',
        'Intervention',
        'IT Management',
        'Language',
        'Math',
        'Reading',
        'Science',
        'Social Studies',
        'Typing',
        'Other'
    ],
    
    chips: [
        'All Chips',
        'RK1126',
        'AX620',
        'Jetson Nano',
        'Jetson Xavier',
        'Raspberry Pi 4',
        'Intel NUC',
        'NVIDIA Orin',
        'Amlogic A311D',
        'Qualcomm QCS410',
        'MediaTek MT8183',
        'Rockchip RK3588'
    ],
    
    applications: [
        // Math Applications
        {
            id: 1,
            name: 'MathGenius Pro',
            company: 'EduTech Solutions',
            icon: '🔢',
            description: 'Advanced mathematics learning platform with AI-powered problem solving and step-by-step explanations for all grade levels.',
            categories: ['Math', 'Assessment'],
            chip: 'Jetson Xavier',
            featured: true
        },
        {
            id: 2,
            name: 'AlgebraVision',
            company: 'Learning Labs',
            icon: '📐',
            description: 'Interactive algebra learning with visual representations and real-time feedback for complex mathematical concepts.',
            categories: ['Math'],
            chip: 'RK1126',
            featured: false
        },
        {
            id: 3,
            name: 'Statistics Studio',
            company: 'DataEd Inc',
            icon: '📊',
            description: 'Comprehensive statistics and data analysis tool designed for high school and college-level mathematics courses.',
            categories: ['Math', 'Science'],
            chip: 'AX620',
            featured: true
        },
        
        // Science Applications
        {
            id: 4,
            name: 'ChemLab Virtual',
            company: 'ScienceWorks',
            icon: '🧪',
            description: 'Virtual chemistry laboratory with 3D molecular modeling and safe experiment simulations for all chemistry levels.',
            categories: ['Science'],
            chip: 'Jetson Nano',
            featured: true
        },
        {
            id: 5,
            name: 'Physics Playground',
            company: 'Newton Digital',
            icon: '⚛️',
            description: 'Interactive physics simulations covering mechanics, thermodynamics, and quantum physics concepts.',
            categories: ['Science', 'Engineering'],
            chip: 'NVIDIA Orin',
            featured: false
        },
        {
            id: 6,
            name: 'BiologyScope',
            company: 'Life Sciences Tech',
            icon: '🔬',
            description: 'Comprehensive biology learning platform with virtual dissections and microscopy simulations.',
            categories: ['Science'],
            chip: 'Raspberry Pi 4',
            featured: false
        },
        
        // Language Applications
        {
            id: 7,
            name: 'LinguaLearn AI',
            company: 'Global Languages',
            icon: '🗣️',
            description: 'AI-powered language learning with speech recognition, conversation practice, and personalized curriculum.',
            categories: ['Language', 'Communication'],
            chip: 'Intel NUC',
            featured: true
        },
        {
            id: 8,
            name: 'Grammar Guardian',
            company: 'WriteTech',
            icon: '✏️',
            description: 'Advanced grammar checking and writing assistance with style suggestions and plagiarism detection.',
            categories: ['Language', 'Other'],
            chip: 'Amlogic A311D',
            featured: false
        },
        {
            id: 9,
            name: 'Vocabulary Builder Pro',
            company: 'WordWise',
            icon: '📚',
            description: 'Adaptive vocabulary building with spaced repetition, contextual learning, and progress tracking.',
            categories: ['Language', 'Assessment'],
            chip: 'Qualcomm QCS410',
            featured: false
        },
        
        // Reading Applications
        {
            id: 10,
            name: 'ReadingSense',
            company: 'Literacy First',
            icon: '📖',
            description: 'Comprehensive reading comprehension platform with leveled texts and interactive assessments.',
            categories: ['Reading', 'Assessment'],
            chip: 'MediaTek MT8183',
            featured: true
        },
        {
            id: 11,
            name: 'StoryBuilder',
            company: 'Creative Education',
            icon: '✍️',
            description: 'Interactive storytelling and creative writing platform with multimedia integration and peer collaboration.',
            categories: ['Reading', 'Language'],
            chip: 'Rockchip RK3588',
            featured: false
        },
        
        // Classroom Management
        {
            id: 12,
            name: 'ClassControl Hub',
            company: 'EduManage',
            icon: '👨‍🏫',
            description: 'Complete classroom management solution with attendance tracking, behavior monitoring, and parent communication.',
            categories: ['Classroom Management', 'Communication'],
            chip: 'RK1126',
            featured: true
        },
        {
            id: 13,
            name: 'StudentTracker',
            company: 'SchoolTech',
            icon: '📋',
            description: 'Student progress tracking and analytics platform with customizable dashboards and reporting tools.',
            categories: ['Classroom Management', 'Assessment'],
            chip: 'AX620',
            featured: false
        },
        {
            id: 14,
            name: 'Assignment Organizer',
            company: 'TaskMaster',
            icon: '📝',
            description: 'Digital assignment distribution and collection system with automated grading and feedback features.',
            categories: ['Classroom Management', 'Assessment'],
            chip: 'Jetson Xavier',
            featured: false
        },
        
        // Assessment Applications
        {
            id: 15,
            name: 'QuizMaster Pro',
            company: 'Assessment Solutions',
            icon: '🎯',
            description: 'Advanced quiz and test creation platform with adaptive questioning and detailed analytics.',
            categories: ['Assessment'],
            chip: 'Jetson Nano',
            featured: true
        },
        {
            id: 16,
            name: 'Portfolio Builder',
            company: 'Student Showcase',
            icon: '🗂️',
            description: 'Digital portfolio platform for students to showcase their work and track learning progress over time.',
            categories: ['Assessment', 'Other'],
            chip: 'Raspberry Pi 4',
            featured: false
        },
        
        // Social Studies
        {
            id: 17,
            name: 'History Explorer',
            company: 'TimeTravel Ed',
            icon: '🏛️',
            description: 'Interactive historical timeline and virtual museum experiences for immersive history learning.',
            categories: ['Social Studies'],
            chip: 'Intel NUC',
            featured: true
        },
        {
            id: 18,
            name: 'Geography Master',
            company: 'WorldView',
            icon: '🌍',
            description: 'Interactive world geography with satellite imagery, cultural exploration, and mapping activities.',
            categories: ['Social Studies', 'Science'],
            chip: 'NVIDIA Orin',
            featured: false
        },
        
        // Communication
        {
            id: 19,
            name: 'ClassChat Secure',
            company: 'SafeCommunications',
            icon: '💬',
            description: 'Secure classroom communication platform with moderated discussions and parent notifications.',
            categories: ['Communication', 'Classroom Management'],
            chip: 'Amlogic A311D',
            featured: false
        },
        {
            id: 20,
            name: 'VideoConference Edu',
            company: 'ConnectED',
            icon: '📹',
            description: 'Educational video conferencing with screen sharing, breakout rooms, and recording capabilities.',
            categories: ['Communication'],
            chip: 'Qualcomm QCS410',
            featured: true
        },
        
        // IT Management
        {
            id: 21,
            name: 'DeviceManager',
            company: 'TechOps',
            icon: '💻',
            description: 'Comprehensive device management for educational institutions with remote monitoring and updates.',
            categories: ['IT Management'],
            chip: 'MediaTek MT8183',
            featured: false
        },
        {
            id: 22,
            name: 'NetworkGuard',
            company: 'CyberSafe',
            icon: '🛡️',
            description: 'Network security and content filtering specifically designed for educational environments.',
            categories: ['IT Management'],
            chip: 'Rockchip RK3588',
            featured: false
        },
        
        // Typing
        {
            id: 23,
            name: 'TypeMaster Academy',
            company: 'KeyboardSkills',
            icon: '⌨️',
            description: 'Comprehensive typing instruction with games, exercises, and progress tracking for all skill levels.',
            categories: ['Typing'],
            chip: 'RK1126',
            featured: false
        },
        {
            id: 24,
            name: 'Speed Typing Challenge',
            company: 'FastFingers',
            icon: '⚡',
            description: 'Gamified typing practice with competitions, achievements, and real-time performance analytics.',
            categories: ['Typing', 'Other'],
            chip: 'AX620',
            featured: false
        },
        
        // Engineering
        {
            id: 25,
            name: 'CAD Academy',
            company: 'DesignTech',
            icon: '🔧',
            description: 'Computer-aided design learning platform with 3D modeling tools and engineering project templates.',
            categories: ['Engineering', 'Science'],
            chip: 'Jetson Xavier',
            featured: true
        },
        {
            id: 26,
            name: 'Robotics Simulator',
            company: 'RoboEd',
            icon: '🤖',
            description: 'Virtual robotics programming environment with drag-and-drop coding and physics simulation.',
            categories: ['Engineering', 'Science'],
            chip: 'Jetson Nano',
            featured: false
        },
        
        // Intervention
        {
            id: 27,
            name: 'Learning Support AI',
            company: 'SpecialEd Solutions',
            icon: '🎓',
            description: 'AI-powered learning intervention platform with personalized support for students with diverse needs.',
            categories: ['Intervention', 'Assessment'],
            chip: 'Raspberry Pi 4',
            featured: true
        },
        {
            id: 28,
            name: 'Reading Recovery',
            company: 'Literacy Support',
            icon: '📘',
            description: 'Specialized reading intervention program with diagnostic assessments and targeted instruction.',
            categories: ['Intervention', 'Reading'],
            chip: 'Intel NUC',
            featured: false
        },
        
        // Other Applications
        {
            id: 29,
            name: 'Art Studio Digital',
            company: 'Creative Arts',
            icon: '🎨',
            description: 'Digital art creation platform with drawing tools, animation features, and portfolio sharing.',
            categories: ['Other'],
            chip: 'NVIDIA Orin',
            featured: false
        },
        {
            id: 30,
            name: 'Music Composer',
            company: 'SoundEducation',
            icon: '🎵',
            description: 'Music composition and theory learning platform with virtual instruments and collaboration tools.',
            categories: ['Other'],
            chip: 'Amlogic A311D',
            featured: false
        },
        {
            id: 31,
            name: 'Mindfulness for Students',
            company: 'WellnessEd',
            icon: '🧘',
            description: 'Student wellness platform with guided meditation, stress management, and emotional learning resources.',
            categories: ['Other'],
            chip: 'Qualcomm QCS410',
            featured: false
        },
        {
            id: 32,
            name: 'Career Explorer',
            company: 'FuturePathways',
            icon: '💼',
            description: 'Career exploration platform with job simulations, skills assessments, and industry insights.',
            categories: ['Other', 'Assessment'],
            chip: 'MediaTek MT8183',
            featured: true
        }
    ]
};

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = applicationsData;
} else if (typeof window !== 'undefined') {
    window.applicationsData = applicationsData;
} 