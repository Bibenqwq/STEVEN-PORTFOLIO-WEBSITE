const projects = [
  {
    id: 'projPlugNPlay',
    num: '01',
    title: 'PlugNPlayPC',
    category: 'E-Commerce & PC Builder Engine',
    desc: 'Intelligent PC configuration platform built with real-time component compatibility verification, automated wattage estimation, and seamless checkout workflow.',
    tags: ['React', 'Tailwind CSS', 'Vercel', 'JavaScript'],
    url: 'plugnplaypc.vercel.app',
    link: 'https://plugnplaypc.vercel.app/Main.html#',
    linkId: 'linkPlugNPlay',
    previewImg: '/img/plugnplay.png',
  },
  {
    id: 'projKuyaLukes',
    num: '02',
    title: 'KuyaLukesPlace',
    category: 'Resort & Hospitality ERP',
    desc: 'Full-stack enterprise management system for automated resort room bookings, customer records, calendar reservation scheduling, and administrative financial analytics.',
    tags: ['PHP', 'MySQL', 'Full-Stack', 'UI Dashboard'],
    url: 'test123-one-beige.vercel.app',
    link: 'https://test123-one-beige.vercel.app/',
    linkId: 'linkKuyaLukes',
    previewImg: '/img/kuyalukesplace.png',
  },
  {
    id: 'projPeakSociety',
    num: '03',
    title: 'Peak Society',
    category: 'Creator Network & Knowledge Hub',
    desc: 'Community platform built for digital creators and YouTube automation teams to exchange growth strategies, collaborative workflows, and content analytics.',
    tags: ['JavaScript', 'HTML5', 'CSS3 Architecture', 'Community'],
    url: 'peaksociety.vercel.app',
    link: 'https://peaksociety.vercel.app/',
    linkId: 'linkPeakSociety',
    previewImg: '/img/peak.png',
  },
  {
    id: 'projIphone17',
    num: '04',
    title: 'iPhone 17 Pro Max',
    category: 'Interactive 3D Motion Showcase',
    desc: 'High-fidelity conceptual showcase featuring precision scroll-driven product animations, dynamic material finish colorways, and interactive component explodes.',
    tags: ['Web Animation', 'JavaScript', 'UI/UX Interactive', 'Modern CSS'],
    url: 'iphone-17-pro-max-amber.vercel.app',
    link: 'https://iphone-17-pro-max-amber.vercel.app/',
    linkId: 'linkIphone17',
    previewImg: '/img/iphone17.png',
  },
  {
    id: 'projIzaDalwaTaklo',
    num: '05',
    title: 'iza.dalwa.taklo',
    category: 'Digital Literary Journal & Editorial App',
    desc: 'Interactive editorial journal and writing platform built with dual access modes (Tagabasa archive reader & password-gated Tagasulat editor), custom 9:16 Story generation, and responsive digital typography.',
    tags: ['React', 'JavaScript', 'CSS3 Architecture', 'Vercel'],
    url: 'izadalwatakliesz.vercel.app',
    link: 'https://izadalwatakliesz.vercel.app/',
    linkId: 'linkIzaDalwaTaklo',
    previewImg: '/img/izadalwa.jpg',
  },
]

export default function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        {/* Header */}
        <div className="pj-header">
          <div>
            <div className="section-label">
              <span className="label-line" />
              <span>Selected Deployments</span>
            </div>
            <h2 className="section-title">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <p className="pj-header-sub">
            Deployed systems, interactive web applications, and digital platforms built with a focus on usability and architecture.
          </p>
        </div>

        {/* Stacked Project Cards */}
        <div className="pj-grid">
          {projects.map((project) => (
            <article key={project.id} id={project.id} className="pj-card reveal-up">
              {/* Image Preview Side */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-card-media"
                aria-label={`Open ${project.title} live deployment`}
              >
                <img
                  src={project.previewImg}
                  alt={`${project.title} interface screenshot`}
                  className="pj-card-img"
                  loading="lazy"
                />
                <div className="pj-card-media-overlay">
                  <span className="pj-card-media-btn">
                    <span>Launch Live Site</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </span>
                </div>
              </a>

              {/* Project Body */}
              <div className="pj-card-body">
                <div className="pj-card-meta">
                  <span className="pj-card-num">#{project.num}</span>
                  <span className="pj-card-bullet">/</span>
                  <span className="pj-card-cat">{project.category}</span>
                </div>

                <h3 className="pj-card-title">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={project.linkId}
                    className="pj-card-title-link"
                  >
                    <span>{project.title}</span>
                    <i className="fa-solid fa-arrow-up-right-from-square pj-title-arrow" />
                  </a>
                </h3>

                <p className="pj-card-desc">{project.desc}</p>

                <div className="pj-card-footer">
                  <div className="pj-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pj-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pj-link-arrow"
                    title={`Open ${project.title}`}
                  >
                    <span>Visit Live</span>
                    <i className="fa-solid fa-chevron-right" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
