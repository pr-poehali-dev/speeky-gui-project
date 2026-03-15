import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

interface AuthScreenProps {
  onAuth: () => void;
}

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

function useParticles(count: number) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const initial: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.012,
      speedY: (Math.random() - 0.5) * 0.012,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
    }));
    setParticles(initial);

    let frame = 0;
    const tick = () => {
      frame++;
      if (frame % 2 === 0) {
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

  return particles;
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const particles = useParticles(55);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onAuth(); }, 1200);
  };

  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setEmail(""); setPassword(""); setName("");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-[hsl(240,14%,6%)]">

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => {
          const glow = Math.sin(p.pulse) * 0.3 + 0.5;
          const isGlowing = p.size > 2;
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
                  ? `radial-gradient(circle, hsl(265,80%,75%), hsl(280,60%,55%))`
                  : `hsl(265, 60%, ${55 + glow * 20}%)`,
                opacity: p.opacity * (0.6 + glow * 0.4),
                boxShadow: isGlowing ? `0 0 ${p.size * 3}px hsl(265 70% 65% / 0.6)` : "none",
                transform: "translate(-50%, -50%)",
                transition: "opacity 0.1s",
              }}
            />
          );
        })}
      </div>

      {/* Ambient orbs */}
      <div className="absolute pointer-events-none"
        style={{ width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, hsl(265 70% 40% / 0.10) 0%, transparent 68%)", top: "-20%", right: "-10%", filter: "blur(2px)" }} />
      <div className="absolute pointer-events-none"
        style={{ width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, hsl(280 60% 35% / 0.08) 0%, transparent 68%)", bottom: "-15%", left: "5%", filter: "blur(2px)" }} />
      <div className="absolute pointer-events-none"
        style={{ width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, hsl(250 65% 45% / 0.07) 0%, transparent 70%)", top: "55%", right: "25%", filter: "blur(1px)" }} />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-[400px] mx-4"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "opacity 0.5s cubic-bezier(0.34,1.2,0.64,1), transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, hsl(265,65%,52%), hsl(280,60%,44%))",
              boxShadow: "0 0 32px hsl(265 65% 52% / 0.55), 0 0 60px hsl(265 65% 52% / 0.2)",
            }}
          >
            <span className="font-mono font-bold text-[18px] text-white tracking-tight">sw</span>
          </div>
          <h1 className="text-[26px] font-semibold text-[hsl(260,15%,92%)] tracking-tight">Swiftly</h1>
          <p className="text-[13px] text-[hsl(240,8%,48%)] mt-1">Защищённый мессенджер нового поколения</p>
        </div>

        {/* Mode switcher */}
        <div className="flex rounded-xl p-1 mb-6 bg-[hsl(240,12%,10%)] border border-[hsl(240,8%,14%)]">
          {(["login", "register"] as const).map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className="flex-1 py-2 rounded-lg text-[13px] font-medium transition-all duration-200"
              style={mode === m ? {
                background: "linear-gradient(135deg, hsl(265,55%,38%), hsl(280,50%,32%))",
                color: "white",
                boxShadow: "0 2px 12px hsl(265 60% 40% / 0.35)",
              } : {
                color: "hsl(240,8%,48%)",
              }}
            >
              {m === "login" ? "Войти" : "Регистрация"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "register" && (
            <div
              style={{
                opacity: mode === "register" ? 1 : 0,
                transform: mode === "register" ? "translateY(0)" : "translateY(-8px)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
              }}
            >
              <AuthInput
                icon="User"
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={setName}
              />
            </div>
          )}

          <AuthInput
            icon="Mail"
            type="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />

          <div className="relative">
            <AuthInput
              icon="Lock"
              type={showPass ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={setPassword}
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(240,8%,40%)] hover:text-[hsl(265,60%,65%)] transition-colors"
            >
              <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
            </button>
          </div>

          {mode === "login" && (
            <div className="flex justify-end">
              <button type="button" className="text-[12px] text-[hsl(265,55%,58%)] hover:text-[hsl(265,70%,72%)] transition-colors">
                Забыли пароль?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 rounded-xl text-[14px] font-semibold text-white relative overflow-hidden transition-all duration-200 disabled:opacity-70"
            style={{
              background: "linear-gradient(135deg, hsl(265,65%,52%), hsl(280,55%,44%))",
              boxShadow: loading ? "none" : "0 4px 20px hsl(265 65% 52% / 0.45), 0 0 0 1px hsl(265 40% 35%)",
              transform: loading ? "scale(0.98)" : "scale(1)",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 bg-white/80 rounded-full inline-block"
                      style={{ animation: `sw-typing 1.2s ease ${i * 0.15}s infinite` }} />
                  ))}
                </span>
              </span>
            ) : (
              mode === "login" ? "Войти в Swiftly" : "Создать аккаунт"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[hsl(240,8%,14%)]" />
          <span className="text-[11px] text-[hsl(240,8%,36%)]">или</span>
          <div className="flex-1 h-px bg-[hsl(240,8%,14%)]" />
        </div>

        {/* Social */}
        <div className="flex gap-3">
          {[
            { icon: "Github", label: "GitHub" },
            { icon: "Chrome", label: "Google" },
          ].map(s => (
            <button
              key={s.label}
              className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-[13px] font-medium text-[hsl(260,12%,65%)] border border-[hsl(240,8%,16%)] bg-[hsl(240,12%,10%)] hover:border-[hsl(265,30%,28%)] hover:text-[hsl(265,70%,72%)] hover:bg-[hsl(265,20%,12%)] transition-all duration-200"
            >
              <Icon name={s.icon} size={15} />
              {s.label}
            </button>
          ))}
        </div>

        {/* E2E note */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <Icon name="Shield" size={10} className="text-[hsl(265,40%,48%)]" />
          <span className="encrypted-badge text-[hsl(240,8%,36%)]">ЗАЩИТА СКВОЗНЫМ ШИФРОВАНИЕМ · E2E</span>
        </div>
      </div>
    </div>
  );
}

function AuthInput({
  icon, type, placeholder, value, onChange,
}: {
  icon: string; type: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border bg-[hsl(240,12%,10%)] transition-all duration-200"
      style={{
        borderColor: focused ? "hsl(265,40%,35%)" : "hsl(240,8%,16%)",
        boxShadow: focused ? "0 0 0 1px hsl(265 40% 35%), 0 4px 16px hsl(265 70% 50% / 0.08)" : "none",
      }}
    >
      <Icon name={icon} size={15} className={`flex-shrink-0 transition-colors duration-200 ${focused ? "text-[hsl(265,60%,62%)]" : "text-[hsl(240,8%,38%)]"}`} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent text-[14px] text-[hsl(260,15%,88%)] placeholder:text-[hsl(240,8%,36%)] outline-none"
        required
      />
    </div>
  );
}
