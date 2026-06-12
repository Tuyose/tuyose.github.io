import { motion } from "motion/react";

// Generate mock contribution data — 52 weeks × 7 days
function generateContributions() {
  const weeks = [];
  for (let w = 0; w < 52; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      // Weighted random with more active days
      const rand = Math.random();
      let count = 0;
      if (rand > 0.55) count = Math.floor(Math.random() * 3) + 1;
      if (rand > 0.75) count = Math.floor(Math.random() * 5) + 4;
      if (rand > 0.92) count = Math.floor(Math.random() * 8) + 9;
      days.push(count);
    }
    weeks.push(days);
  }
  return weeks;
}

const CONTRIBUTIONS = generateContributions();

function getColor(count: number) {
  if (count === 0) return "rgba(0,255,135,0.05)";
  if (count <= 3) return "rgba(0,255,135,0.18)";
  if (count <= 6) return "rgba(0,255,135,0.38)";
  if (count <= 10) return "rgba(0,255,135,0.62)";
  return "#00ff87";
}

const RECENT_ACTIVITY = [
  { action: "Pushed 3 commits to", target: "flux-runtime", repo: "flux-runtime", time: "2h ago", branch: "feat/io-uring" },
  { action: "Opened PR #47 in", target: "nextql", repo: "nextql", time: "8h ago", branch: "cache-invalidation" },
  { action: "Merged PR #203 in", target: "devenv", repo: "devenv", time: "1d ago", branch: "flake-update" },
  { action: "Released v1.4.0 of", target: "pgstream", repo: "pgstream", time: "2d ago", branch: "main" },
  { action: "Created repository", target: "c-arena", repo: "c-arena", time: "3d ago", branch: "main" },
  { action: "Starred", target: "oven-sh/bun", repo: "bun", time: "3d ago", branch: "" },
];

export function Activity() {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contribution heatmap */}
          <div
            className="lg:col-span-2 p-6"
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
            <div className="flex flex-col gap-4">
              {RECENT_ACTIVITY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  className="flex flex-col gap-1 pb-4"
                  style={{ borderBottom: i < RECENT_ACTIVITY.length - 1 ? "1px solid rgba(0,255,135,0.06)" : "none" }}
                >
                  <div className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
                    {item.action}{" "}
                    <span style={{ color: "#00ff87" }}>{item.target}</span>
                  </div>
                  {item.branch && (
                    <div className="font-mono text-xs" style={{ color: "rgba(0,255,135,0.4)" }}>
                      ⎇ {item.branch}
                    </div>
                  )}
                  <div className="font-mono text-xs" style={{ color: "rgba(107,138,107,0.5)" }}>
                    {item.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
