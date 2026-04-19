"use client";

import { Plus, Activity, CheckCircle2, HeartPulse } from "lucide-react";
import styles from "./page.module.css";

const stats = [
  { label: "Active Agents", value: "12", icon: Activity },
  { label: "Tasks Completed (24h)", value: "1,284", icon: CheckCircle2 },
  { label: "System Health", value: "99.9%", icon: HeartPulse, color: "var(--success)" },
];

const agents = [
  { name: "Market Analyst", status: "Thinking", task: "Processing competitor pricing data...", active: true },
  { name: "Research Lead", status: "Idle", task: "Awaiting next instruction...", active: false },
  { name: "Code Reviewer", status: "Reviewing", task: "Analyzing PR #829 for security vulnerabilities...", active: true },
  { name: "QA Engineer", status: "Testing", task: "Running regression suite on v2.1.0-alpha", active: true },
];

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <button className={styles.newBtn}>
          <Plus size={18} />
          <span>New Orchestration</span>
        </button>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={styles.card}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue} style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className={styles.statIcon}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.agentGrid}>
        {agents.map((agent) => (
          <div key={agent.name} className={`${styles.card} ${styles.agentCard}`}>
            <div className={styles.agentHeader}>
              <span className={styles.agentName}>{agent.name}</span>
              <div className={styles.statusBadge}>
                <div className={`${styles.dot} ${agent.active ? styles.activeDot : ""}`} />
                <span>{agent.status}</span>
              </div>
            </div>
            <div className={styles.agentTask}>
              {`> ${agent.task}`}
            </div>
          </div>
        ))}

        <div className={styles.summaryContainer}>
          <div className={styles.summaryHeader}>
            <div className={styles.summaryTitle}>
              <span className={styles.agentName}>Executive Summary</span>
              <span className={styles.timestamp}>Generated 2 minutes ago</span>
            </div>
          </div>
          
          <div className={styles.atomicGrid}>
            <div className={`${styles.card} ${styles.atomicCard}`}>
              <h3>Market Position</h3>
              <p>SUPAA is positioned to capture significant market share by focusing on <strong>low-latency orchestration</strong> and <strong>hybrid cloud deployments</strong>.</p>
            </div>
            <div className={`${styles.card} ${styles.atomicCard}`}>
              <h3>Model Insights</h3>
              <p>Competitor A has a 15% lead in total model count. However, SUPAA leads in agent-to-agent communication efficiency by 40%.</p>
            </div>
            <div className={`${styles.card} ${styles.atomicCard}`}>
              <h3>Strategic Focus</h3>
              <p>Prioritize <strong>cross-agent memory consistency</strong> and <strong>real-time feedback loops</strong> for the next release cycle.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
