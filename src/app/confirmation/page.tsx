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
    title: "Message Transmis !",
    message:
      "Ton message a bien été acheminé vers nos serveurs centraux 📡. Nos Agents de Support 🕵️ te répondront sous peu.",
    color: "#00f5d4",
    colorClass: "text-[var(--primary)]",
    impact: "Notre équipe de communication traite ta demande en priorité",
    project: "améliorer notre réactivité et notre service client",
  },
  don: {
    icon: <FiHeart className="w-12 h-12" />,
    title: "Don de Ressources Reçu !",
    message:
      "Un immense 'GG' ! 🏆 Ton Don de Ressources 💎 est une bénédiction pour notre cause 🙏.",
    color: "#fee440",
    colorClass: "text-[var(--gold)]",
    impact: "financer des projets innovants et soutenir notre communauté",
    project: "nos initiatives pour la Nuit de l'Info",
  },
  benevole: {
    icon: <FiUsers className="w-12 h-12" />,
    title: "Bienvenue dans la Guilde !",
    message:
      "Tu fais maintenant partie de notre équipe d'élite ! 🛡️ Ensemble, nous accomplirons de grandes missions.",
    color: "#7b2cbf",
    colorClass: "text-[var(--secondary)]",
    impact: "renforcer nos rangs avec des talents exceptionnels",
    project: "l'organisation de nos événements et missions terrain",
  },
  info: {
    icon: <FiInfo className="w-12 h-12" />,
    title: "Demande Enregistrée !",
    message:
      "Ta requête a été transmise à nos analystes. Tu recevras bientôt les informations demandées dans ta boîte de réception.",
    color: "#f15bb5",
    colorClass: "text-[var(--accent)]",
    impact: "partager notre vision et nos projets avec le monde",
    project: "la transparence et la communication avec notre communauté",
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
                  <FiCheckCircle className="w-6 h-6 text-white" />
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
              <p className="text-2xl text-white mb-2">
                Salutations, <span className={config.colorClass}>{nom}</span> ! 👋
              </p>
              <p className="text-gray-400 text-lg">{config.message}</p>
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
                  <p className="text-gray-400 text-sm">Don enregistré</p>
                </motion.div>
              )}
            </motion.div>

            {/* Year Section */}
            <motion.div
              variants={itemVariants}
              className="bg-[rgba(0,245,212,0.05)] rounded-xl p-6 mb-8 border border-[var(--primary)]/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <FiCalendar className="w-6 h-6 text-[var(--primary)]" />
                <h2 className="font-display text-xl font-semibold text-white">
                  Année {currentYear}
                </h2>
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
                    <h3 className="text-white font-semibold mb-1">
                      Ton soutien en {currentYear} est crucial !
                    </h3>
                    <p className="text-gray-400 text-sm">
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
                    <h3 className="text-white font-semibold mb-1">
                      Impact de ta contribution
                    </h3>
                    <p className="text-gray-400 text-sm">
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
              <p className="text-gray-400">
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
              <p className="text-gray-500 text-sm">
                ⚡ Par les circuits de l&apos;éternité, que la puissance du code
                t&apos;accompagne ! ⚡
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Nexus Connecté • Nuit de l&apos;Info {currentYear}
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

