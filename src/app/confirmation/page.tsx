"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import ParticleBackground from "@/components/ParticleBackground";
import Confetti from "@/components/Confetti";
import {
  FiCheckCircle,
  FiMail,
  FiHeart,
  FiUsers,
  FiInfo,
  FiArrowRight,
  FiCalendar,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

type MissionType = "contact" | "don" | "benevole" | "info";

const missionConfig: Record<
  MissionType,
  {
    icon: React.ReactNode;
    title: string;
    message: string;
    color: string;
    colorClass: string;
    impact: string;
    project: string;
  }
> = {
  contact: {
    icon: <FiMail className="w-12 h-12" />,
    title: "Message Transmis au Village ! 🏘️",
    message:
      "Ton message a été acheminé vers notre Village Numérique Résistant 📡. Ensemble, construisons un numérique plus libre et durable !",
    color: "#00f5d4",
    colorClass: "text-[var(--primary)]",
    impact: "rejoindre la résistance contre la dépendance aux Big Tech",
    project: "la démarche NIRD : Numérique Inclusif, Responsable et Durable",
  },
  don: {
    icon: <FiHeart className="w-12 h-12" />,
    title: "Don Reçu par le Village ! 💎",
    message:
      "Un immense 'GG' ! 🏆 Ton don soutient notre Village Numérique Résistant dans sa lutte pour un numérique libre et éthique 🙏.",
    color: "#fee440",
    colorClass: "text-[var(--gold)]",
    impact: "financer le reconditionnement de matériel et les solutions libres pour les écoles",
    project: "la transition vers un numérique scolaire autonome et durable (NIRD)",
  },
  benevole: {
    icon: <FiUsers className="w-12 h-12" />,
    title: "Bienvenue dans le Village Résistant ! 🛡️",
    message:
      "Tu rejoins notre communauté de résistants numériques ! Ensemble, aidons les établissements scolaires à se libérer des Big Tech.",
    color: "#7b2cbf",
    colorClass: "text-[var(--secondary)]",
    impact: "accompagner les écoles vers l'autonomie numérique et les logiciels libres",
    project: "le déploiement de Linux et des solutions open-source dans les établissements",
  },
  info: {
    icon: <FiInfo className="w-12 h-12" />,
    title: "Requête Transmise au Village ! 📚",
    message:
      "Ta demande d'information sur notre démarche NIRD a été enregistrée. Découvre comment résister à l'obsolescence programmée !",
    color: "#f15bb5",
    colorClass: "text-[var(--accent)]",
    impact: "sensibiliser à la sobriété numérique et au réemploi du matériel",
    project: "l'éducation au numérique responsable et à la résistance face aux Big Tech",
  },
};

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const nom = searchParams.get("nom") || "Voyageur";
  const mission = (searchParams.get("mission") as MissionType) || "contact";
  const montant = searchParams.get("montant");

  const [currentYear] = useState(new Date().getFullYear());
  const [showConfetti, setShowConfetti] = useState(true);

  const config = missionConfig[mission] || missionConfig.contact;

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Header />
      {showConfetti && <Confetti />}

      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="card-glass p-8 md:p-12"
          >
            {/* Success Icon */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="relative"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${config.color}20, ${config.color}40)`,
                    border: `3px solid ${config.color}`,
                    boxShadow: `0 0 40px ${config.color}40`,
                  }}
                >
                  <span style={{ color: config.color }}>{config.icon}</span>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center"
                  style={{ boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" }}
                >
                  <FiCheckCircle className="w-6 h-6 text-[var(--text-primary)]" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className={`font-display text-3xl md:text-4xl font-bold text-center mb-4 ${config.colorClass}`}
            >
              {config.title}
            </motion.h1>

            {/* Personalized Greeting */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-8"
            >
              <p className="text-2xl text-[var(--text-primary)] mb-2">
                Salutations, <span className={config.colorClass}>{nom}</span> ! 👋
              </p>
              <p className="text-[var(--text-secondary)] text-lg">{config.message}</p>
              {mission === "don" && montant && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 inline-block px-6 py-3 rounded-lg bg-[var(--gold)]/20 border border-[var(--gold)]/50"
                >
                  <p className="text-[var(--gold)] font-display text-2xl font-bold">
                    {montant}€
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm">Don enregistré</p>
                </motion.div>
              )}
            </motion.div>

            {/* Year Section - Thème NIRD 2025 */}
            <motion.div
              variants={itemVariants}
              className="bg-[rgba(0,245,212,0.05)] rounded-xl p-6 mb-8 border border-[var(--primary)]/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <FiCalendar className="w-6 h-6 text-[var(--primary)]" />
                <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                  🏘️ Village Numérique Résistant • {currentYear}
                </h2>
              </div>
              
              {/* Piliers NIRD */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/30">
                  🤝 Inclusif
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--secondary)]/20 text-[var(--secondary)] border border-[var(--secondary)]/30">
                  ♻️ Responsable
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30">
                  🌱 Durable
                </span>
              </div>

              <div className="space-y-4">
                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                    <FiTarget className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="text-[var(--text-primary)] font-semibold mb-1">
                      Ton soutien en {currentYear} est crucial !
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Grâce à toi, nous pouvons avancer sur {config.project} cette
                      année {currentYear}.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--secondary)]/20 flex items-center justify-center flex-shrink-0">
                    <FiTrendingUp className="w-5 h-5 text-[var(--secondary)]" />
                  </div>
                  <div>
                    <h3 className="text-[var(--text-primary)] font-semibold mb-1">
                      Impact de ta contribution
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm">
                      Ton action permettra de {config.impact}.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              variants={itemVariants}
              className="text-center space-y-4"
            >
              <p className="text-[var(--text-secondary)]">
                🚀 Reste connecté pour suivre nos exploits tout au long de
                l&apos;année {currentYear} !
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/"
                    className="btn-cyber btn-primary inline-flex items-center gap-2"
                  >
                    Retour au Nexus
                    <FiArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Footer Message */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-gray-800 text-center"
            >
              <p className="text-[var(--text-muted)] text-sm">
                🏘️ Ensemble, construisons un numérique éducatif plus autonome, plus durable, plus éthique !
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Village Numérique Résistant • NIRD • Nuit de l&apos;Info {currentYear}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}

