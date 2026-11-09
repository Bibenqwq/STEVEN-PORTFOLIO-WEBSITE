/* ============================================
   STEVEN'S PORTFOLIO — script.js
   ============================================ */

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
document.querySelectorAll('a, button, .project-card, .video-card, .skill-card, .play-btn-large').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    cursor.style.background = 'var(--accent)';
    cursorFollower.style.transform = 'translate(-50%,-50%) scale(1.6)';
    cursorFollower.style.borderColor = 'var(--accent)';
    cursorFollower.style.opacity = '0.6';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'var(--dark)';
    cursorFollower.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.borderColor = 'var(--dark)';
    cursorFollower.style.opacity = '0.4';
  });
});

// ── NAVIGATION ──
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  // Animate hamburger
  const spans = menuBtn.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    // Change color for dark bg
    spans.forEach(s => s.style.background = '#f1f1ee');
  } else {
    spans.forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
      s.style.background = '';
    });
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = menuBtn.querySelectorAll('span');
    spans.forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
      s.style.background = '';
    });
  });
});

// ── SMOOTH ACTIVE NAV HIGHLIGHTING ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── SCROLL REVEAL ANIMATIONS ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal-line, .reveal-up')];
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 0.1}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-line, .reveal-up').forEach(el => revealObserver.observe(el));

// Also animate hero content on load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-line').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 200);
});

// ── SKILLS TAB SWITCH ──
const tabs = document.querySelectorAll('.skills-tab');
const panels = document.querySelectorAll('.skills-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panelId = 'panel' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
    document.getElementById(panelId)?.classList.add('active');
  });
});

// ── VIDEO MODAL (YouTube) ──
const videoModal = document.getElementById('videoModal');
const videoIframe = document.getElementById('videoModalIframe');

function openVideoModal(videoId, title) {
  videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  videoModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  videoModal.classList.remove('open');
  document.body.style.overflow = '';
  // Stop the video by clearing the src
  videoIframe.src = '';
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideoModal();
});

// ── CONTACT FORM ──
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate a send (replace with actual form submission logic)
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    success.classList.add('show');
    e.target.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1500);
}

// ── PROFILE IMAGE FALLBACK ──
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .nav-link.active-nav {
    color: var(--dark) !important;
  }
  .nav-link.active-nav::after {
    width: 100% !important;
  }
`;
document.head.appendChild(styleSheet);

// ── PROJECT CARD PARALLAX ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── PROFILE IMAGE FALLBACK ──
const profileImg = document.getElementById('profileImg');
const avatarPlaceholder = document.getElementById('avatarPlaceholder');

if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    if (avatarPlaceholder) avatarPlaceholder.style.display = 'flex';
  });
}
