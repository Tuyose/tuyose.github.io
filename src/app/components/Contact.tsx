import { Github, Twitter, Linkedin, Mail, Terminal } from "lucide-react";
import { motion } from "motion/react";

const LINKS = [
  { icon: Github, label: "GitHub", handle: "@Tuyose", url: "https://github.com/Tuyose" },
  { icon: Twitter, label: "Twitter", handle: "@Tuyose", url: "https://twitter.com/Tuyose" },
  { icon: Linkedin, label: "LinkedIn", handle: "Tuyose", url: "https://www.linkedin.com/in/Tuyose" },
  { icon: Mail, label: "Email", handle: "hello@tuyose.dev", url: "mailto:hello@tuyose.dev" },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-16 lg:px-24 relative">
      <div
        className="absolute left-0 right-0 top-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, #00ff87, transparent)" }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-mono text-xs mb-3" style={{ color: "#00ff87" }}>
              // let's connect
            </div>
            <h2 className="font-sans mb-6" style={{ fontWeight: 700, fontSize: "2.25rem", color: "#e8f0e8" }}>
              Get In Touch
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-10" style={{ color: "#6b8a6b" }}>
              Currently open to interesting full-time roles and consulting engagements. If you're working on hard
              problems in systems, infrastructure, or developer tooling — I'd love to hear about it.
            </p>

            <div className="flex flex-col gap-4">
              {LINKS.map(({ icon: Icon, label, handle, url }) => (
                <a
                  key={label}
                  href={url}
                  className="flex items-center gap-4 p-4 group transition-all duration-150"
                  style={{
                    border: "1px solid rgba(0,255,135,0.1)",
                    borderRadius: "4px",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,135,0.35)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,135,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,135,0.1)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  <Icon size={18} style={{ color: "#00ff87" }} />
                  <div>
                    <div className="font-mono text-xs mb-0.5" style={{ color: "#6b8a6b" }}>
                      {label}
                    </div>
                    <div className="font-mono text-sm" style={{ color: "#e8f0e8" }}>
                      {handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              background: "#0a0e0f",
              border: "1px solid rgba(0,255,135,0.2)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {/* Terminal chrome */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "#0f1512", borderBottom: "1px solid rgba(0,255,135,0.1)" }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <div className="flex items-center gap-1.5 ml-4">
                <Terminal size={11} style={{ color: "#6b8a6b" }} />
                <span className="font-mono text-xs" style={{ color: "#6b8a6b" }}>
                  alex@portfolio — ~/contact
                </span>
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-xs leading-7" style={{ color: "#6b8a6b" }}>
              <div>
                <span style={{ color: "#00ff87" }}>❯</span>{" "}
                <span style={{ color: "#e8f0e8" }}>curl</span>{" "}
                <span style={{ color: "#00c4ff" }}>https://alex.dev/api/contact</span>
              </div>
              <div className="mt-1" style={{ color: "#e8f0e8" }}>
                {"{"}
              </div>
              <div className="ml-4">
                <span style={{ color: "#00c4ff" }}>"name"</span>
                {': '}
                <span style={{ color: "#00ff87" }}>"Alex Chen"</span>,
              </div>
              <div className="ml-4">
                <span style={{ color: "#00c4ff" }}>"role"</span>
                {': '}
                <span style={{ color: "#00ff87" }}>"Full-Stack / Systems Engineer"</span>,
              </div>
              <div className="ml-4">
                <span style={{ color: "#00c4ff" }}>"location"</span>
                {': '}
                <span style={{ color: "#00ff87" }}>"San Francisco, CA"</span>,
              </div>
              <div className="ml-4">
                <span style={{ color: "#00c4ff" }}>"available"</span>
                {': '}
                <span style={{ color: "#00ff87" }}>true</span>,
              </div>
              <div className="ml-4">
                <span style={{ color: "#00c4ff" }}>"interests"</span>
                {': '}[
              </div>
              <div className="ml-8">
                <span style={{ color: "#00ff87" }}>"distributed systems"</span>,
              </div>
              <div className="ml-8">
                <span style={{ color: "#00ff87" }}>"dev tooling"</span>,
              </div>
              <div className="ml-8">
                <span style={{ color: "#00ff87" }}>"open source"</span>
              </div>
              <div className="ml-4">]</div>
              <div>{"}"}</div>
              <div className="mt-3">
                <span style={{ color: "#00ff87" }}>❯</span>{" "}
                <span className="animate-pulse">█</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
