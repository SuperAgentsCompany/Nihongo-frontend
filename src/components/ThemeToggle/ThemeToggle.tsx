"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "muji" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className={styles.toggleBtn} title="Toggle Theme">
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      <span>{theme === "dark" ? "Muji Mode" : "Dark Mode"}</span>
    </button>
  );
}
