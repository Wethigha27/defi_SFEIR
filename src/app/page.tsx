"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import ParticleBackground from "@/components/ParticleBackground";
import MissionSelector, { MissionType } from "@/components/MissionSelector";
import DynamicForm, { FormData } from "@/components/DynamicForm";
import { FiZap, FiShield, FiGlobe, FiHeart } from "react-icons/fi";
import AIAssistant from "@/components/AIAssistant";

export default function Home() {
  const router = useRouter();
  const [selectedMission, setSelectedMission] = useState<MissionType>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMissionSelect = (mission: MissionType) => {
    setSelectedMission(mission);
  };

  const handleFormSubmit = async (data: FormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Build query params for confirmation page
    const params = new URLSearchParams({
      nom: data.nom,
      mission: selectedMission || "contact",
    });

    if (selectedMission === "don") {
      const montant = data.montant || data.montantPersonnalise || "0";
      params.append("montant", String(montant));
    }

    setIsLoading(false);
    router.push(`/confirmation?${params.toString()}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-28 pb-20 px-4 relative hero-glow">
          {/* Decorative Orbs */}
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="cyber-badge">
                <span className="text-xl">🏘️</span>
                <span>Village Numérique Résistant</span>
                <span className="text-[var(--accent)]">•</span>
                <span>Nuit de l&apos;Info 2025</span>
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="text-[var(--text-primary)]">Le </span>
              <span className="gradient-text">Village</span>
              <br />
              <span className="text-[var(--text-primary)]">Numérique </span>
              <span className="text-glow text-[var(--primary)]">Résistant</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <div className="neon-line max-w-md mx-auto mb-6" />
              <p className="text-2xl md:text-3xl font-display font-semibold">
                <span className="text-[var(--primary)]">N</span>umérique{" "}
                <span className="text-[var(--secondary)]">I</span>nclusif,{" "}
                <span className="text-[var(--accent)]">R</span>esponsable et{" "}
                <span className="text-[var(--gold)]">D</span>urable 🌱
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Face aux Big Tech, les établissements scolaires peuvent résister ! 🏫 
              Comme Astérix face à l&apos;Empire, rejoins notre Village pour un numérique 
              plus libre, plus autonome et plus durable. Ensemble, libérons les écoles 
              de l&apos;obsolescence programmée ! 💪
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-8 text-base"
            >
              <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/30"
              >
                <span className="text-2xl">🤝</span>
                <span className="text-[var(--primary)] font-semibold">Inclusif</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--secondary)]/10 border border-[var(--secondary)]/30"
              >
                <span className="text-2xl">♻️</span>
                <span className="text-[var(--secondary)] font-semibold">Responsable</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30"
              >
                <span className="text-2xl">🌱</span>
                <span className="text-[var(--gold)] font-semibold">Durable</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4" id="missions">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                💪 Notre Résistance
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Les piliers de notre combat pour un numérique plus éthique
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto"
            >
              <motion.div 
                whileHover={{ y: -10 }}
                className="card-glass p-8 text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/30 flex items-center justify-center shadow-lg shadow-[var(--primary)]/20 group-hover:shadow-[var(--primary)]/40 transition-shadow">
                  <span className="text-4xl">🐧</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                  Linux & Logiciels Libres
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Promouvons les solutions libres pour libérer les écoles des licences coûteuses.
                </p>
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[var(--primary)] to-transparent transition-all duration-500 mx-auto" />
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="card-glass p-8 text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/30 flex items-center justify-center shadow-lg shadow-[var(--secondary)]/20 group-hover:shadow-[var(--secondary)]/40 transition-shadow">
                  <span className="text-4xl">♻️</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                  Reconditionnement
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Luttons contre l&apos;obsolescence programmée en donnant une seconde vie au matériel.
                </p>
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[var(--secondary)] to-transparent transition-all duration-500 mx-auto" />
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="card-glass p-8 text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold)]/30 flex items-center justify-center shadow-lg shadow-[var(--gold)]/20 group-hover:shadow-[var(--gold)]/40 transition-shadow">
                  <span className="text-4xl">🏫</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                  Autonomie des Écoles
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Accompagnons les établissements vers un numérique autonome et éthique.
                </p>
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[var(--gold)] to-transparent transition-all duration-500 mx-auto" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Portal Section */}
        <section className="py-16 px-4" id="portail">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                🚪 Portail d&apos;Intention
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Choisis ta mission et ouvre la porte vers ta contribution au
                Nexus. Chaque action compte dans notre quête commune.
              </p>
            </motion.div>

            {/* AI Assistant */}
            <AIAssistant onMissionSuggested={handleMissionSelect} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="card-glass p-6 md:p-10"
            >
              {/* Step 1: Mission Selection */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-black font-display font-bold text-sm">
                    1
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                    Sélectionne ta Mission 🎯
                  </h3>
                </div>
                <MissionSelector
                  selectedMission={selectedMission}
                  onSelect={handleMissionSelect}
                />
              </div>

              {/* Step 2: Dynamic Form */}
              {selectedMission && (
                <motion.div
                  id="form-section"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                  className="border-t border-gray-800 pt-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--text-primary)] font-display font-bold text-sm">
                      2
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                      Remplis les Coordonnées 📝
                    </h3>
                  </div>
                  <DynamicForm
                    mission={selectedMission}
                    onSubmit={handleFormSubmit}
                    isLoading={isLoading}
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 relative overflow-hidden">
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Team 404 Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="glitch-404">404</div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent" />
                <div className="text-left">
                  <span className="font-display font-bold text-2xl text-[var(--text-primary)] block">
                    Village Numérique Résistant
                  </span>
                  <span className="text-sm text-[var(--text-secondary)]">Équipe 404 • Nuit de l&apos;Info 2025</span>
                </div>
              </div>
            </motion.div>
            
            <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-2xl mx-auto">
              🌱 Ensemble, construisons un numérique éducatif plus autonome, plus durable, plus éthique !
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] text-sm">🤝 Inclusif</span>
              <span className="px-4 py-2 rounded-full bg-[var(--secondary)]/10 border border-[var(--secondary)]/30 text-[var(--secondary)] text-sm">♻️ Responsable</span>
              <span className="px-4 py-2 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)] text-sm">🌱 Durable</span>
            </div>
            
            <div className="neon-line max-w-xs mx-auto mb-6" />
            
            <p className="text-[var(--text-muted)] text-sm">
              © {new Date().getFullYear()} <span className="text-[var(--primary)]">Équipe 404</span> • <span className="text-[var(--accent)]">NIRD</span> • Nuit de l&apos;Info 2025 • Défi SFEIR 🦎
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
