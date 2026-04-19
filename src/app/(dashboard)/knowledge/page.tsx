"use client";

import { Database, Search, FileText, Plus } from "lucide-react";
import styles from "./page.module.css";

export default function KnowledgePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Knowledge Base</h1>
          <p className={styles.subtitle}>Shared semantic memory and documents.</p>
        </div>
        <button className={styles.newBtn}>
          <Plus size={18} />
          <span>Add Source</span>
        </button>
      </header>

      <div className={styles.searchBar}>
        <Search size={20} className={styles.searchIcon} />
        <input type="text" placeholder="Search knowledge..." className={styles.searchInput} />
      </div>

      <div className={styles.emptyState}>
        <Database size={48} className={styles.emptyIcon} />
        <h3>No data sources found</h3>
        <p>Connect your first data source to enable cross-agent semantic memory.</p>
        <button className={styles.actionBtn}>Connect Data Source</button>
      </div>
    </div>
  );
}
