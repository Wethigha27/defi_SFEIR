"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] backdrop-blur-xl border-b border-[var(--card-border)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Team 404 Logo with CSS Glitch Effect */}
          <Link href="/" className="flex items-center gap-4 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="glitch-404-mini font-display font-black text-2xl">404</div>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                Village NIRD
              </h1>
              <p className="text-xs text-[var(--text-muted)]">Équipe 404 • Nuit de l&apos;Info 2025</p>
            </div>
          </Link>

          <nav className="flex items-center gap-4 md:gap-6">
            <Link
              href="/"
              className="hidden md:block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/#missions"
              className="hidden md:block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
            >
              Missions
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Link
                href="/#portail"
                className="btn-cyber btn-primary text-sm py-2 px-4"
              >
                Portail d&apos;Intention
              </Link>
            </motion.div>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </motion.header>
  );
}

