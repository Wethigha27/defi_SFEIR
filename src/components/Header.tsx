"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiZap } from "react-icons/fi";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,15,0.8)] backdrop-blur-lg border-b border-[var(--card-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center"
            >
              <FiZap className="w-6 h-6 text-black" />
            </motion.div>
            <div>
              <h1 className="font-display font-bold text-lg text-white group-hover:text-[var(--primary)] transition-colors">
                Le Nexus
              </h1>
              <p className="text-xs text-gray-400">Connecté • 2024</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-[var(--primary)] transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/#missions"
              className="text-gray-300 hover:text-[var(--primary)] transition-colors font-medium"
            >
              Missions
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/#portail"
                className="btn-cyber btn-primary text-sm py-2 px-4"
              >
                Portail d&apos;Intention
              </Link>
            </motion.div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}

