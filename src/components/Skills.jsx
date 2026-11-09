const categories = [
  {
    category: 'Frontend Development',
    tag: 'CLIENT_SIDE',
    icon: 'fa-solid fa-code',
    skills: [
      { name: 'React.js', icon: 'fa-brands fa-react', color: '#61DAFB', level: 'Advanced' },
      { name: 'JavaScript ES6+', icon: 'fa-brands fa-js', color: '#F7DF1E', level: 'Advanced' },
      { name: 'Tailwind CSS', icon: 'fa-solid fa-wind', color: '#38BDF8', level: 'Proficient' },
      { name: 'HTML5 / CSS3', icon: 'fa-brands fa-html5', color: '#E34F26', level: 'Advanced' },
      { name: 'Responsive UI/UX', icon: 'fa-solid fa-mobile-screen', color: '#A855F7', level: 'Proficient' },
    ],
  },
  {
    category: 'Backend & Databases',
    tag: 'SERVER_SIDE',
    icon: 'fa-solid fa-server',
    skills: [
      { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#68A063', level: 'Intermediate' },
      { name: 'PHP', icon: 'fa-brands fa-php', color: '#777BB4', level: 'Advanced' },
      { name: 'MySQL', icon: 'fa-solid fa-database', color: '#00758F', level: 'Proficient' },
      { name: 'RESTful APIs', icon: 'fa-solid fa-network-wired', color: '#34D399', level: 'Proficient' },
      { name: 'Authentication', icon: 'fa-solid fa-shield-halved', color: '#F59E0B', level: 'Intermediate' },
    ],
  },
  {
    category: 'Languages & Core',
    tag: 'CORE_SYNTAX',
    icon: 'fa-solid fa-terminal',
    skills: [
      { name: 'Python', icon: 'fa-brands fa-python', color: '#3776AB', level: 'Intermediate' },
      { name: 'JavaScript', icon: 'fa-brands fa-square-js', color: '#F7DF1E', level: 'Advanced' },
      { name: 'PHP', icon: 'fa-solid fa-file-code', color: '#8892BF', level: 'Advanced' },
      { name: 'SQL', icon: 'fa-solid fa-table-cells', color: '#00BCF2', level: 'Proficient' },
    ],
  },
  {
    category: 'Video & Motion Design',
    tag: 'CREATIVE_SUITE',
    icon: 'fa-solid fa-film',
    skills: [
      { name: 'Premiere Pro', icon: 'fa-solid fa-film', color: '#9999FF', level: 'Advanced' },
      { name: 'CapCut Studio', icon: 'fa-solid fa-wand-magic-sparkles', color: '#00E5FF', level: 'Expert' },
      { name: 'Color Grading', icon: 'fa-solid fa-sliders', color: '#FB923C', level: 'Advanced' },
      { name: 'Motion Graphics', icon: 'fa-solid fa-scissors', color: '#F43F5E', level: 'Advanced' },
    ],
  },
  {
    category: 'Workflow & Tooling',
    tag: 'DEV_OPS',
    icon: 'fa-solid fa-wrench',
    skills: [
      { name: 'Git & GitHub', icon: 'fa-brands fa-github', color: '#F05032', level: 'Advanced' },
      { name: 'Vite / npm', icon: 'fa-solid fa-bolt', color: '#646CFF', level: 'Advanced' },
      { name: 'Vercel Deploy', icon: 'fa-solid fa-triangle-circle-square', color: '#FFFFFF', level: 'Proficient' },
      { name: 'Figma Design', icon: 'fa-brands fa-figma', color: '#F24E1E', level: 'Proficient' },
    ],
  },
]

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        {/* Header */}
        <div className="skills-top">
          <div>
            <div className="section-label">
              <span className="label-line" />
              <span>Technical Arsenal</span>
            </div>
            <h2 className="section-title">
              Skills &amp; <span className="text-gradient">Loadout</span>
            </h2>
          </div>
          <p className="skills-intro">
            A comprehensive stack of programming languages, frameworks, database architectures, and cinematic post-production tools.
          </p>
        </div>

        {/* Loadout Grid */}
        <div className="skills-grid reveal-up">
          {categories.map((cat, i) => (
            <div className="skill-cat-card" key={i}>
              <div className="skill-cat-header">
                <div className="skill-cat-title-wrap">
                  <span className="skill-cat-icon">
                    <i className={cat.icon} />
                  </span>
                  <h3 className="skill-cat-name">{cat.category}</h3>
                </div>
                <span className="skill-cat-tag">{cat.tag}</span>
              </div>

              <div className="skill-pills-wrap">
                {cat.skills.map((s, idx) => (
                  <div className="skill-item" key={idx}>
                    <span className="skill-item-icon" style={{ color: s.color }}>
                      <i className={s.icon} />
                    </span>
                    <span className="skill-item-name">{s.name}</span>
                    <span className="skill-item-lvl">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
