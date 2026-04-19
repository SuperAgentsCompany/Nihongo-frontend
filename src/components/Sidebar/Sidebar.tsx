"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Workflow, Database, Settings, LogOut, Image } from "lucide-react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Sidebar.module.css";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Agents", href: "/agents", icon: Users },
  { name: "Orchestrations", href: "/orchestrations", icon: Workflow },
  { name: "Media Lab", href: "/media-lab", icon: Image },
  { name: "Knowledge", href: "/knowledge", icon: Database },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>SUPAA</div>
      <nav className={styles.nav}>
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.footer}>
        <ThemeToggle />
        <button 
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }} 
          className={styles.logoutBtn}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
