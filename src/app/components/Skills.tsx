import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { fetchGitHubRepos } from "../services/github";

const PREDEFINED_TOOLS = [
  "Git", "GitHub", "Docker", "Linux", "macOS", "Windows",
  "VS Code", "Terminal", "Bash", "PowerShell", "npm", "pnpm",
];

const SKILL_LEVELS: Record<string, number> = {
  TypeScript: 95,
  JavaScript: 90,
  Python: 80,
  Rust: 85,
  Go: 75,
  C: 70,
  "C++": 65,
  Java: 75,
  PHP: 60,
  Shell: 85,
  HTML: 90,
  CSS: 85,
  React: 95,
  Vue: 70,
  Node: 90,
};

export function Skills() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos().then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  const skillGroups = useMemo(() => {
    // Extract languages from repos
    const langMap: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });

    // Sort by frequency
    const languages = Object.entries(langMap)
      .sort(([, a], [, b]) => b - a)
      .map(([lang]) => ({
        name: lang,
        level: SKILL_LEVELS[lang] || 70,
      }));

    return [
      {
        category: "Languages",
        skills: languages.slice(0, 5),
      },
      {
        category: "Frontend",
        skills: [
          { name: "React", level: 95 },
          { name: "TypeScript", level: 95 },
          { name: "CSS / Tailwind", level: 90 },
          { name: "HTML", level: 90 },
        ],
      },
      {
        category: "Backend & Tools",
        skills: [
          { name: "Node.js", level: 90 },
          { name: "Git", level: 95 },
          { name: "Docker", level: 80 },
          { name: "Linux", level: 85 },
        ],
      },
    ];
  }, [repos]);

  if (loading) {
    return (
      <section id="skills" className="py-24 px-6 md:px-16 lg:px-24 relative">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-xs mb-2" style={{ color: "#00ff87" }}>
            // technical profile
          </div>
          <h2 className="font-sans" style={{ fontWeight: 700, fontSize: "2.25rem", color: "#e8f0e8" }}>
            Skills & Stack
          </h2>
          <div className="mt-12 font-mono text-sm" style={{ color: "#6b8a6b" }}>
            Loading skills…
          </div>
        </div>
      </section>
    );
  }

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
          {skillGroups.map((group, gi) => (
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
            {PREDEFINED_TOOLS.map((tool) => (
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
