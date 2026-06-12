import { ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";

const PROJECTS = [
  {
    id: 1,
    title: "Flux Runtime",
    tagline: "Async runtime for Rust",
    description:
      "A production-grade async runtime built from scratch in Rust. Features a work-stealing thread pool, timer wheel, io_uring integration for Linux, and a fully compatible Tokio API surface. Used by 3 production services handling 200k req/s.",
    stack: ["Rust", "io_uring", "MPSC", "epoll"],
    metrics: ["200k req/s", "0.3ms p99", "4k GitHub stars"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop&auto=format",
    demo: "#",
    repo: "#",
    accent: "#00ff87",
  },
  {
    id: 2,
    title: "NextQL",
    tagline: "Type-safe GraphQL for Next.js",
    description:
      "End-to-end type safety from your database schema to React components — zero boilerplate. Auto-generates hooks, normalized caching, real-time subscriptions, and optimistic updates. Drops in to replace Apollo or urql in minutes.",
    stack: ["TypeScript", "GraphQL", "Next.js", "React"],
    metrics: ["<3kb gzip", "99.8% cache hit", "500+ users"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop&auto=format",
    demo: "#",
    repo: "#",
    accent: "#00c4ff",
  },
  {
    id: 3,
    title: "pgStream",
    tagline: "PostgreSQL → anywhere, in real-time",
    description:
      "Change Data Capture pipeline that streams Postgres WAL events to Kafka, Redis Streams, webhooks, or S3. Handles schema migrations gracefully, guaranteed delivery with exactly-once semantics, and a built-in web dashboard.",
    stack: ["Go", "PostgreSQL", "Kafka", "Docker"],
    metrics: ["50k events/s", "Exactly-once", "No data loss"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=450&fit=crop&auto=format",
    demo: "#",
    repo: "#",
    accent: "#ff6b6b",
  },
];

export function Projects() {
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

        <div className="flex flex-col gap-20">
          {PROJECTS.map((project, i) => (
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
              {/* Image */}
              <div
                className="relative overflow-hidden group"
                style={{
                  borderRadius: "4px",
                  border: `1px solid rgba(${project.accent === "#00ff87" ? "0,255,135" : project.accent === "#00c4ff" ? "0,196,255" : "255,107,107"},0.15)`,
                  ...(i % 2 === 1 ? { direction: "ltr" } : {}),
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${project.accent}20, transparent 60%)` }}
                />
                <div
                  className="absolute top-3 left-3 font-mono text-xs px-2 py-1"
                  style={{
                    background: "rgba(10,14,15,0.85)",
                    color: project.accent,
                    border: `1px solid ${project.accent}40`,
                    borderRadius: "2px",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {project.tagline}
                </div>
              </div>

              {/* Content */}
              <div style={i % 2 === 1 ? { direction: "ltr" } : {}}>
                <h3
                  className="font-sans mb-3"
                  style={{ fontWeight: 700, fontSize: "1.75rem", color: "#e8f0e8" }}
                >
                  {project.title}
                </h3>

                <p className="font-sans text-sm mb-6 leading-relaxed" style={{ color: "#6b8a6b" }}>
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {project.metrics.map((m) => (
                    <div key={m} className="text-center">
                      <div className="font-mono text-sm font-semibold" style={{ color: project.accent }}>
                        {m}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3 py-1"
                      style={{
                        background: "rgba(0,255,135,0.06)",
                        color: "#6b8a6b",
                        border: "1px solid rgba(0,255,135,0.12)",
                        borderRadius: "2px",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 font-mono text-sm transition-colors duration-150"
                    style={{ color: project.accent }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                  <a
                    href={project.repo}
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
      </div>
    </section>
  );
}
