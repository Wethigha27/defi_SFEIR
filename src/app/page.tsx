"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import ParticleBackground from "@/components/ParticleBackground";
import MissionSelector, { MissionType } from "@/components/MissionSelector";
import DynamicForm, { FormData } from "@/components/DynamicForm";
import { FiZap, FiShield, FiGlobe, FiHeart } from "react-icons/fi";
import AxolotlChat from "@/components/AxolotlChat";
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] text-sm font-display mb-4">
                🦎 Axolotl vous accueille
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-white">Le </span>
              <span className="text-glow text-[var(--primary)]">Nexus</span>
              <span className="text-white"> Connecté</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-400 mb-4"
            >
              L&apos;Écho Personnalisé ✨
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 max-w-2xl mx-auto mb-8"
            >
              Salutations, voyageur des flux de données ! 🚀 Notre monde
              numérique a besoin de toi. Les Bugs Ancestraux 🐛 menacent de
              corrompre les liens vitaux entre notre communauté et ses Soutiens
              Essentiels ❤️.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <FiShield className="w-5 h-5 text-[var(--primary)]" />
                <span>Sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <FiGlobe className="w-5 h-5 text-[var(--secondary)]" />
                <span>Universel</span>
              </div>
              <div className="flex items-center gap-2">
                <FiZap className="w-5 h-5 text-[var(--gold)]" />
                <span>Instantané</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4" id="missions">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto"
            >
              <div className="card-glass p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary)]/50 flex items-center justify-center">
                  <FiHeart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  Soutiens Essentiels
                </h3>
                <p className="text-gray-400 text-sm">
                  Chaque contribution renforce notre communauté et ses projets
                  innovants.
                </p>
              </div>

              <div className="card-glass p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/50 flex items-center justify-center">
                  <FiShield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  Guilde des Bénévoles
                </h3>
                <p className="text-gray-400 text-sm">
                  Rejoignez une équipe de héros du code prêts à défendre le
                  Nexus.
                </p>
              </div>
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
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                🚪 Portail d&apos;Intention
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
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
                  <h3 className="font-display text-xl font-semibold text-white">
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
                    <div className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white font-display font-bold text-sm">
                      2
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">
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
        <footer className="py-12 px-4 border-t border-gray-800/50">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                <FiZap className="w-6 h-6 text-black" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Le Nexus Connecté
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              ⚡ Par les circuits de l&apos;éternité, que la puissance du code
              te guide ! ⚡
            </p>
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} Nexus Connecté • Nuit de l&apos;Info •
              Tous droits réservés
            </p>
          </div>
        </footer>
      </main>

      {/* AI Chatbot */}
      <AxolotlChat />
    </div>
  );
}
