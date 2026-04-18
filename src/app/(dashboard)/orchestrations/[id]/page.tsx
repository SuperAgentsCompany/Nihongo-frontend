"use client";

import { useParams } from "next/navigation";
import { Play, Pause, Square, Circle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

type Log = {
  time: string;
  agent: string;
  message: string;
  type: "info" | "default" | "success" | "warning";
};

type Node = {
  id: string | number;
  name: string;
  status: "idle" | "active" | "success" | "warning";
  text: string;
  top: number;
  left: number;
};

const INITIAL_NODES: Node[] = [
  { id: 1, name: "Dispatcher", status: "idle", text: "Waiting...", top: 150, left: 50 },
  { id: 2, name: "Researcher", status: "idle", text: "Idle", top: 50, left: 300 },
  { id: 3, name: "Analyst", status: "idle", text: "Idle", top: 250, left: 300 },
  { id: 4, name: "Synthesizer", status: "idle", text: "Idle", top: 150, left: 550 },
];

export default function OrchestrationView() {
  const { id } = useParams();
  const [logs, setLogs] = useState<Log[]>([]);
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [status, setStatus] = useState<string>("PENDING");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Determine WebSocket URL
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.hostname === "localhost" ? "localhost:8000" : window.location.host;
    const wsUrl = `${protocol}//${host}/ws/orchestration/${id}`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.current.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      console.log("Received event:", payload);

      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      if (payload.event === "agent_thought") {
        setLogs((prev) => [
          ...prev,
          { time, agent: payload.data.agent, message: payload.data.text, type: "default" }
        ]);
        
        setNodes((prev) => prev.map(node => 
          node.name === payload.data.agent 
            ? { ...node, status: "active", text: payload.data.text } 
            : node
        ));
      } else if (payload.event === "agent_action") {
        setLogs((prev) => [
          ...prev,
          { time, agent: payload.data.agent, message: `${payload.data.action} (${payload.data.tool})`, type: "success" }
        ]);

        setNodes((prev) => prev.map(node => 
          node.name === payload.data.agent 
            ? { ...node, text: `Action: ${payload.data.tool}` } 
            : node
        ));
      } else if (payload.event === "handoff") {
        setLogs((prev) => [
          ...prev,
          { time, agent: "System", message: `Handoff to ${payload.data.next_agent}`, type: "info" }
        ]);

        setNodes((prev) => prev.map(node => {
          if (node.name === payload.data.next_agent) {
            return { ...node, status: "active", text: "Thinking..." };
          }
          if (node.status === "active") {
            return { ...node, status: "success" };
          }
          return node;
        }));
      } else if (payload.event === "task_update") {
        setStatus(payload.status);
        setLogs((prev) => [
          ...prev,
          { time, agent: "System", message: `Task status: ${payload.status}`, type: "info" }
        ]);
      }
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      ws.current?.close();
    };
  }, [id]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <div className={styles.breadcrumb}>Orchestrations / {id}</div>
          <h1 className={styles.title}>Market Intelligence Sweep</h1>
          <div className={styles.statusBadge}>{status}</div>
        </div>
        <div className={styles.actions}>
          <button className={styles.secondaryBtn}>
            <Pause size={18} />
            <span>Pause</span>
          </button>
          <button className={styles.primaryBtn}>
            <Square size={18} />
            <span>Stop</span>
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.graphArea}>
          {nodes.map((node) => (
            <div 
              key={node.id} 
              className={styles.node} 
              style={{ top: node.top, left: node.left }}
            >
              <div className={styles.nodeHeader}>
                <span className={styles.nodeName}>{node.name}</span>
                <div 
                  className={`${styles.statusDot} ${styles[node.status]}`} 
                />
              </div>
              <div className={styles.nodeText}>{node.text}</div>
            </div>
          ))}
          
          {/* Connectors */}
          <div className={`${styles.connector} ${styles.edge12}`} />
          <div className={`${styles.connector} ${styles.edge13}`} />
          <div className={`${styles.connector} ${styles.edge24}`} />
          <div className={`${styles.connector} ${styles.edge34}`} />
        </div>

        <div className={styles.logsPanel}>
          <div className={styles.panelHeader}>
            <span>Live Event Stream</span>
            <div className={styles.liveIndicator}>
              <Circle size={8} fill="var(--electric-cyan)" />
              <span>Live</span>
            </div>
          </div>
          <div className={styles.logStream}>
            {logs.length === 0 && (
              <div className={styles.emptyLogs}>Waiting for events...</div>
            )}
            {logs.map((log, index) => (
              <div key={index} className={`${styles.logEntry} ${styles[log.type]}`}>
                <span className={styles.logTime}>{log.time}</span>
                <span className={styles.logAgent}>[{log.agent}]</span>
                <span className={styles.logMessage}>{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
