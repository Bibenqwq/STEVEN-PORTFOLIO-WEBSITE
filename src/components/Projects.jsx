import React, { useState, useRef, useCallback } from 'react'

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
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }, [])

  // Touch swipe support
  const touchStartXRef = useRef(0)
  const touchEndXRef = useRef(0)

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return
    const diff = touchStartXRef.current - touchEndXRef.current
    if (diff > 50) {
      nextSlide()
    } else if (diff < -50) {
      prevSlide()
    }
    touchStartXRef.current = 0
    touchEndXRef.current = 0
  }

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextSlide()
    }
  }

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        {/* Header with Integrated Slideshow Controls */}
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

          <div className="pj-header-right">
            <p className="pj-header-sub">
              Interactive systems and digital platforms built with a focus on usability and architecture.
            </p>

            <div className="pj-header-controls">
              <div className="pj-counter-pill" aria-label={`Project ${currentIndex + 1} of ${projects.length}`}>
                <span className="pj-counter-curr">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="pj-counter-sep">/</span>
                <span className="pj-counter-total">{String(projects.length).padStart(2, '0')}</span>
              </div>

              <div className="pj-nav-btns">
                <button
                  type="button"
                  className="pj-nav-btn prev"
                  onClick={prevSlide}
                  aria-label="Previous project slide"
                  title="Previous project (←)"
                >
                  <i className="fa-solid fa-arrow-left" />
                </button>
                <button
                  type="button"
                  className="pj-nav-btn next"
                  onClick={nextSlide}
                  aria-label="Next project slide"
                  title="Next project (→)"
                >
                  <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slideshow Viewport */}
        <div
          className="pj-slider-wrapper reveal-up"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Featured Projects Slideshow"
        >
          <div className="pj-slider-viewport">
            <div
              className="pj-slider-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="pj-slide"
                  aria-hidden={idx !== currentIndex}
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${projects.length}: ${project.title}`}
                >
                  <article id={project.id} className="pj-card">
                    {/* Image Preview Side */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pj-card-media"
                      aria-label={`Open ${project.title} live deployment`}
                      tabIndex={idx === currentIndex ? 0 : -1}
                    >
                      <img
                        src={project.previewImg}
                        alt={`${project.title} interface screenshot`}
                        className="pj-card-img"
                        loading={idx === 0 ? 'eager' : 'lazy'}
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
                          tabIndex={idx === currentIndex ? 0 : -1}
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
                          tabIndex={idx === currentIndex ? 0 : -1}
                        >
                          <span>Visit Live</span>
                          <i className="fa-solid fa-chevron-right" />
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
