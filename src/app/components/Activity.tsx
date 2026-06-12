import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fetchGitHubEvents, formatTimeAgo } from "../services/github";

const CONTRIBUTIONS = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))
);

function getColor(count: number) {
  if (count === 0) return "rgba(0,255,135,0.05)";
  if (count <= 1) return "rgba(0,255,135,0.18)";
  if (count <= 2) return "rgba(0,255,135,0.38)";
  if (count <= 3) return "rgba(0,255,135,0.62)";
  return "#00ff87";
}

function normalizeEvent(event: any) {
  const repoName = event.repo?.name?.split("/")[1] || "repo";
  const createdAt = event.created_at;
  switch (event.type) {
    case "PushEvent": {
      const commitCount = event.payload?.size ?? 1;
      return {
        action: `Pushed ${commitCount} commit${commitCount === 1 ? "" : "s"} to`,
        target: repoName,
        branch: event.payload?.ref?.replace("refs/heads/", "") || "main",
        time: formatTimeAgo(createdAt),
      };
    }
    case "PullRequestEvent": {
      const action = event.payload?.action === "closed" && event.payload?.pull_request?.merged
        ? "Merged PR"
        : event.payload?.action === "opened"
        ? "Opened PR"
        : "Updated PR";
      const number = event.payload?.number || event.payload?.pull_request?.number || "?";
      return {
        action: `${action} #${number} in`,
        target: repoName,
        branch: event.payload?.pull_request?.head?.ref || "main",
        time: formatTimeAgo(createdAt),
      };
    }
    case "CreateEvent":
      return {
        action: "Created repository",
        target: repoName,
        branch: "",
        time: formatTimeAgo(createdAt),
      };
    case "WatchEvent":
      return {
        action: "Starred",
        target: repoName,
        branch: "",
        time: formatTimeAgo(createdAt),
      };
    case "IssuesEvent":
      return {
        action: `${event.payload?.action === "opened" ? "Opened issue" : "Updated issue"} #${event.payload?.issue?.number}`,
        target: repoName,
        branch: "",
        time: formatTimeAgo(createdAt),
      };
    default:
      return {
        action: event.type.replace(/Event$/, ""),
        target: repoName,
        branch: "",
        time: formatTimeAgo(createdAt),
      };
  }
}

export function Activity() {
  const [recentActivity, setRecentActivity] = useState<{ action: string; target: string; branch: string; time: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubEvents().then((events) => {
      const normalized = events.slice(0, 10).map((event) => normalizeEvent(event));
      setRecentActivity(normalized);
      setLoading(false);
    });
  }, []);

  return (
    <section id="activity" className="py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="font-mono text-xs mb-2" style={{ color: "#00ff87" }}>
            // github activity
          </div>
          <h2 className="font-sans" style={{ fontWeight: 700, fontSize: "2.25rem", color: "#e8f0e8" }}>
            Contribution Graph
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {/* Contribution heatmap */}
          <div
            className="p-6"
            style={{
              background: "#0f1512",
              border: "1px solid rgba(0,255,135,0.1)",
              borderRadius: "4px",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
                1,847 contributions in the last year
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>Less</span>
                {[0, 2, 5, 8, 14].map((c) => (
                  <div
                    key={c}
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ background: getColor(c), border: "1px solid rgba(0,255,135,0.08)" }}
                  />
                ))}
                <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>More</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {CONTRIBUTIONS.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((count, di) => (
                      <motion.div
                        key={di}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.15, delay: (wi * 7 + di) * 0.002 }}
                        className="w-2.5 h-2.5 rounded-sm cursor-pointer"
                        style={{
                          background: getColor(count),
                          border: "1px solid rgba(0,255,135,0.06)",
                        }}
                        title={`${count} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div
            className="p-6"
            style={{
              background: "#0f1512",
              border: "1px solid rgba(0,255,135,0.1)",
              borderRadius: "4px",
            }}
          >
            <div className="font-mono text-xs mb-5" style={{ color: "#6b8a6b" }}>
              recent activity
            </div>
            {loading ? (
              <div className="font-mono text-xs" style={{ color: "rgba(107,138,107,0.5)" }}>
                Loading activity…
              </div>
            ) : recentActivity.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {recentActivity.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="flex-1 min-w-[280px]"
                    style={{
                      padding: "12px",
                      background: "rgba(0,255,135,0.03)",
                      border: "1px solid rgba(0,255,135,0.08)",
                      borderRadius: "3px",
                    }}
                  >
                    <div className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
                      {item.action}{" "}
                      <span style={{ color: "#00ff87" }}>{item.target}</span>
                    </div>
                    {item.branch && (
                      <div className="font-mono text-xs mt-1" style={{ color: "rgba(0,255,135,0.4)" }}>
                        ⎇ {item.branch}
                      </div>
                    )}
                    <div className="font-mono text-xs mt-1" style={{ color: "rgba(107,138,107,0.5)" }}>
                      {item.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="font-mono text-xs" style={{ color: "rgba(107,138,107,0.5)" }}>
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
