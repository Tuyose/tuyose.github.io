import { motion } from "motion/react";

const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", level: 95 },
      { name: "Rust", level: 85 },
      { name: "Go", level: 80 },
      { name: "Python", level: 75 },
      { name: "C / C++", level: 60 },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "CSS / Tailwind", level: 90 },
      { name: "WebGL / WebAssembly", level: 65 },
      { name: "Svelte", level: 55 },
      { name: "Three.js", level: 50 },
    ],
  },
  {
    category: "Infrastructure",
    skills: [
      { name: "Kubernetes", level: 85 },
      { name: "PostgreSQL", level: 90 },
      { name: "Redis", level: 85 },
      { name: "Kafka", level: 75 },
      { name: "Terraform", level: 70 },
    ],
  },
];

const TOOLS = [
  "Neovim", "tmux", "Git", "Docker", "GitHub Actions",
  "Nix", "Linux", "macOS", "AWS", "GCP",
  "Prometheus", "Grafana", "Loki", "OpenTelemetry", "Datadog",
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 lg:px-24 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="font-mono text-xs mb-2" style={{ color: "#00ff87" }}>
            // technical profile
          </div>
          <h2 className="font-sans" style={{ fontWeight: 700, fontSize: "2.25rem", color: "#e8f0e8" }}>
            Skills & Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="p-6"
              style={{
                background: "#0f1512",
                border: "1px solid rgba(0,255,135,0.1)",
                borderRadius: "4px",
              }}
            >
              <div className="font-mono text-xs mb-5" style={{ color: "#00ff87" }}>
                {group.category}
              </div>
              <div className="flex flex-col gap-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-mono text-xs" style={{ color: "#e8f0e8" }}>
                        {skill.name}
                      </span>
                      <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-px w-full overflow-hidden"
                      style={{ background: "rgba(0,255,135,0.1)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: gi * 0.1 + si * 0.05, ease: "easeOut" }}
                        className="h-full"
                        style={{ background: "#00ff87" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools */}
        <div>
          <div className="font-mono text-xs mb-5" style={{ color: "#6b8a6b" }}>
            // tools & environment
          </div>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="font-mono text-xs px-3 py-1.5 transition-all duration-150 cursor-default"
                style={{
                  background: "transparent",
                  color: "#6b8a6b",
                  border: "1px solid rgba(0,255,135,0.12)",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.color = "#00ff87";
                  (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(0,255,135,0.35)";
                  (e.currentTarget as HTMLSpanElement).style.background = "rgba(0,255,135,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.color = "#6b8a6b";
                  (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(0,255,135,0.12)";
                  (e.currentTarget as HTMLSpanElement).style.background = "transparent";
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
