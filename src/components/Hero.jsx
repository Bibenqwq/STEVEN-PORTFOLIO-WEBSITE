import LanyardIdBadge from './LanyardIdBadge'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Soft ambient backlight */}
      <div className="hero-glow-blob" />

      <div className="container hero-container">
        {/* ── LEFT COLUMN: Software & Web Development Focus ── */}
        <div className="hero-content reveal-up">
          <div className="hero-titles">
            <span className="hero-pretitle">Hello! I'm Steven</span>
            <h1 className="hero-main-title">
              WEB <span className="hero-accent-text">DEVELOPER</span>
            </h1>
            <h2 className="hero-sub-title">
              &amp; SOFTWARE <span className="hero-outline-text">DEVELOPER</span>
            </h2>
          </div>

          <p className="hero-description">
            Building high-performance web applications, scalable backend architectures, and responsive user experiences. BSIT student at Batangas State University.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <i className="fa-solid fa-arrow-down" />
            </a>
            <a
              href="/file/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <span>Download CV</span>
              <i className="fa-solid fa-arrow-up-right-from-square" />
            </a>
          </div>
        </div>

        {/* ── RIGHT COLUMN: 3D Lanyard ID Badge ── */}
        <div className="hero-lanyard-col">
          <LanyardIdBadge />
        </div>
      </div>
    </section>
  )
}
