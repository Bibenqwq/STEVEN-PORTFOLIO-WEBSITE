import { useState } from 'react'

export default function Resume() {
  const [copied, setCopied] = useState(false)
  const email = 'bibenesguerra25@gmail.com'

  const copyEmail = () => {
    navigator.clipboard?.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  return (
    <section className="section resume-section" id="resume">
      <div className="container">
        <div className="resume-card reveal-up">
          <div className="resume-grid">
            <div className="resume-left">
              <div className="section-label">
                <span className="label-line" />
                <span>Contact</span>
              </div>
              <h2 className="resume-title">
                Have a project in mind? <br />
                <span className="text-gradient">Let's work together.</span>
              </h2>
              <p className="resume-desc">
                Open for freelance web development and video editing projects. Feel free to reach out via email or download my resume below.
              </p>

              <div className="resume-btn-group">
                <a
                  href="/file/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  id="resumeDownloadBtn"
                >
                  <i className="fa-solid fa-file-arrow-down" />
                  <span>Download Resume</span>
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="btn btn-ghost"
                  title="Copy email to clipboard"
                >
                  <i className={copied ? 'fa-solid fa-check text-green' : 'fa-regular fa-copy'} />
                  <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
                </button>
              </div>
            </div>

            <div className="resume-right">
              <div className="contact-details-box">
                <h3 className="contact-box-title">Get in Touch</h3>
                <div className="contact-item">
                  <span className="contact-item-label">Email</span>
                  <a href={`mailto:${email}`} className="contact-item-value">
                    {email}
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-item-label">GitHub</span>
                  <a
                    href="https://github.com/bibenqwq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item-value"
                  >
                    github.com/bibenqwq
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
