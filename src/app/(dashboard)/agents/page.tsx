"use client";

import { Users, Brain, Shield, Search, Terminal, Plus, ExternalLink } from "lucide-react";
import styles from "./page.module.css";

const agents = [
  { 
    name: "Lead ML Engineer", 
    role: "Engineering", 
    status: "Active", 
    capabilities: ["Gemma4 Fine-tuning", "Model Evaluation", "ML Infrastructure"],
    icon: Brain,
    color: "#A855F7"
  },
  { 
    name: "Frontend Engineer", 
    role: "Development", 
    status: "Active", 
    capabilities: ["React", "Next.js", "Nova Design System", "Prototyping"],
    icon: Terminal,
    color: "var(--accent)"
  },
  { 
    name: "CTO", 
    role: "Leadership", 
    status: "Error", 
    capabilities: ["AI Architecture", "Technical Strategy", "Engineering Management"],
    icon: Shield,
    color: "var(--error-color)"
  },
  { 
    name: "QA Lead", 
    role: "Quality", 
    status: "Error", 
    capabilities: ["End-to-End Testing", "UI/UX Audit", "Quality Reports"],
    icon: Shield,
    color: "var(--error-color)"
  },
  { 
    name: "Infra DevOps", 
    role: "Infrastructure", 
    status: "Idle", 
    capabilities: ["GPU Compute", "Docker", "K8s", "CI/CD"],
    icon: Terminal,
    color: "var(--text-secondary)"
  },
  { 
    name: "Lead Engineer", 
    role: "Engineering", 
    status: "Idle", 
    capabilities: ["Full-stack", "Core Infrastructure", "Paperclip Adapters"],
    icon: Brain,
    color: "var(--text-secondary)"
  },
];

export default function AgentsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Agents</h1>
          <p className={styles.subtitle}>Manage your autonomous workforce.</p>
        </div>
        <button className={styles.newBtn}>
          <Plus size={18} />
          <span>Hire New Agent</span>
        </button>
      </header>

      <div className={styles.grid}>
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <div key={agent.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox} style={{ backgroundColor: `${agent.color}15`, color: agent.color }}>
                  <Icon size={24} />
                </div>
                <div className={styles.statusBadge}>
                  <div className={`${styles.dot} ${styles[agent.status.toLowerCase()]}`} />
                  <span>{agent.status}</span>
                </div>
              </div>

              <div className={styles.info}>
                <h3 className={styles.name}>{agent.name}</h3>
                <p className={styles.role}>{agent.role}</p>
              </div>

              <div className={styles.capabilities}>
                {agent.capabilities.map((cap) => (
                  <span key={cap} className={styles.capBadge}>{cap}</span>
                ))}
              </div>

              <div className={styles.footer}>
                <button className={styles.actionBtn}>Configure</button>
                <button className={styles.viewBtn}>
                  <ExternalLink size={14} />
                  <span>Logs</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
