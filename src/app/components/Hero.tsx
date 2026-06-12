import { useState, useEffect } from "react";
import { Github, Terminal, ArrowDown } from "lucide-react";
import { motion } from "motion/react";

const TYPING_STRINGS = [
  "Full-Stack Developer",
  "Open Source Contributor",
  "Systems Engineer",
  "React & Node.js Expert",
];

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_STRINGS[stringIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplayText(current.slice(0, charIndex + 1));
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), 1800);
          } else {
            setCharIndex((c) => c + 1);
          }
        } else {
          setDisplayText(current.slice(0, charIndex - 1));
          if (charIndex - 1 === 0) {
            setDeleting(false);
            setStringIndex((s) => (s + 1) % TYPING_STRINGS.length);
            setCharIndex(0);
          } else {
            setCharIndex((c) => c - 1);
          }
        }
      },
      deleting ? 40 : 75
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, stringIndex]);

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-16 lg:px-24">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#00ff87 1px, transparent 1px), linear-gradient(90deg, #00ff87 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10" style={{ background: "#00ff87" }} />

      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-8"
        >
          <Terminal size={14} style={{ color: "#00ff87" }} />
          <span className="font-mono text-sm" style={{ color: "#00ff87" }}>
            ~/portfolio
          </span>
          <span className="font-mono text-sm" style={{ color: "#6b8a6b" }}>
            $ whoami
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-sans mb-4"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 700, lineHeight: 1.05, color: "#e8f0e8" }}
        >
          Alex <span style={{ color: "#00ff87" }}>Chen</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 mb-8 h-12"
        >
          <span className="font-mono" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "#e8f0e8" }}>
            {displayText}
          </span>
          <span
            className="font-mono animate-pulse"
            style={{ color: "#00ff87", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
          >
            _
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-sans mb-12 max-w-2xl"
          style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#6b8a6b" }}
        >
          I build things for the web and beyond. Passionate about distributed systems, developer tooling, and open source.
          Currently crafting infrastructure at scale — one commit at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#repos"
            className="flex items-center gap-2 px-6 py-3 font-mono text-sm font-medium transition-all duration-200"
            style={{
              background: "#00ff87",
              color: "#0a0e0f",
              border: "1px solid #00ff87",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#00ff87";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#00ff87";
              (e.currentTarget as HTMLAnchorElement).style.color = "#0a0e0f";
            }}
          >
            <Github size={16} />
            View Repositories
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 font-mono text-sm font-medium transition-all duration-200"
            style={{
              background: "transparent",
              color: "#e8f0e8",
              border: "1px solid rgba(0,255,135,0.2)",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#00ff87";
              (e.currentTarget as HTMLAnchorElement).style.color = "#00ff87";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,135,0.2)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#e8f0e8";
            }}
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap gap-10 mt-16 pt-12"
          style={{ borderTop: "1px solid rgba(0,255,135,0.1)" }}
        >
          {[
            { label: "Repositories", value: "84" },
            { label: "GitHub Stars", value: "2.4k" },
            { label: "Contributions", value: "1,847" },
            { label: "Followers", value: "312" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-mono font-bold" style={{ fontSize: "1.6rem", color: "#00ff87" }}>
                {stat.value}
              </div>
              <div className="font-mono text-xs mt-1" style={{ color: "#6b8a6b" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown size={20} style={{ color: "#6b8a6b" }} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
