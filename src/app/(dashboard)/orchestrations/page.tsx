"use client";

import Link from "next/link";
import { Workflow, Clock, CheckCircle2, AlertCircle, Play, ChevronRight } from "lucide-react";
import styles from "./page.module.css";

const orchestrations = [
  { 
    id: "ORCH-8291", 
    name: "Market Intelligence Sweep", 
    status: "RUNNING", 
    startTime: "10 minutes ago", 
    agents: ["Dispatcher", "Researcher", "Analyst", "Synthesizer"] 
  },
  { 
    id: "ORCH-7102", 
    name: "Code Security Audit (v2.1.0)", 
    status: "COMPLETED", 
    startTime: "2 hours ago", 
    agents: ["Code Reviewer", "Security Lead", "QA Engineer"] 
  },
  { 
    id: "ORCH-6954", 
    name: "Competitor Pricing Analysis", 
    status: "FAILED", 
    startTime: "5 hours ago", 
    agents: ["Market Analyst", "Data Scraper"] 
  },
  { 
    id: "ORCH-6541", 
    name: "User Feedback Synthesis", 
    status: "COMPLETED", 
    startTime: "Yesterday", 
    agents: ["Sentiment Analyst", "Synthesizer"] 
  },
];

export default function OrchestrationsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Orchestrations</h1>
          <p className={styles.subtitle}>Monitor and manage multi-agent workflows.</p>
        </div>
        <button className={styles.newBtn}>
          <Play size={18} />
          <span>New Orchestration</span>
        </button>
      </header>

      <div className={styles.list}>
        {orchestrations.map((orch) => (
          <Link 
            key={orch.id} 
            href={`/orchestrations/${orch.id}`}
            className={styles.row}
          >
            <div className={styles.mainInfo}>
              <div className={styles.iconWrapper}>
                <Workflow size={20} />
              </div>
              <div>
                <div className={styles.name}>{orch.name}</div>
                <div className={styles.id}>{orch.id}</div>
              </div>
            </div>

            <div className={styles.agentGroup}>
              {orch.agents.map((agent, i) => (
                <div key={i} className={styles.agentBadge} title={agent}>
                  {agent.charAt(0)}
                </div>
              ))}
            </div>

            <div className={styles.timeInfo}>
              <Clock size={14} />
              <span>{orch.startTime}</span>
            </div>

            <div className={`${styles.status} ${styles[orch.status.toLowerCase()]}`}>
              {orch.status === "RUNNING" && <div className={styles.pulse} />}
              {orch.status === "COMPLETED" && <CheckCircle2 size={16} />}
              {orch.status === "FAILED" && <AlertCircle size={16} />}
              <span>{orch.status}</span>
            </div>

            <ChevronRight size={20} className={styles.chevron} />
          </Link>
        ))}
      </div>
    </div>
  );
}
