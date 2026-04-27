import React, { useEffect, useRef, useState } from 'react';
 

export default function LoadingAnimation() {
  const canvasRef = useRef(null);
  const [msgIndex, setMsgIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const messages = [
    "Hold tight, magic is loading...",
    "Crafting something extraordinary...",
    "Building your experience...",
    "Almost there, stay with us...",
    "Assembling the pieces...",
    "Loading greatness...",
    "Just a few more seconds...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setMsgIndex(prev => (prev + 1) % messages.length);
        setFadeIn(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 280, H = 280, cx = W / 2, cy = H / 2;

    const rings = [
      { r: 120, tiltX: 0,  tiltY: 0,  spd:  1.0, col: '#5588ff', w: 3.5 },
      { r: 100, tiltX: 60, tiltY: 0,  spd: -1.4, col: '#7755ff', w: 3.0 },
      { r: 100, tiltX: 60, tiltY: 90, spd:  1.2, col: '#aa44ff', w: 3.0 },
      { r: 78,  tiltX: 30, tiltY: 45, spd: -1.8, col: '#33aaff', w: 2.5 },
      { r: 58,  tiltX: 75, tiltY: 20, spd:  2.2, col: '#55ddcc', w: 2.0 },
      { r: 38,  tiltX: 20, tiltY: 70, spd: -2.8, col: '#ff66aa', w: 2.0 },
    ];
    const angles = rings.map(() => 0);
    let animId;

    function project3D(theta, r, tiltXdeg, tiltYdeg) {
      const tx = (tiltXdeg * Math.PI) / 180;
      const ty = (tiltYdeg * Math.PI) / 180;
      const x0 = r * Math.cos(theta);
      const z0 = r * Math.sin(theta);
      const x1 = x0 * Math.cos(ty) + z0 * Math.sin(ty);
      const z1 = -x0 * Math.sin(ty) + z0 * Math.cos(ty);
      const y2 = -z1 * Math.sin(tx);
      const z2 = z1 * Math.cos(tx);
      const fov = 400;
      const scale = fov / (fov + z2 + 60);
      return { x: x1 * scale, y: y2 * scale, z: z2, scale };
    }

    function drawRing(ring, angle) {
      const segments = 120;
      ctx.lineWidth = ring.w;
      ctx.lineCap = 'round';

      for (let s = 0; s < segments; s++) {
        const t0 = (s / segments) * Math.PI * 2 + angle;
        const t1 = ((s + 1) / segments) * Math.PI * 2 + angle;
        const p0 = project3D(t0, ring.r, ring.tiltX, ring.tiltY);
        const p1 = project3D(t1, ring.r, ring.tiltX, ring.tiltY);

        const alpha = 0.15 + 0.85 * ((p0.z + ring.r + 60) / (ring.r * 2 + 60));
        let diff = Math.abs(((t0 - angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2));
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        const boost = Math.max(0, 1 - diff / (Math.PI * 0.5));
        const finalAlpha = Math.min(1, alpha + boost * 0.5);

        ctx.beginPath();
        ctx.moveTo(cx + p0.x, cy + p0.y);
        ctx.lineTo(cx + p1.x, cy + p1.y);
        ctx.strokeStyle =
          ring.col + Math.round(finalAlpha * 255).toString(16).padStart(2, '0');
        ctx.stroke();
      }

      // Orbiting dot
      const dp = project3D(angle, ring.r, ring.tiltX, ring.tiltY);
      const dotScale = 0.6 + 0.4 * dp.scale;
      const dotR = (ring.w + 2) * dotScale;

      const grd = ctx.createRadialGradient(
        cx + dp.x, cy + dp.y, 0,
        cx + dp.x, cy + dp.y, dotR * 3.5
      );
      grd.addColorStop(0, ring.col + 'cc');
      grd.addColorStop(1, ring.col + '00');
      ctx.beginPath();
      ctx.arc(cx + dp.x, cy + dp.y, dotR * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx + dp.x, cy + dp.y, dotR, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);

      // Center ambient glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
      cg.addColorStop(0, 'rgba(80,100,255,0.10)');
      cg.addColorStop(1, 'rgba(80,100,255,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();

      // Depth-sorted ring draw order
      const order = rings
        .map((_, i) => i)
        .sort((a, b) => {
          const pa = project3D(angles[a], rings[a].r, rings[a].tiltX, rings[a].tiltY);
          const pb = project3D(angles[b], rings[b].r, rings[b].tiltX, rings[b].tiltY);
          return pa.z - pb.z;
        });

      for (const i of order) {
        drawRing(rings[i], angles[i]);
        angles[i] += (rings[i].spd * Math.PI) / 180;
      }

      // Center sphere
      const sg = ctx.createRadialGradient(cx - 8, cy - 8, 0, cx, cy, 22);
      sg.addColorStop(0, 'rgba(180,200,255,0.95)');
      sg.addColorStop(0.4, 'rgba(100,130,255,0.8)');
      sg.addColorStop(1, 'rgba(40,60,180,0.3)');
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fillStyle = sg;
      ctx.fill();

      animId = requestAnimationFrame(frame);
    }

    frame();
    return () => cancelAnimationFrame(animId);
  }, []);
 
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #06081a 0%, #0d1030 50%, #060a1a 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>

      {/* SVG Background */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 680 520"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="bg1" cx="30%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#1a2260" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06081a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bg2" cx="75%" cy="65%" r="45%">
            <stop offset="0%" stopColor="#2a0d4f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#060a1a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bg3" cx="50%" cy="20%" r="35%">
            <stop offset="0%" stopColor="#0a2a50" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#060a1a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="680" height="520" fill="#06081a" />
        <rect width="680" height="520" fill="url(#bg1)" />
        <rect width="680" height="520" fill="url(#bg2)" />
        <rect width="680" height="520" fill="url(#bg3)" />

        {/* Grid lines */}
        <g opacity="0.06" stroke="#8888cc" strokeWidth="0.5">
          <line x1="0" y1="0" x2="680" y2="520" />
          <line x1="680" y1="0" x2="0" y2="520" />
          <line x1="340" y1="0" x2="340" y2="520" />
          <line x1="0" y1="260" x2="680" y2="260" />
          <line x1="170" y1="0" x2="170" y2="520" />
          <line x1="510" y1="0" x2="510" y2="520" />
          <line x1="0" y1="130" x2="680" y2="130" />
          <line x1="0" y1="390" x2="680" y2="390" />
        </g>

        {/* Dot grid */}
        <g fill="#5566ff" opacity="0.18">
          {[60,160,240,320,400,480,560,640].map(x =>
            <circle key={`r1-${x}`} cx={x} cy="60" r="1.5" />
          )}
          {[120,200,280,360,440,520,600].map(x =>
            <circle key={`r2-${x}`} cx={x} cy="120" r="1.5" />
          )}
          {[80,160,240,440,520,600,640].map(x =>
            <circle key={`r3-${x}`} cx={x} cy="180" r="1.5" />
          )}
          {[120,200,480,560,640].map(x =>
            <circle key={`r4-${x}`} cx={x} cy="340" r="1.5" />
          )}
          {[80,160,200,440,520,600].map(x =>
            <circle key={`r5-${x}`} cx={x} cy="400" r="1.5" />
          )}
          {[80,160,240,400,480,560,640].map(x =>
            <circle key={`r6-${x}`} cx={x} cy="460" r="1.5" />
          )}
        </g>

        {/* Animated orbs */}
        <circle cx="100" cy="100" r="60" fill="#3355ff" opacity="0.04">
          <animate attributeName="cy" values="100;80;100" dur="7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.04;0.08;0.04" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle cx="580" cy="400" r="80" fill="#8844ff" opacity="0.05">
          <animate attributeName="cy" values="400;380;400" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.05;0.09;0.05" dur="9s" repeatCount="indefinite" />
        </circle>
        <circle cx="560" cy="100" r="40" fill="#2299ff" opacity="0.05">
          <animate attributeName="cy" values="100;115;100" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="120" cy="420" r="35" fill="#aa44ff" opacity="0.05">
          <animate attributeName="cy" values="420;405;420" dur="6s" repeatCount="indefinite" />
        </circle>

        {/* Twinkling stars */}
        {[
          { cx:60, cy:45, r:1, d:'3s', begin:'0s' },
          { cx:220, cy:30, r:1.2, d:'4s', begin:'0.5s' },
          { cx:600, cy:70, r:0.8, d:'2.5s', begin:'1s' },
          { cx:650, cy:200, r:1, d:'3.5s', begin:'0.7s' },
          { cx:40, cy:300, r:1.2, d:'4s', begin:'1.2s' },
          { cx:630, cy:450, r:1, d:'3s', begin:'0.3s' },
          { cx:180, cy:490, r:0.8, d:'5s', begin:'0.9s' },
          { cx:500, cy:20, r:1, d:'3.2s', begin:'0s' },
        ].map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity="0.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur={s.d} repeatCount="indefinite" begin={s.begin} />
          </circle>
        ))}
      </svg>

      {/* Canvas loader */}
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        style={{ position: 'relative', zIndex: 2 }}
      />

      {/* Message */}
      <div style={{ marginTop: 32, textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{
          fontSize: 16,
          fontWeight: 400,
          color: 'rgba(200,210,255,0.85)',
          letterSpacing: '0.6px',
          transition: 'opacity 0.4s ease',
          opacity: fadeIn ? 1 : 0,
          minHeight: 24,
        }}>
          {messages[msgIndex]}
        </div>

        {/* Bouncing dots */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 18 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #5588ff, #aa66ff)',
              animation: `bounce 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}