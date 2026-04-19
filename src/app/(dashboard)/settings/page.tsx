"use client";

import { Settings, User, Bell, Shield, Sliders, Save } from "lucide-react";
import styles from "./page.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Settings</h1>
          <p className={styles.subtitle}>Manage your account and platform preferences.</p>
        </div>
        <button className={styles.saveBtn}>
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </header>

      <div className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <User size={20} />
            <h2>Profile</h2>
          </div>
          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" defaultValue="Super Agent Admin" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" defaultValue="admin@superagents.com" className={styles.input} />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Sliders size={20} />
            <h2>Preferences</h2>
          </div>
          <div className={styles.toggles}>
            <div className={styles.toggleRow}>
              <div>
                <div className={styles.toggleLabel}>Automatic Orchestration</div>
                <div className={styles.toggleDesc}>Allow system to spawn child agents without confirmation.</div>
              </div>
              <div className={styles.toggleSwitch}>
                <div className={styles.toggleDot} />
              </div>
            </div>
            <div className={styles.toggleRow}>
              <div>
                <div className={styles.toggleLabel}>Verbose Logging</div>
                <div className={styles.toggleDesc}>Show detailed thought streams in all agent cards.</div>
              </div>
              <div className={`${styles.toggleSwitch} ${styles.on}`}>
                <div className={styles.toggleDot} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Bell size={20} />
            <h2>Notifications</h2>
          </div>
          <p className={styles.placeholderText}>Configure how you receive updates about your orchestrations.</p>
        </div>
      </div>
    </div>
  );
}
