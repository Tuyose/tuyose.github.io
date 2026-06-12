import { useState } from "react";
import { Star, GitFork, Eye, ExternalLink, Code2 } from "lucide-react";
import { motion } from "motion/react";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  Rust: "#ce422b",
  Go: "#00add8",
  Python: "#3572a5",
  JavaScript: "#f1e05a",
  C: "#555555",
  "C++": "#f34b7d",
  Shell: "#89e051",
};

const REPOS = [
  {
    name: "flux-runtime",
    description: "A lightweight async runtime for Rust with zero-cost abstractions and work-stealing thread pools.",
    stars: 847,
    forks: 62,
    watchers: 34,
    language: "Rust",
    topics: ["runtime", "async", "concurrency"],
    updated: "2 days ago",
    pinned: true,
  },
  {
    name: "devenv",
    description: "Reproducible development environments using Nix — one command to rule them all.",
    stars: 523,
    forks: 41,
    watchers: 19,
    language: "Shell",
    topics: ["nix", "devops", "developer-tools"],
    updated: "5 days ago",
    pinned: true,
  },
  {
    name: "nextql",
    description: "Type-safe GraphQL client for Next.js with automatic cache invalidation and optimistic updates.",
    stars: 394,
    forks: 28,
    watchers: 15,
    language: "TypeScript",
    topics: ["graphql", "nextjs", "react"],
    updated: "1 week ago",
    pinned: true,
  },
  {
    name: "pgstream",
    description: "Real-time PostgreSQL CDC streaming to Kafka, Redis, and webhooks with guaranteed delivery.",
    stars: 312,
    forks: 24,
    watchers: 11,
    language: "Go",
    topics: ["postgresql", "kafka", "cdc", "streaming"],
    updated: "2 weeks ago",
    pinned: true,
  },
  {
    name: "mlx-bench",
    description: "Benchmarking harness for ML model inference across hardware backends — GPU, CPU, Apple Silicon.",
    stars: 178,
    forks: 14,
    watchers: 8,
    language: "Python",
    topics: ["ml", "benchmarks", "performance"],
    updated: "3 weeks ago",
    pinned: false,
  },
  {
    name: "c-arena",
    description: "Fast arena allocator implementation in C with thread-safe bump pointer allocation.",
    stars: 134,
    forks: 9,
    watchers: 5,
    language: "C",
    topics: ["allocator", "memory", "systems"],
    updated: "1 month ago",
    pinned: false,
  },
];

const ALL_LANGS = ["All", ...Array.from(new Set(REPOS.map((r) => r.language)))];

export function Repos() {
  const [filter, setFilter] = useState("All");
  const [pinned, setPinned] = useState(true);

  const filtered = REPOS.filter((r) => {
    if (pinned && !r.pinned) return false;
    if (filter !== "All" && r.language !== filter) return false;
    return true;
  });

  return (
    <section id="repos" className="py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs mb-2" style={{ color: "#00ff87" }}>
              // public repositories
            </div>
            <h2 className="font-sans" style={{ fontWeight: 700, fontSize: "2.25rem", color: "#e8f0e8" }}>
              Open Source Work
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setPinned(!pinned)}
              className="font-mono text-xs px-3 py-1.5 transition-all duration-150"
              style={{
                background: pinned ? "rgba(0,255,135,0.12)" : "transparent",
                color: pinned ? "#00ff87" : "#6b8a6b",
                border: `1px solid ${pinned ? "#00ff87" : "rgba(0,255,135,0.15)"}`,
                borderRadius: "2px",
              }}
            >
              ★ pinned
            </button>
            {ALL_LANGS.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className="font-mono text-xs px-3 py-1.5 transition-all duration-150"
                style={{
                  background: filter === lang ? "rgba(0,255,135,0.12)" : "transparent",
                  color: filter === lang ? "#00ff87" : "#6b8a6b",
                  border: `1px solid ${filter === lang ? "#00ff87" : "rgba(0,255,135,0.15)"}`,
                  borderRadius: "2px",
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((repo, i) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <RepoCard repo={repo} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="font-mono text-sm inline-flex items-center gap-2 transition-colors duration-150"
            style={{ color: "#6b8a6b" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#00ff87")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6b8a6b")}
          >
            <Code2 size={14} />
            View all 84 repositories on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

function RepoCard({ repo }: { repo: (typeof REPOS)[0] }) {
  return (
    <div
      className="flex flex-col h-full p-5 transition-all duration-200 group cursor-pointer"
      style={{
        background: "#0f1512",
        border: "1px solid rgba(0,255,135,0.1)",
        borderRadius: "4px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,135,0.35)";
        (e.currentTarget as HTMLDivElement).style.background = "#131a15";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,135,0.1)";
        (e.currentTarget as HTMLDivElement).style.background = "#0f1512";
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Code2 size={14} style={{ color: "#00ff87" }} />
          <span className="font-mono text-sm font-medium" style={{ color: "#00ff87" }}>
            {repo.name}
          </span>
        </div>
        <ExternalLink
          size={13}
          style={{ color: "#6b8a6b" }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <p className="font-sans text-sm flex-1 mb-4 leading-relaxed" style={{ color: "#6b8a6b" }}>
        {repo.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {repo.topics.map((t) => (
          <span
            key={t}
            className="font-mono text-xs px-2 py-0.5"
            style={{
              background: "rgba(0,255,135,0.07)",
              color: "#6b8a6b",
              borderRadius: "2px",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-3" style={{ borderTop: "1px solid rgba(0,255,135,0.08)" }}>
        <div className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: LANG_COLORS[repo.language] ?? "#888" }}
          />
          <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
            {repo.language}
          </span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <Star size={12} style={{ color: "#6b8a6b" }} />
          <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
            {repo.stars.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork size={12} style={{ color: "#6b8a6b" }} />
          <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
            {repo.forks}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Eye size={12} style={{ color: "#6b8a6b" }} />
          <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
            {repo.watchers}
          </span>
        </div>
      </div>
    </div>
  );
}
