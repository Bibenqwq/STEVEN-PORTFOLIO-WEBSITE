import { useState, useEffect } from 'react'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import About      from './components/About'
import Skills     from './components/Skills'
import Projects   from './components/Projects'
import Resume     from './components/Resume'
import Footer     from './components/Footer'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal-up, .reveal-line').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Nav scroll effect
  useEffect(() => {
    const nav     = document.getElementById('nav')
    const handler = () => nav?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <div className="noise" />

      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Footer />
    </>
  )
}
