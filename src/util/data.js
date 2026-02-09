const SKILLS = [
  {
    title: "Programming",
    icon: "./assets/images/img5.png",
    skills: [
      { skill: "CPP", percentage: "80%" },
      { skill: "JS", percentage: "70%" },
      { skill: "Core Java", percentage: "65%" },
      { skill: "Python", percentage: "50%" },
    ],
  },
  {
    title: "Frontend",
    icon: "./assets/images/img1.png",
    skills: [
      { skill: "HTML5", percentage: "80%" },
      { skill: "CSS3", percentage: "75%" },
      { skill: "React.js", percentage: "70%" },     
      { skill: "Bootstrap", percentage: "55%" },
    ],  
  },
  {
    title: "Backend",
    icon: "./assets/images/img2.png",
    skills: [
      { skill: "Node.js", percentage: "65%" },
      { skill: "Express.js", percentage: "55%" },
      
      { skill: "Next.js", percentage: "40%" },
    ],
  },
  {
    title: "Database",
    icon: "./assets/images/img3.png",
    skills: [
      { skill: "MySql", percentage: "70%" },
      { skill: "MongoDB", percentage: "65%" },
      { skill: "Oracle", percentage: "60%" },
      { skill: "PostgreSQL", percentage: "50%" },
    ],
  },
  {
    title: "Tools",
    icon: "./assets/images/img4.png",
    skills: [
      { skill: "Git & Github", percentage: "80%" },
      { skill: "Visual Studio Code", percentage: "75%" },
      { skill: "XAMPP", percentage: "55%" },
      { skill: "Eclipse", percentage: "35%" },
    ],
  },
  {
    title: "Utilities",
    icon: "./assets/images/img6.png",
    skills: [
      { skill: "Font Awesome", percentage: "85%" },
      { skill: "Material UI", percentage: "45%" },
      { skill: "ShadCN", percentage: "40%" },
      { skill: "Postman", percentage: "55%" }, 
    ],
  },
];

// util/skillUtils.js
const getSkillPrintStatement = (skillName) => {
  const printStatements = {
    'HTML5': '<h1>HTML5</h1>',
    'CSS3': '.css { content: "CSS3"; }',
    'JS': 'console.log("JavaScript");',
    'React.js': 'console.log(<React.js />);',
    'Node.js': 'console.log("Node.js");',
    'Express.js': 'app.get("/", () => "Express.js");',
    'MongoDB': 'db.collection.find({name: "MongoDB"})',
    'Oracle': 'SELECT * FROM Oracle;',
    'MySql': 'SELECT "MySQL" FROM database;',
    'Git & Github': 'git commit -m "Git & Github"',
    'Visual Studio Code': '// VS Code: Coding...',
    'Bootstrap': '<div class="bootstrap">Bootstrap</div>',
    'Eclipse': '// Eclipse IDE',
    'ShadCN': '<ShadCN>UI Component</ShadCN>',
    'Font Awesome': '<i class="fa">Font Awesome</i>',
    'Postman': 'GET /api/postman',
    'CPP': 'cout << "C++" << endl;',
    'Core Java': 'System.out.println("Core Java");',
    'Python': 'print("Python")',
    'Next.js': 'export default Next.js',
    'PostgreSQL': 'SELECT "PostgreSQL" FROM database;',
  };
  return printStatements[skillName] || `print("${skillName}")`;
};
 

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Student of the Year & BCA Topper",
    description: "Awarded 'Student of the Year' and secured the Top position in BCA.",
    icon: "🏆🥇",
    category: "Academic",
  year: "2024"
},
  {
    id: 2,
    title: "Academic Excellence",
    description: "Maintained 8.68 CGPA in Master of Computer Applications",
    icon: "🎓",
    category: "Academic",
    year: "2025"
  },
  {
    id: 3,
    title: "Full Stack Mastery",
    description: "Proficient in MERN stack development with 10+ projects completed",
    icon: "💻",
    category: "Technical",
    year: "2024"
  },
  {
    id: 4,
    title: "Problem Solver",
    description: "Solved 100+ coding challenges on various platforms",
    icon: "🧩",
    category: "Programming",
    year: "Current"
  },
 
];

const EDUCATION = [
  {
    id: 1,
    degree: "Master of Computer Applications",
    institution: "P.E.S's Modern College of Engineering",
    location: "Pune",
    duration: "2024-2026",
    grade: "CGPA: 8.68 (FYMCA)",
    status: "current",
    description: "Specializing in advanced software development and emerging technologies"
  },
  {
    id: 2,
    degree: "Bachelor of Computer Applications",
    institution: "G.S.G. College",
    location: "Umarkhed",
    duration: "2021-2024",
    grade: "72.60%",
    status: "completed",
    description: "Foundation in computer science with focus on programming and web development"
  },
  {
    id: 3,
    degree: "Higher Secondary Certificate",
    institution: "G.S.G. Junior College",
    location: "Umarkhed",
    duration: "2020-2021",
    grade: "93.67%",
    status: "completed",
    description: "Science stream with Mathematics and Computer Science"
  },
  {
    id: 4,
    degree: "Secondary School Certificate",
    institution: "MJPV School",
    location: "Umarkhed",
    duration: "2018-2019",
    grade: "84.20%",
    status: "completed",
    description: "Strong foundation in mathematics and sciences"
  }
];

export { SKILLS, ACHIEVEMENTS, EDUCATION , getSkillPrintStatement}; 
 