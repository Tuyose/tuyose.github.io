import { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import { fetchGitHubRepos, type GitHubRepo } from "../services/github";

export function Projects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos().then((repos) => {
      setProjects(repos.slice(0, 3));
      setLoading(false);
    });
  }, []);

  const accentColors = ["#00ff87", "#00c4ff", "#ff6b6b"];

  return (
    <section id="projects" className="py-24 px-6 md:px-16 lg:px-24">
      <div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, #00ff87, transparent)" }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="font-mono text-xs mb-2" style={{ color: "#00ff87" }}>
            // featured projects
          </div>
          <h2 className="font-sans" style={{ fontWeight: 700, fontSize: "2.25rem", color: "#e8f0e8" }}>
            Things I've Built
          </h2>
        </div>

        {loading ? (
          <div className="text-center font-mono text-sm" style={{ color: "#6b8a6b" }}>
            Loading projects…
          </div>
        ) : (
          <div className="flex flex-col gap-20">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image placeholder */}
                <div
                  className="relative overflow-hidden group"
                  style={{
                    borderRadius: "4px",
                    border: `1px solid ${accentColors[i]}40`,
                    background: `linear-gradient(135deg, ${accentColors[i]}10, transparent 60%)`,
                    aspectRatio: "16 / 9",
                    ...(i % 2 === 1 ? { direction: "ltr" } : {}),
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Github size={48} style={{ color: accentColors[i], opacity: 0.5 }} />
                  </div>
                  <div
                    className="absolute top-3 left-3 font-mono text-xs px-2 py-1"
                    style={{
                      background: "rgba(10,14,15,0.85)",
                      color: accentColors[i],
                      border: `1px solid ${accentColors[i]}40`,
                      borderRadius: "2px",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {project.language || "Mixed"}
                  </div>
                </div>

                {/* Content */}
                <div style={i % 2 === 1 ? { direction: "ltr" } : {}}>
                  <h3
                    className="font-sans mb-3"
                    style={{ fontWeight: 700, fontSize: "1.75rem", color: "#e8f0e8" }}
                  >
                    {project.name}
                  </h3>

                  <p className="font-sans text-sm mb-6 leading-relaxed" style={{ color: "#6b8a6b" }}>
                    {project.description || "Open source project on GitHub"}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    {[
                      { label: "Stars", value: project.stargazers_count.toLocaleString() },
                      { label: "Forks", value: project.forks_count },
                      { label: "Language", value: project.language || "Mixed" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="font-mono text-sm font-semibold" style={{ color: accentColors[i] }}>
                          {stat.value}
                        </div>
                        <div className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Topics/Tags */}
                  {project.topics && project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.topics.slice(0, 5).map((topic) => (
                        <span
                          key={topic}
                          className="font-mono text-xs px-3 py-1"
                          style={{
                            background: "rgba(0,255,135,0.06)",
                            color: "#6b8a6b",
                            border: "1px solid rgba(0,255,135,0.12)",
                            borderRadius: "2px",
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.homepage || project.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-mono text-sm transition-colors duration-150"
                      style={{ color: accentColors[i] }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                    >
                      <ExternalLink size={14} />
                      View Project
                    </a>
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-mono text-sm transition-colors duration-150"
                      style={{ color: "#6b8a6b" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#e8f0e8")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6b8a6b")}
                    >
                      <Github size={14} />
                      Source
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
