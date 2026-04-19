"use client";

import { useState } from "react";
import { Upload, Play, CheckCircle2, Loader2, Wand2, Image as ImageIcon } from "lucide-react";
import styles from "./page.module.css";

export default function MediaLabPage() {
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "training" | "completed">("idle");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleUpload = () => {
    // Simulate image upload
    const newImages = [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    ];
    setImages(prev => [...prev, ...newImages]);
  };

  const startTraining = () => {
    setStatus("training");
    setProgress(0);
    
    const steps = [
      { msg: "Extracting and aligning faces...", p: 20 },
      { msg: "Preparing dataset for Flux LoRA...", p: 40 },
      { msg: "Initializing DoRA fine-tuning...", p: 60 },
      { msg: "Optimizing weights for identity preservation...", p: 85 },
      { msg: "Finalizing model adapter...", p: 100 },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setCurrentStep(steps[current].msg);
        setProgress(steps[current].p);
        current++;
      } else {
        clearInterval(interval);
        setStatus("completed");
        setCurrentStep("Training complete. Model adapter ready.");
      }
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Media Lab</h1>
        <p>Fine-tune advanced AI models for high-fidelity face and posture control.</p>
      </header>

      <div className={styles.section}>
        <h2><Upload size={20} /> Training Data</h2>
        <div className={styles.uploadZone} onClick={handleUpload}>
          <ImageIcon size={48} className={styles.uploadIcon} />
          <p>Drag & drop images of your subject here, or click to browse.</p>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Recommendation: 15-20 high-quality images from different angles.
          </span>
        </div>

        {images.length > 0 && (
          <div className={styles.gallery}>
            {images.map((src, i) => (
              <div key={i} className={styles.imagePreview}>
                <img src={src} alt={`Subject ${i}`} />
              </div>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <button 
            className={styles.btnPrimary} 
            disabled={images.length === 0 || status !== "idle"}
            onClick={startTraining}
          >
            {status === "idle" ? <><Play size={18} style={{ marginRight: '8px' }} /> Start Fine-tuning</> : "In Progress..."}
          </button>
        </div>
      </div>

      {status !== "idle" && (
        <div className={styles.section}>
          <h2>
            {status === "training" ? (
              <div className={styles.pulsingDots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            ) : <CheckCircle2 size={20} style={{ color: 'var(--success-color)' }} />}
            Training Status
          </h2>
          <div className={styles.statusCard}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
            </div>
            <div className={styles.statusText}>{currentStep}</div>
          </div>
        </div>
      )}

      {status === "completed" && (
        <div className={styles.section}>
          <h2><Wand2 size={20} /> Inference Playground</h2>
          <div className={styles.playground}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="A high-fashion portrait of the subject in a Muji-style garden..." 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button className={styles.btnPrimary}>Generate</button>
            </div>
            <div className={styles.outputArea}>
              <p>Generated image will appear here.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
