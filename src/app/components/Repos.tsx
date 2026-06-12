import { useEffect, useMemo, useState } from "react";
import { Star, GitFork, Eye, ExternalLink, Code2 } from "lucide-react";
import { motion } from "motion/react";
import { fetchGitHubRepos, formatTimeAgo, type GitHubRepo } from "../services/github";

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

export function Repos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filter, setFilter] = useState("All");
  const [pinned, setPinned] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos().then((data) => {
      setRepos(data);
      setLoading(false);
    });
  }, []);

  const languages = useMemo(
    () => ["All", ...Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean)))],
    [repos]
  );

  const sortedRepos = useMemo(
    () => [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count),
    [repos]
  );

  const sourceRepos = pinned ? sortedRepos.slice(0, 6) : sortedRepos;

  const filtered = sourceRepos.filter((repo) => {
    if (filter !== "All" && repo.language !== filter) return false;
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
            {languages.map((lang) => (
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

        {loading ? (
          <div className="text-center font-mono text-sm" style={{ color: "#6b8a6b" }}>
            Loading repositories…
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <RepoCard repo={repo} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="https://github.com/Tuyose?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm inline-flex items-center gap-2 transition-colors duration-150"
            style={{ color: "#6b8a6b" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#00ff87")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6b8a6b")}
          >
            <Code2 size={14} />
            View all repositories on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const topics = Array.isArray(repo.topics) ? repo.topics : [];

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="block h-full"
    >
      <div
        className="flex flex-col h-full p-5 transition-all duration-200 group"
        style={{
          background: "#0f1512",
          border: "1px solid rgba(0,255,135,0.1)",
          borderRadius: "4px",
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Code2 size={14} style={{ color: "#00ff87" }} />
            <span className="font-mono text-sm font-medium" style={{ color: "#00ff87" }}>
              {repo.name}
            </span>
          </div>
          <ExternalLink size={13} style={{ color: "#6b8a6b" }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <p className="font-sans text-sm flex-1 mb-4 leading-relaxed" style={{ color: "#6b8a6b" }}>
          {repo.description || "No description provided."}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {topics.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className="font-mono text-xs px-2 py-0.5"
              style={{
                background: "rgba(0,255,135,0.07)",
                color: "#6b8a6b",
                borderRadius: "2px",
              }}
            >
              {topic}
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
              {repo.language || "Unknown"}
            </span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Star size={12} style={{ color: "#6b8a6b" }} />
            <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
              {repo.stargazers_count.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={12} style={{ color: "#6b8a6b" }} />
            <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
              {repo.forks_count}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={12} style={{ color: "#6b8a6b" }} />
            <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
              {repo.watchers_count}
            </span>
          </div>
        </div>

        <div className="font-mono text-[11px] mt-4" style={{ color: "rgba(107,138,107,0.6)" }}>
          Updated {formatTimeAgo(repo.updated_at)}
        </div>
      </div>
    </a>
  );
}
