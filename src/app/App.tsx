import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Repos } from "./components/Repos";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Activity } from "./components/Activity";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "#0a0e0f",
        color: "#e8f0e8",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.025, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }}
      />

      <Nav />

      <main className="relative z-10">
        <Hero />

        <div
          className="w-full h-px mx-auto"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.2), transparent)" }}
        />

        <Repos />

        <div
          className="w-full h-px mx-auto"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.2), transparent)" }}
        />

        <Projects />

        <div
          className="w-full h-px mx-auto"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.2), transparent)" }}
        />

        <Skills />

        <div
          className="w-full h-px mx-auto"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.2), transparent)" }}
        />

        <Activity />

        <div
          className="w-full h-px mx-auto"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.2), transparent)" }}
        />

        <Contact />
      </main>

      <footer
        className="relative z-10 px-6 md:px-16 lg:px-24 py-8"
        style={{ borderTop: "1px solid rgba(0,255,135,0.1)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
            alex.dev — built with React + Tailwind
          </span>
          <span className="font-mono text-xs" style={{ color: "rgba(107,138,107,0.4)" }}>
            © 2026 Alex Chen. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
