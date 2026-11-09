import React, { useRef, useState, useEffect, useCallback } from 'react';
import './LanyardIdBadge.css';

/**
 * LanyardIdBadge
 * Custom 3D Physics Lanyard & ID Badge matching Steven's Dark & Crimson Theme.
 * - Anchored at the very top edge of the navbar/screen (y = 0).
 * - Twin branded straps: Stealth Carbon Left (STEVEN) + Deep Crimson Right (</> DEVELOPER).
 * - Molded matte-black quick release buckle + carbon tab with </> developer seal.
 * - Chrome lobster clasp hook tip passes directly through the card's punch hole at (jointX, jointY) - 100% aligned.
 * - 3D dual-sided ID card: Front (Steven Front ID) and Back (Developer Profile & QR Code).
 * - Physics: spring damping, momentum on drag, 3D flip on click.
 */
export default function LanyardIdBadge({ onFlipChange }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const assemblyRef = useRef(null);
  const shadowRef = useRef(null);
  const requestRef = useRef(null);

  // Flip state (false = Front, true = Back)
  const [isFlipped, setIsFlipped] = useState(false);
  const isFlippedRef = useRef(false);
  isFlippedRef.current = isFlipped;

  // Drag & pointer tracking
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0, time: 0 });
  const grabOffsetRef = useRef({ x: 0, y: 0 });
  const mouseHoverRef = useRef({ x: 0, y: 0, isHovering: false });

  // Stage geometry (Hangs from very top of screen / navbar)
  const STAGE_W = 460;
  const ANCHOR_X = STAGE_W / 2; // 230px (centered)
  const ANCHOR_Y = 0;           // Sits at the very top edge of the navbar
  const REST_LENGTH = 280;      // Distance from top anchor down to punch hole (px)

  // Natural physics drop entrance on website open / refresh
  // Starts completely above the top edge with downward falling momentum and tilt
  const INITIAL_DROP = {
    x: -36,
    y: -540,
    vx: 50,
    vy: 320,
    rotZ: -20,
    vRotZ: 0,
    rotX: 32,
    vRotX: 0,
    rotY: -22,
    vRotY: 0,
    prevDragX: -36,
    prevDragY: -540
  };

  // Physics simulation state (initialized with drop entrance coordinates)
  const physicsRef = useRef({ ...INITIAL_DROP });

  // Initial strap coordinates calculated from INITIAL_DROP
  const initJointX = ANCHOR_X + INITIAL_DROP.x;
  const initJointY = ANCHOR_Y + REST_LENGTH + INITIAL_DROP.y;
  const initBuckleX = initJointX;
  const initBuckleY = initJointY - 64;

  // Dynamic SVG strap paths
  const [strapPaths, setStrapPaths] = useState({
    leftD: `M ${ANCHOR_X - 24} 0 L ${initBuckleX - 9} ${initBuckleY}`,
    rightD: `M ${ANCHOR_X + 24} 0 L ${initBuckleX + 9} ${initBuckleY}`
  });

  // Toggle flip between Front and Back (No audio)
  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => {
      const next = !prev;
      physicsRef.current.vRotY += next ? 32 : -32;
      physicsRef.current.vy -= 8;
      physicsRef.current.vRotX += (Math.random() - 0.5) * 8;
      onFlipChange?.(next);
      return next;
    });
  }, [onFlipChange]);

  // 60+ FPS Physics loop
  useEffect(() => {
    let lastTime = performance.now();

    const updatePhysics = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      const p = physicsRef.current;
      const targetFlip = isFlippedRef.current ? 180 : 0;

      if (isDraggingRef.current) {
        // Dragging mode: follow pointer with velocity tracking
        const dragVx = p.x - p.prevDragX;
        const dragVy = p.y - p.prevDragY;
        p.prevDragX = p.x;
        p.prevDragY = p.y;
        p.vx = dragVx / Math.max(dt, 0.016);
        p.vy = dragVy / Math.max(dt, 0.016);

        const targetRotZ = Math.max(-42, Math.min(42, p.x * 0.18 + p.vx * 0.028));
        const targetRotX = Math.max(-28, Math.min(28, -p.vy * 0.038 + p.y * 0.04));
        const targetRotY = targetFlip + Math.max(-36, Math.min(36, p.vx * 0.048));

        p.rotZ += (targetRotZ - p.rotZ) * 0.38;
        p.rotX += (targetRotX - p.rotX) * 0.38;
        p.rotY += (targetRotY - p.rotY) * 0.38;
      } else {
        // Free physics simulation: Spring-Damper Pendulum
        const springK = 32.0;
        const damping = 4.2;

        const fx = -springK * p.x - damping * p.vx;
        const fy = -springK * p.y - damping * p.vy;

        p.vx += fx * dt;
        p.vy += fy * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Subtle hover reaction when mouse moves nearby
        let hoverAddX = 0;
        let hoverAddY = 0;
        if (mouseHoverRef.current.isHovering) {
          hoverAddY = mouseHoverRef.current.x * 12;
          hoverAddX = -mouseHoverRef.current.y * 8;
        }

        // RotZ pendulum restoring force
        const pendulumTargetAngle = Math.max(-42, Math.min(42, (p.x / REST_LENGTH) * 34));
        const rotZSpring = 30.0;
        const rotZDamp = 4.6;
        p.vRotZ += (-rotZSpring * (p.rotZ - pendulumTargetAngle) - rotZDamp * p.vRotZ) * dt;
        p.rotZ += p.vRotZ * dt;

        // RotX pitch restoring force
        const rotXSpring = 24.0;
        const rotXDamp = 4.4;
        p.vRotX += (-rotXSpring * (p.rotX - hoverAddX) - rotXDamp * p.vRotX) * dt;
        p.rotX += p.vRotX * dt;

        // RotY yaw/flip restoring force
        const rotYSpring = 28.0;
        const rotYDamp = 4.5;
        p.vRotY += (-rotYSpring * (p.rotY - (targetFlip + hoverAddY)) - rotYDamp * p.vRotY) * dt;
        p.rotY += p.vRotY * dt;
      }

      // Mathematical joint position (Punch hole of the ID card)
      const jointX = ANCHOR_X + p.x;
      const jointY = ANCHOR_Y + REST_LENGTH + p.y;

      // Buckle sits 64px above the punch hole
      const buckleX = jointX;
      const buckleY = jointY - 64;

      // Dynamic curve for twin lanyard straps
      const dist = Math.hypot(p.x, REST_LENGTH + p.y);
      const slack = Math.max(0, REST_LENGTH - dist) * 0.45;

      // Left strap curve: (ANCHOR_X - 24, 0) -> (buckleX - 9, buckleY)
      const lP0x = ANCHOR_X - 24;
      const lP0y = 0;
      const lP3x = buckleX - 9;
      const lP3y = buckleY;
      const lCp1x = lP0x + p.x * 0.18;
      const lCp1y = buckleY * 0.45 + slack;
      const lCp2x = lP0x + p.x * 0.72;
      const lCp2y = buckleY * 0.8 + slack * 0.5;
      const leftD = `M ${lP0x} ${lP0y} C ${lCp1x} ${lCp1y}, ${lCp2x} ${lCp2y}, ${lP3x} ${lP3y}`;

      // Right strap curve: (ANCHOR_X + 24, 0) -> (buckleX + 9, buckleY)
      const rP0x = ANCHOR_X + 24;
      const rP0y = 0;
      const rP3x = buckleX + 9;
      const rP3y = buckleY;
      const rCp1x = rP0x + p.x * 0.18;
      const rCp1y = buckleY * 0.45 + slack;
      const rCp2x = rP0x + p.x * 0.72;
      const rCp2y = buckleY * 0.8 + slack * 0.5;
      const rightD = `M ${rP0x} ${rP0y} C ${rCp1x} ${rCp1y}, ${rCp2x} ${rCp2y}, ${rP3x} ${rP3y}`;

      setStrapPaths({ leftD, rightD });

      // Update Buckle & Clasp Assembly
      if (assemblyRef.current) {
        const assemblyTilt = p.rotZ * 0.82;
        assemblyRef.current.style.transform = `translate3d(${jointX}px, ${jointY}px, 0) rotateZ(${assemblyTilt}deg)`;
      }

      // Update 3D Card Position & Rotation (Transform-origin is 50% 29px, right at punch hole!)
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${jointX}px, ${jointY}px, 0) translate(-50%, -29px) rotateZ(${p.rotZ}deg) rotateX(${p.rotX}deg) rotateY(${p.rotY}deg)`;
      }

      // Dynamic floor shadow that blooms as card drops closer to rest position
      if (shadowRef.current) {
        const shadowFactor = Math.max(0, Math.min(1, (p.y + 400) / 400));
        const shadowBlur = Math.max(16, 36 - p.y * 0.08);
        const shadowOpacity = Math.max(0, (0.38 - Math.abs(p.y) * 0.001 - Math.abs(p.x) * 0.001) * shadowFactor);
        const shadowScale = Math.max(0.6, (1 - p.y * 0.002) * shadowFactor);
        shadowRef.current.style.setProperty('--shadow-blur', `${shadowBlur}px`);
        shadowRef.current.style.setProperty('--shadow-opacity', `${shadowOpacity}`);
        shadowRef.current.style.setProperty('--shadow-scale', `${shadowScale}`);
      }

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Pointer Down
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.button !== undefined) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    isDraggingRef.current = true;
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    };

    const currentX = physicsRef.current.x;
    const currentY = physicsRef.current.y;
    grabOffsetRef.current = {
      x: e.clientX - (rect.left + ANCHOR_X + currentX),
      y: e.clientY - (rect.top + REST_LENGTH + currentY)
    };
    physicsRef.current.prevDragX = currentX;
    physicsRef.current.prevDragY = currentY;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  // Pointer Move
  const handlePointerMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (isDraggingRef.current) {
      const centerX = rect.left + ANCHOR_X;
      const centerY = rect.top + REST_LENGTH;

      const rawX = e.clientX - centerX - grabOffsetRef.current.x;
      const rawY = e.clientY - centerY - grabOffsetRef.current.y;

      physicsRef.current.x = Math.max(-210, Math.min(210, rawX));
      physicsRef.current.y = Math.max(-100, Math.min(220, rawY));
    } else {
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseHoverRef.current = {
        x: Math.max(-1, Math.min(1, normX)),
        y: Math.max(-1, Math.min(1, normY)),
        isHovering: true
      };
    }
  };

  // Pointer Up
  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const deltaX = Math.abs(e.clientX - pointerStartRef.current.x);
    const deltaY = Math.abs(e.clientY - pointerStartRef.current.y);
    const deltaTime = Date.now() - pointerStartRef.current.time;

    // Click to flip!
    if (deltaX < 10 && deltaY < 10 && deltaTime < 400) {
      toggleFlip();
    }
  };

  const handlePointerLeave = () => {
    mouseHoverRef.current.isHovering = false;
  };

  return (
    <div className="lanyard-showcase-stage" aria-label="Steven 3D Lanyard ID Badge">
      {/* Top Mount Anchor Ring — Sits right at the very top edge of the navbar */}
      <div className="lanyard-line-ring" aria-hidden="true" />

      {/* Main 3D Physics Viewport */}
      <div
        className="lanyard-physics-viewport"
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        role="region"
        aria-roledescription="Interactive 3D ID Card"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFlip();
          }
        }}
      >
        {/* Dynamic Curved Twin Lanyard Straps */}
        <svg
          className="lanyard-strap-canvas"
          viewBox={`0 0 ${STAGE_W} 780`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="ribbonShadow" x="-20%" y="-10%" width="140%" height="130%">
              <feDropShadow dx="2" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.45" />
            </filter>

            {/* Left Strap: Stealth Matte Carbon with Subtle Diagonal Texture */}
            <linearGradient id="stealthCarbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0b0d12" />
              <stop offset="25%" stopColor="#151922" />
              <stop offset="50%" stopColor="#222736" />
              <stop offset="75%" stopColor="#151922" />
              <stop offset="100%" stopColor="#0b0d12" />
            </linearGradient>

            {/* Right Strap: Deep Cyber Crimson / Red */}
            <linearGradient id="cyberCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2a0508" />
              <stop offset="20%" stopColor="#4f0c13" />
              <stop offset="50%" stopColor="#85131f" />
              <stop offset="80%" stopColor="#4f0c13" />
              <stop offset="100%" stopColor="#2a0508" />
            </linearGradient>
          </defs>

          {/* Left Strap Shadow */}
          <path
            d={strapPaths.leftD}
            fill="none"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="28"
            strokeLinecap="round"
            filter="url(#ribbonShadow)"
          />

          {/* Right Strap Shadow */}
          <path
            d={strapPaths.rightD}
            fill="none"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="28"
            strokeLinecap="round"
            filter="url(#ribbonShadow)"
          />

          {/* Left Strap Body (Stealth Carbon) */}
          <path
            d={strapPaths.leftD}
            fill="none"
            stroke="url(#stealthCarbonGrad)"
            strokeWidth="26"
            strokeLinecap="square"
          />
          {/* Left Strap Crimson Pinstripe */}
          <path
            d={strapPaths.leftD}
            fill="none"
            stroke="#ff3b4e"
            strokeWidth="2.5"
            strokeDasharray="12 4"
          />

          {/* Right Strap Body (Cyber Crimson) */}
          <path
            d={strapPaths.rightD}
            fill="none"
            stroke="url(#cyberCrimsonGrad)"
            strokeWidth="26"
            strokeLinecap="square"
          />
          {/* Right Strap Bone-White Pinstripe */}
          <path
            d={strapPaths.rightD}
            fill="none"
            stroke="#f4f1eb"
            strokeWidth="2.5"
            strokeDasharray="12 4"
          />

          {/* Typography along curves */}
          <path id="leftPathGuide" d={strapPaths.leftD} fill="none" stroke="transparent" />
          <path id="rightPathGuide" d={strapPaths.rightD} fill="none" stroke="transparent" />

          {/* Left Strap Text: STEVEN */}
          <text
            fill="#ffffff"
            fontSize="10"
            fontFamily="'Manrope', sans-serif"
            fontWeight="900"
            letterSpacing="4.5"
            dy="3.6"
          >
            <textPath href="#leftPathGuide" xlinkHref="#leftPathGuide" startOffset="50%" textAnchor="middle">
              STEVEN
            </textPath>
          </text>

          {/* Right Strap Text: </> DEVELOPER */}
          <text
            fill="#f4f1eb"
            fontSize="9"
            fontFamily="'Manrope', sans-serif"
            fontWeight="900"
            letterSpacing="3.5"
            dy="3.4"
          >
            <textPath href="#rightPathGuide" xlinkHref="#rightPathGuide" startOffset="50%" textAnchor="middle">
              &lt;/&gt; DEVELOPER
            </textPath>
          </text>
        </svg>

        {/* ================= CLASP, TAB & BUCKLE ASSEMBLY ================= */}
        {/* Origin is at (0, 0) which is EXACTLY the card punch hole */}
        <div
          className="lanyard-joint-assembly"
          ref={assemblyRef}
          aria-hidden="true"
          style={{
            transform: `translate3d(${initJointX}px, ${initJointY}px, 0) rotateZ(${INITIAL_DROP.rotZ * 0.82}deg)`,
          }}
        >
          {/* Tactical Matte-Black Molded Quick-Release Buckle */}
          <div className="lanyard-buckle-module">
            <div className="buckle-top-bar" />
            <div className="buckle-main-case">
              <span className="buckle-release-side left" />
              <span className="buckle-release-side right" />
              <div className="buckle-center-groove" />
            </div>
          </div>

          {/* Stealth Carbon Fabric Tab with </> Developer Emblem */}
          <div className="lanyard-tab-module">
            <div className="tab-fabric-ribbon">
              <div className="tab-seal-emblem">
                <span className="seal-code-symbol">&lt;/&gt;</span>
              </div>
            </div>
            <div className="tab-metal-rivet" />
          </div>

          {/* Chrome Swivel Lobster Clasp Hook (Hook tip enters punch hole at 0,0) */}
          <div className="lanyard-metal-clasp-hook">
            <div className="clasp-swivel-ring" />
            <div className="clasp-jaw-body">
              <div className="clasp-trigger-lever" />
              <div className="clasp-hook-beak" />
            </div>
          </div>
        </div>

        {/* Dynamic Floor Shadow */}
        <div
          className="lanyard-card-shadow"
          ref={shadowRef}
          aria-hidden="true"
          style={{
            '--shadow-opacity': '0',
            '--shadow-scale': '0.6',
            '--shadow-blur': '36px',
          }}
        />

        {/* ================= 3D DOUBLE-SIDED ID CARD ================= */}
        {/* Transform-origin is precisely at 50% 29px (the punch hole) */}
        <div
          className={`lanyard-3d-card ${isFlipped ? 'is-flipped' : ''}`}
          ref={cardRef}
          onClick={toggleFlip}
          title="Click to flip ID card"
          style={{
            transform: `translate3d(${initJointX}px, ${initJointY}px, 0) translate(-50%, -29px) rotateZ(${INITIAL_DROP.rotZ}deg) rotateX(${INITIAL_DROP.rotX}deg) rotateY(${INITIAL_DROP.rotY}deg)`,
          }}
        >
          {/* FRONT FACE (Steven Front Developer ID) */}
          <div className="card-face card-face-front">
            <img
              src="/img/front-id.png"
              onError={(e) => { e.currentTarget.src = '/img/FRONT ID STIGBIDI.png'; }}
              alt="Steven - Front ID"
              className="id-photo-surface"
              draggable={false}
            />
            <div className="card-holo-sheen" aria-hidden="true" />
          </div>

          {/* BACK FACE (Steven Back Developer Profile & QR Code) */}
          <div className="card-face card-face-back">
            <img
              src="/img/back-id.png"
              onError={(e) => { e.currentTarget.src = '/img/BACK ID NI STIGBIDI.png'; }}
              alt="Steven - Back ID"
              className="id-photo-surface"
              draggable={false}
            />
            <div className="card-holo-sheen" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
