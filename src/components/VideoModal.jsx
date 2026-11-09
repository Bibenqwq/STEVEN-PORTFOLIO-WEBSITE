export default function VideoModal({ isOpen, videoId, onClose }) {
  if (!isOpen) return null

  return (
    <div className={`video-modal${isOpen ? ' open' : ''}`} id="videoModal">
      <div className="video-modal-overlay" onClick={onClose}></div>
      <div className="video-modal-inner">
        <button className="video-modal-close" onClick={onClose} id="closeVideoModalBtn">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="video-modal-content">
          {videoId && (
            <iframe
              id="videoModalIframe"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', aspectRatio: '16/9', display: 'block', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
