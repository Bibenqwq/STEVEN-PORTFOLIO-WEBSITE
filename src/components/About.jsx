export default function About() {
  const education = [
    {
      icon: 'fa-solid fa-graduation-cap',
      name: 'Batangas State University',
      sub: 'Bachelor of Science in Information Technology (BSIT)',
      period: 'Present',
      badge: 'CURRENT',
      highlight: false,
    },
    {
      icon: 'fa-solid fa-laptop-code',
      name: 'AICS Lipa',
      sub: 'Senior High School — ICT Strand',
      period: 'Graduated',
      badge: 'SHS',
      highlight: false,
    },
    {
      icon: 'fa-solid fa-school',
      name: 'Pangao Integrated School',
      sub: 'Junior High School',
      period: 'Completed',
      badge: 'JHS',
      highlight: false,
    },
  ]

  return (
    <section className="section about-section" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="section-label">
          <span className="label-line" />
          <span>About Me</span>
        </div>
        <h2 className="section-title">
          Building scalable web systems, <span className="text-gradient">solving real problems.</span>
        </h2>

        <div className="about-grid">
          {/* ── LEFT: Bio Narrative ── */}
          <div className="about-left reveal-up">
            <div className="about-card-narrative">
              <p className="about-lead">
                I'm a full-stack web and software developer based in <em>Batangas, Philippines</em>.
              </p>
              <p className="about-body">
                I specialize in developing modern web applications from responsive front-end user interfaces to secure, scalable backend architectures and databases. My priority is writing clean, maintainable code with solid architecture.
              </p>
              <p className="about-body">
                Currently pursuing a Bachelor of Science in Information Technology at Batangas State University, with a dedicated focus on software and full-stack web development.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Academic Background ── */}
          <div className="about-right reveal-up">
            <div className="about-edu-container">
              <div className="about-edu-head">
                <span className="about-edu-tag">EDUCATION</span>
                <h3 className="about-edu-heading">Academic Background</h3>
              </div>

              <div className="about-edu-list">
                {education.map((item, i) => (
                  <div
                    key={i}
                    className={`about-edu-item ${item.highlight ? 'is-award' : ''}`}
                  >
                    <div className="about-edu-icon-wrap">
                      <i className={item.icon} />
                    </div>
                    <div className="about-edu-body">
                      <div className="about-edu-meta">
                        <span className="about-edu-badge">{item.badge}</span>
                        <span className="about-edu-period">{item.period}</span>
                      </div>
                      <h4 className="about-edu-name">{item.name}</h4>
                      <p className="about-edu-sub">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
