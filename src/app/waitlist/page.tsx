"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, AlertCircle, ArrowRight, Zap, Database, Shield, Cpu, LogIn } from "lucide-react";
import styles from "./page.module.css";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      setStatus("success");
      setMessage("You've been added to the waitlist!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles.navLogo}>SUPAA</div>
        <Link href="/login" className={styles.loginLink}>
          <LogIn size={18} />
          <span>Login</span>
        </Link>
      </nav>
      <section className={styles.hero}>
        <div className={styles.badge}>Beta Access Now Open</div>
        <h1 className={styles.headline}>Stop Prompting. <br />Start Orchestrating.</h1>
        <p className={styles.subheadline}>
          The multi-agent era has arrived. SUPAA is the intelligent orchestration layer for collaborative AI agents. 
          Design, deploy, and scale autonomous teams that solve problems at world-class speed.
        </p>
        
        {status === "success" ? (
          <div className={styles.successMessage}>
            <CheckCircle className={styles.successIcon} size={24} />
            <span>{message}</span>
            <button onClick={() => setStatus("idle")} className={styles.resetButton}>
              Add another
            </button>
          </div>
        ) : (
          <form className={styles.waitlistForm} onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your work email" 
              className={styles.input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={status === "loading"}
            />
            <button type="submit" className={styles.button} disabled={status === "loading"}>
              {status === "loading" ? "Joining..." : (
                <>
                  Join Waitlist <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}
        
        {status === "error" && (
          <div className={styles.errorMessage}>
            <AlertCircle size={18} />
            <span>{message}</span>
          </div>
        )}
      </section>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <Zap className={styles.featureIcon} size={24} />
          <h3 className={styles.featureTitle}>Dynamic Orchestration</h3>
          <p className={styles.featureText}>
            Seamless handoffs and real-time coordination between specialized agents.
          </p>
        </div>
        
        <div className={styles.featureCard}>
          <Database className={styles.featureIcon} size={24} />
          <h3 className={styles.featureTitle}>Unified Memory</h3>
          <p className={styles.featureText}>
            Long-term semantic context across all agents powered by high-performance vector search.
          </p>
        </div>
        
        <div className={styles.featureCard}>
          <Shield className={styles.featureIcon} size={24} />
          <h3 className={styles.featureTitle}>Built-in Verification</h3>
          <p className={styles.featureText}>
            Automated QA loops that sanity-check outputs and significantly reduce hallucinations.
          </p>
        </div>
        
        <div className={styles.featureCard}>
          <Cpu className={styles.featureIcon} size={24} />
          <h3 className={styles.featureTitle}>Enterprise Infrastructure</h3>
          <p className={styles.featureText}>
            Scalable, secure, and production-ready compute environment for intensive AI workloads.
          </p>
        </div>
      </section>
    </main>
  );
}
