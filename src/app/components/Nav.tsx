import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";

const LINKS = [
  { href: "#repos", label: "repos" },
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "skills" },
  { href: "#activity", label: "activity" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,14,15,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,255,135,0.1)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between h-14">
        {/* Logo */}
        <a href="#" className="font-mono text-sm font-semibold" style={{ color: "#00ff87" }}>
          alex.dev<span className="animate-pulse">_</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs transition-colors duration-150"
              style={{ color: "#6b8a6b" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#e8f0e8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6b8a6b")}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 transition-all duration-150"
            style={{
              color: "#0a0e0f",
              background: "#00ff87",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            <Github size={12} />
            GitHub
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          style={{ color: "#6b8a6b" }}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden flex flex-col gap-4 px-6 py-6"
          style={{ background: "rgba(10,14,15,0.97)", borderTop: "1px solid rgba(0,255,135,0.1)" }}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm"
              style={{ color: "#6b8a6b" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
