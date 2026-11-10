import { useRef, useEffect } from 'react'

const videos = [
  { id: 'PN81f5S-IiY', title: 'Cinematic Reel 01', tool: 'CapCut Studio', tag: 'FEATURED EDIT', featured: true },
  { id: '6aK6lKZcqlY', title: 'Visual Motion 02', tool: 'CapCut Studio', tag: 'COLOR & VFX' },
  { id: '02Vb20SgBy4', title: 'Pacing Showcase 03', tool: 'CapCut Studio', tag: 'RHYTHM CUT' },
  { id: 'UPjlnkvm2kw', title: 'Commercial Cut 04', tool: 'Premiere Pro', tag: 'POST PRODUCTION' },
  { id: 'OKgUehAryG0', title: 'Dynamic Flow 05', tool: 'CapCut Studio', tag: 'SOUND DESIGN' },
]

function VideoCard({ video, onOpenModal }) {
  return (
    <div
      className={`vid-card ${video.featured ? 'vid-featured' : ''}`}
      onClick={() => onOpenModal(video.id, video.title)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpenModal(video.id, video.title) }}
    >
      <div className="vid-thumb">
        <img
          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
          onError={(e) => { e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` }}
          alt={video.title}
          className="vid-img"
          draggable={false}
          loading="lazy"
        />
        <div className="vid-overlay">
          <div className="vid-play-button">
            <i className="fa-solid fa-play" />
          </div>
        </div>
        {video.tag && <span className="vid-tag-badge">{video.tag}</span>}
      </div>

      <div className="vid-meta">
        <span className="vid-tool">
          <i className="fa-solid fa-film" />
          {video.tool}
        </span>
        <span className="vid-name">{video.title}</span>
      </div>
    </div>
  )
}

export default function Videos({ onOpenModal }) {
  const stripRef = useRef(null)

  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    let isDown = false, startX, scrollLeft

    const onDown = (e) => {
      isDown = true
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
    }
    const onLeave = () => { isDown = false }
    const onUp = () => { isDown = false }
    const onMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5
    }

    el.addEventListener('mousedown', onDown)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mouseup', onUp)
    el.addEventListener('mousemove', onMove)
    return () => {
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mouseup', onUp)
      el.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <section className="section videos-section" id="videos">
      <div className="container">
        <div className="section-label">
          <span className="label-line" />
          <span>Cinematography &amp; Motion</span>
        </div>
        <div className="videos-head">
          <h2 className="section-title">
            Video Editing &amp; <span className="text-gradient">Storytelling</span>
          </h2>
          <p className="videos-hint">
            <i className="fa-solid fa-arrows-left-right" /> Drag horizontally to explore
          </p>
        </div>
      </div>

      <div className="vid-strip-wrap" ref={stripRef}>
        <div className="vid-strip">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} onOpenModal={onOpenModal} />
          ))}
        </div>
      </div>
    </section>
  )
}
