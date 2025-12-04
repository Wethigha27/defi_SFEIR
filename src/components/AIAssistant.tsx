"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap, FiLoader, FiCheck, FiMessageCircle } from "react-icons/fi";
import { MissionType } from "./MissionSelector";

interface AIAssistantProps {
  onMissionSuggested: (mission: MissionType) => void;
}

// Exemples de questions pour inspirer l'utilisateur
const exampleQuestions = [
  "Je veux soutenir financièrement votre association",
  "Comment devenir bénévole ?",
  "J'ai une question sur vos projets",
  "Je souhaite vous contacter",
  "Je veux participer à la Nuit de l'Info",
  "Comment puis-je aider ?",
  "Je veux faire partie de l'équipe",
  "Quels sont vos événements à venir ?",
];

export default function AIAssistant({ onMissionSuggested }: AIAssistantProps) {
  const [userIntent, setUserIntent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestion, setSuggestion] = useState<{
    mission: MissionType;
    explanation: string;
    autoApplied: boolean;
  } | null>(null);

  const analyzeIntent = async () => {
    if (!userIntent.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setSuggestion(null);

    try {
      const response = await fetch("/api/analyze-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent: userIntent }),
      });

      const data = await response.json();

      if (data.mission && data.explanation) {
        const newSuggestion = {
          mission: data.mission as MissionType,
          explanation: data.explanation,
          autoApplied: true,
        };
        setSuggestion(newSuggestion);
        
        // Appliquer automatiquement la mission après un court délai
        setTimeout(() => {
          onMissionSuggested(newSuggestion.mission);
          // Scroll vers le formulaire
          const formSection = document.getElementById("form-section");
          if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 1500);
      }
    } catch (error) {
      console.error("Error analyzing intent:", error);
      // Fallback to local analysis
      const localSuggestion = analyzeLocally(userIntent);
      setSuggestion({ ...localSuggestion, autoApplied: true });
      
      setTimeout(() => {
        onMissionSuggested(localSuggestion.mission);
        const formSection = document.getElementById("form-section");
        if (formSection) {
          formSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 1500);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeLocally = (text: string): { mission: MissionType; explanation: string } => {
    const lowerText = text.toLowerCase();

    // Détection des dons et contributions financières
    if (
      lowerText.includes("don") || 
      lowerText.includes("argent") || 
      lowerText.includes("financer") || 
      lowerText.includes("contribuer") || 
      lowerText.includes("soutenir financ") ||
      lowerText.includes("payer") ||
      lowerText.includes("euro") ||
      lowerText.includes("€") ||
      lowerText.includes("donation") ||
      lowerText.includes("mécène") ||
      lowerText.includes("sponsor")
    ) {
      return {
        mission: "don",
        explanation: "🎯 Parfait ! Tu souhaites apporter un soutien financier au Nexus. La mission 'Offrir un Don' 💰 est idéale pour toi !",
      };
    }

    // Détection du bénévolat et participation
    if (
      lowerText.includes("bénévol") ||
      lowerText.includes("aider") ||
      lowerText.includes("participer") ||
      lowerText.includes("rejoindre") ||
      lowerText.includes("équipe") ||
      lowerText.includes("volontaire") ||
      lowerText.includes("membre") ||
      lowerText.includes("engager") ||
      lowerText.includes("impliquer") ||
      lowerText.includes("nuit de l'info") ||
      lowerText.includes("événement") ||
      lowerText.includes("guilde") ||
      lowerText.includes("faire partie")
    ) {
      return {
        mission: "benevole",
        explanation: "🛡️ Excellent choix, guerrier ! Tu veux rejoindre notre Guilde des Bénévoles et mettre tes talents au service du Nexus !",
      };
    }

    // Détection des demandes d'information
    if (
      lowerText.includes("question") ||
      lowerText.includes("savoir") ||
      lowerText.includes("information") ||
      lowerText.includes("renseignement") ||
      lowerText.includes("en savoir plus") ||
      lowerText.includes("comment ça marche") ||
      lowerText.includes("qu'est-ce") ||
      lowerText.includes("c'est quoi") ||
      lowerText.includes("expliquer") ||
      lowerText.includes("détail") ||
      lowerText.includes("projet") ||
      lowerText.includes("activité")
    ) {
      return {
        mission: "info",
        explanation: "❓ Tu cherches des informations sur le Nexus ! La mission 'Demander des Infos' te permettra d'obtenir toutes les réponses.",
      };
    }

    // Détection des contacts généraux
    if (
      lowerText.includes("contact") ||
      lowerText.includes("écrire") ||
      lowerText.includes("message") ||
      lowerText.includes("parler") ||
      lowerText.includes("joindre") ||
      lowerText.includes("appeler") ||
      lowerText.includes("mail") ||
      lowerText.includes("email") ||
      lowerText.includes("bonjour") ||
      lowerText.includes("salut")
    ) {
      return {
        mission: "contact",
        explanation: "📞 Tu veux établir le contact avec nous ! La mission 'Établir le Contact' te mettra en relation avec nos Agents de Support.",
      };
    }

    // Cas spéciaux détectés par l'IA
    if (
      lowerText.includes("problème") ||
      lowerText.includes("bug") ||
      lowerText.includes("erreur") ||
      lowerText.includes("aide") ||
      lowerText.includes("support")
    ) {
      return {
        mission: "contact",
        explanation: "🔧 Tu as besoin d'assistance ! Nos Agents de Support sont prêts à t'aider via la mission 'Établir le Contact'.",
      };
    }

    if (
      lowerText.includes("partenariat") ||
      lowerText.includes("collaboration") ||
      lowerText.includes("entreprise") ||
      lowerText.includes("société")
    ) {
      return {
        mission: "contact",
        explanation: "🤝 Tu souhaites établir un partenariat ! Contacte-nous via 'Établir le Contact' pour discuter des opportunités.",
      };
    }

    if (
      lowerText.includes("stage") ||
      lowerText.includes("emploi") ||
      lowerText.includes("travail") ||
      lowerText.includes("job") ||
      lowerText.includes("recrutement")
    ) {
      return {
        mission: "benevole",
        explanation: "💼 Tu cherches une opportunité professionnelle ! Rejoins notre Guilde pour découvrir nos missions et projets.",
      };
    }

    // Default intelligent basé sur le contexte
    if (text.length > 50) {
      return {
        mission: "contact",
        explanation: "📡 J'ai analysé ta demande ! La mission 'Établir le Contact' te permettra de nous expliquer en détail ton besoin.",
      };
    }

    return {
      mission: "info",
      explanation: "🔍 Je détecte que tu as besoin d'en savoir plus ! La mission 'Demander des Infos' répondra à tes questions.",
    };
  };

  const handleExampleClick = (example: string) => {
    setUserIntent(example);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-6 rounded-xl bg-gradient-to-r from-[var(--secondary)]/10 to-[var(--accent)]/10 border border-[var(--secondary)]/30"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--accent)] flex items-center justify-center">
          <FiZap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-white">
            Assistant IA du Nexus 🤖
          </h3>
          <p className="text-xs text-gray-400">
            Décris ce que tu souhaites faire, je t&apos;orienterai automatiquement !
          </p>
        </div>
      </div>

      {/* Exemples de questions */}
      <div className="mb-4 flex flex-wrap gap-2">
        {exampleQuestions.slice(0, 4).map((example, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleExampleClick(example)}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700 text-gray-400 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
          >
            <FiMessageCircle className="w-3 h-3 inline mr-1" />
            {example.length > 30 ? example.substring(0, 30) + "..." : example}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={userIntent}
          onChange={(e) => setUserIntent(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && analyzeIntent()}
          placeholder="Ex: Je veux aider votre association, faire un don, poser une question..."
          className="input-cyber flex-1"
          disabled={isAnalyzing}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={analyzeIntent}
          disabled={isAnalyzing || !userIntent.trim()}
          className="btn-cyber btn-secondary px-6 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <FiLoader className="w-5 h-5 animate-spin" />
          ) : (
            <FiZap className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {suggestion && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="p-4 rounded-lg bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 border border-[var(--primary)]/40"
          >
            <div className="flex items-start gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0"
              >
                <FiCheck className="w-5 h-5 text-black" />
              </motion.div>
              <div className="flex-1">
                <p className="text-white mb-2">{suggestion.explanation}</p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 text-sm text-[var(--primary)]"
                >
                  <FiLoader className="w-4 h-4 animate-spin" />
                  <span>Chargement du formulaire...</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
