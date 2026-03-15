import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  pulse: number;
  pulseSpeed: number;
}

export default function Particles({ count = 40 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const initial: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.6,
      opacity: Math.random() * 0.35 + 0.05,
      speedX: (Math.random() - 0.5) * 0.01,
      speedY: (Math.random() - 0.5) * 0.01,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.018 + 0.006,
    }));
    setParticles(initial);

    const tick = () => {
      frameRef.current++;
      if (frameRef.current % 3 === 0) {
        setParticles(prev => prev.map(p => {
          let nx = p.x + p.speedX;
          let ny = p.y + p.speedY;
          let sx = p.speedX;
          let sy = p.speedY;
          if (nx < 0 || nx > 100) { sx = -sx; nx = Math.max(0, Math.min(100, nx)); }
          if (ny < 0 || ny > 100) { sy = -sy; ny = Math.max(0, Math.min(100, ny)); }
          return { ...p, x: nx, y: ny, speedX: sx, speedY: sy, pulse: p.pulse + p.pulseSpeed };
        }));
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(p => {
        const glow = Math.sin(p.pulse) * 0.5 + 0.5;
        const isGlowing = p.size > 1.8;
        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: isGlowing
                ? "radial-gradient(circle, hsl(265,80%,74%), hsl(280,60%,54%))"
                : `hsl(265, 55%, ${52 + glow * 18}%)`,
              opacity: p.opacity * (0.5 + glow * 0.5),
              boxShadow: isGlowing ? `0 0 ${p.size * 4}px hsl(265 70% 65% / 0.55)` : "none",
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
}
