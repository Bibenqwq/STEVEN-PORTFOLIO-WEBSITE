export default function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const toggle = () => setMobileMenuOpen(o => !o)
  const close  = () => setMobileMenuOpen(false)

  return (
    <>
      <nav className="nav" id="nav">
        {/* Brand Logo */}
        <a href="#hero" className="nav-logo" onClick={close} aria-label="Steven Home">
          <span className="nav-logo-mark">&lt;/&gt;</span>
          <span className="nav-logo-text">STEVEN<span className="dot">.</span></span>
        </a>

        {/* Center Nav Links */}
        <ul className="nav-links">
          <li><a href="#about"    className="nav-link" onClick={close}>About</a></li>
          <li><a href="#skills"   className="nav-link" onClick={close}>Skills</a></li>
          <li><a href="#projects" className="nav-link" onClick={close}>Projects</a></li>
          <li><a href="#resume"   className="nav-link" onClick={close}>Contact</a></li>
        </ul>

        {/* Right CTA cluster */}
        <div className="nav-right">
          <a
            href="/file/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume-link"
            id="navResumeLink"
          >
            <span>Resume</span>
            <i className="fa-solid fa-arrow-up-right-from-square" />
          </a>

          {/* Mobile hamburger */}
          <button
            className={`nav-menu-btn${mobileMenuOpen ? ' open' : ''}`}
            id="menuBtn"
            aria-label="Toggle menu"
            onClick={toggle}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`} id="mobileMenu">
        <ul className="mobile-menu-links">
          <li><a href="#about"    className="mobile-link" onClick={close}>About</a></li>
          <li><a href="#skills"   className="mobile-link" onClick={close}>Skills</a></li>
          <li><a href="#projects" className="mobile-link" onClick={close}>Projects</a></li>
          <li><a href="#resume"   className="mobile-link" onClick={close}>Contact</a></li>
          <li>
            <a href="/file/Resume.pdf" target="_blank" rel="noopener noreferrer" className="mobile-link mobile-resume" onClick={close}>
              <i className="fa-solid fa-file-pdf" /> Resume PDF
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
