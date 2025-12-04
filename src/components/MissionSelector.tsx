"use client";

import { motion } from "framer-motion";
import { FiPhone, FiHeart, FiUsers, FiHelpCircle } from "react-icons/fi";

export type MissionType = "contact" | "don" | "benevole" | "info" | null;

interface Mission {
  id: MissionType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  emoji: string;
}

const missions: Mission[] = [
  {
    id: "contact",
    title: "Établir le Contact",
    description: "Envoyez-nous un message pour toute question ou demande",
    icon: <FiPhone className="w-8 h-8" />,
    color: "primary",
    emoji: "📞",
  },
  {
    id: "don",
    title: "Offrir un Don",
    description: "Soutenez notre cause avec une contribution financière",
    icon: <FiHeart className="w-8 h-8" />,
    color: "gold",
    emoji: "💰",
  },
  {
    id: "benevole",
    title: "Rejoindre la Guilde",
    description: "Devenez bénévole et participez à nos missions",
    icon: <FiUsers className="w-8 h-8" />,
    color: "secondary",
    emoji: "🛡️",
  },
  {
    id: "info",
    title: "Demander des Infos",
    description: "Obtenez des informations sur nos activités et projets",
    icon: <FiHelpCircle className="w-8 h-8" />,
    color: "accent",
    emoji: "❓",
  },
];

interface MissionSelectorProps {
  selectedMission: MissionType;
  onSelect: (mission: MissionType) => void;
}

export default function MissionSelector({
  selectedMission,
  onSelect,
}: MissionSelectorProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {missions.map((mission) => (
        <motion.button
          key={mission.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(mission.id)}
          className={`mission-card ${mission.id} ${
            selectedMission === mission.id ? "selected" : ""
          } text-left`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-lg ${
                mission.color === "primary"
                  ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                  : mission.color === "gold"
                  ? "bg-[var(--gold)]/20 text-[var(--gold)]"
                  : mission.color === "secondary"
                  ? "bg-[var(--secondary)]/20 text-[var(--secondary)]"
                  : "bg-[var(--accent)]/20 text-[var(--accent)]"
              }`}
            >
              {mission.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{mission.emoji}</span>
                <h3
                  className={`font-display font-semibold text-lg ${
                    selectedMission === mission.id
                      ? "text-[var(--text-primary)]"
                      : "text-gray-200"
                  }`}
                >
                  {mission.title}
                </h3>
              </div>
              <p className="text-[var(--text-secondary)] text-sm mt-1">{mission.description}</p>
            </div>
            {selectedMission === mission.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  mission.color === "primary"
                    ? "bg-[var(--primary)]"
                    : mission.color === "gold"
                    ? "bg-[var(--gold)]"
                    : mission.color === "secondary"
                    ? "bg-[var(--secondary)]"
                    : "bg-[var(--accent)]"
                }`}
              >
                <span className="text-black text-sm">✓</span>
              </motion.div>
            )}
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}

