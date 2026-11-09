export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">
              <span className="footer-logo-bracket">&lt;</span>
              STEVEN
              <span className="footer-logo-bracket">/&gt;</span>
            </span>
            <p className="footer-tagline">
              Software &amp; modern full-stack web development.
            </p>
          </div>

          <div className="footer-nav">
            <a href="#about" className="footer-nav-link">About</a>
            <a href="#skills" className="footer-nav-link">Skills</a>
            <a href="#projects" className="footer-nav-link">Projects</a>
            <a href="#resume" className="footer-nav-link">Contact</a>
            <a href="/file/Resume.pdf" target="_blank" rel="noopener noreferrer" className="footer-nav-link">Resume</a>
          </div>

          <div className="footer-socials">
            <a
              href="https://github.com/bibenqwq"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="GitHub Profile"
            >
              <i className="fa-brands fa-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/steven-patrix-esguerra-3abb22433/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="LinkedIn Profile"
            >
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a
              href="mailto:bibenesguerra25@gmail.com"
              className="footer-social-btn"
              aria-label="Send Email"
            >
              <i className="fa-solid fa-envelope" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Steven. Built with React &amp; Vite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
