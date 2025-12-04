"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MissionType } from "./MissionSelector";
import { useState } from "react";
import { FiSend, FiLoader, FiShield, FiLock } from "react-icons/fi";

export interface FormData {
  // Common fields
  nom: string;
  email: string;
  // Honeypot field (anti-spam)
  website?: string;
  // Contact fields
  sujet?: string;
  message?: string;
  // Don fields
  montant?: number;
  montantPersonnalise?: string;
  recurrence?: "unique" | "mensuel" | "annuel";
  anonyme?: boolean;
  // Bénévole fields
  telephone?: string;
  competences?: string[];
  disponibilite?: string;
  motivation?: string;
  // Info fields
  typeInfo?: string;
  questionSpecifique?: string;
}

interface DynamicFormProps {
  mission: MissionType;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const montantsPredifinis = [10, 25, 50, 100, 250];
const competencesOptions = [
  "Développement Web",
  "Design Graphique",
  "Communication",
  "Événementiel",
  "Rédaction",
  "Photographie",
  "Vidéo",
  "Autre",
];

export default function DynamicForm({
  mission,
  onSubmit,
  isLoading,
}: DynamicFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [montantSelectionne, setMontantSelectionne] = useState<number | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCompetenceChange = (competence: string) => {
    setFormData((prev) => {
      const currentCompetences = prev.competences || [];
      if (currentCompetences.includes(competence)) {
        return {
          ...prev,
          competences: currentCompetences.filter((c) => c !== competence),
        };
      } else {
        return { ...prev, competences: [...currentCompetences, competence] };
      }
    });
  };

  const handleMontantSelect = (montant: number) => {
    setMontantSelectionne(montant);
    setFormData((prev) => ({ ...prev, montant, montantPersonnalise: "" }));
  };

  const handleMontantPersonnalise = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMontantSelectionne(null);
    setFormData((prev) => ({
      ...prev,
      montant: undefined,
      montantPersonnalise: e.target.value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // Honeypot check - if filled, it's a bot
    if (formData.website && formData.website.length > 0) {
      console.log("Bot detected via honeypot");
      return false; // Silently reject
    }

    // Common validations
    if (!formData.nom.trim()) {
      newErrors.nom = "Votre nom est requis";
    } else if (formData.nom.trim().length < 2) {
      newErrors.nom = "Le nom doit contenir au moins 2 caractères";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Votre email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    // Mission-specific validations
    if (mission === "contact") {
      if (!formData.sujet?.trim()) {
        newErrors.sujet = "Le sujet est requis";
      }
      if (!formData.message?.trim()) {
        newErrors.message = "Le message est requis";
      }
    }

    if (mission === "don") {
      if (!formData.montant && !formData.montantPersonnalise?.trim()) {
        newErrors.montant = "Veuillez sélectionner ou entrer un montant";
      }
    }

    if (mission === "benevole") {
      if (!formData.telephone?.trim()) {
        newErrors.telephone = "Votre téléphone est requis";
      }
      if (!formData.competences?.length) {
        newErrors.competences = "Sélectionnez au moins une compétence";
      }
      if (!formData.motivation?.trim()) {
        newErrors.motivation = "Parlez-nous de votre motivation";
      }
    }

    if (mission === "info") {
      if (!formData.typeInfo?.trim()) {
        newErrors.typeInfo = "Sélectionnez un type d'information";
      }
      if (!formData.questionSpecifique?.trim()) {
        newErrors.questionSpecifique = "Posez votre question";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  if (!mission) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.form
        key={mission}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={handleSubmit}
        className="space-y-6"
        role="form"
        aria-label={`Formulaire de ${mission === 'contact' ? 'contact' : mission === 'don' ? 'don' : mission === 'benevole' ? 'bénévolat' : 'demande d\'informations'}`}
      >
        {/* Honeypot field - Anti-spam 🔒 */}
        <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Common Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={fieldVariants}>
            <label htmlFor="nom" className="label-cyber">
              Nom d&apos;Utilisateur <span className="text-[var(--danger)]" aria-hidden="true">*</span>
              <span className="sr-only">(requis)</span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Entrez votre nom de code..."
              className="input-cyber"
              aria-required="true"
              aria-invalid={!!errors.nom}
              aria-describedby={errors.nom ? "nom-error" : undefined}
            />
            {errors.nom && <p id="nom-error" className="error-msg" role="alert">{errors.nom}</p>}
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label htmlFor="email" className="label-cyber">
              Canal Email <span className="text-[var(--danger)]" aria-hidden="true">*</span>
              <span className="sr-only">(requis)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre.email@nexus.com"
              className="input-cyber"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="error-msg" role="alert">{errors.email}</p>}
          </motion.div>
        </div>

        {/* Contact Form Fields */}
        {mission === "contact" && (
          <>
            <motion.div variants={fieldVariants}>
              <label htmlFor="sujet" className="label-cyber">
                Sujet du Message <span className="text-[var(--danger)]" aria-hidden="true">*</span>
                <span className="sr-only">(requis)</span>
              </label>
              <input
                type="text"
                id="sujet"
                name="sujet"
                value={formData.sujet || ""}
                onChange={handleChange}
                placeholder="De quoi souhaitez-vous discuter ?"
                className="input-cyber"
                aria-required="true"
                aria-invalid={!!errors.sujet}
              />
              {errors.sujet && <p className="error-msg" role="alert">{errors.sujet}</p>}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label htmlFor="message" className="label-cyber">
                Votre Message <span className="text-[var(--danger)]" aria-hidden="true">*</span>
                <span className="sr-only">(requis)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message || ""}
                onChange={handleChange}
                placeholder="Transmettez votre message au Nexus..."
                className="textarea-cyber"
                rows={5}
                aria-required="true"
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="error-msg" role="alert">{errors.message}</p>}
            </motion.div>
          </>
        )}

        {/* Don Form Fields */}
        {mission === "don" && (
          <>
            <motion.div variants={fieldVariants}>
              <label className="label-cyber">
                Montant du Don 💎 <span className="text-[var(--danger)]">*</span>
              </label>
              <div className="flex flex-wrap gap-3 mb-4">
                {montantsPredifinis.map((montant) => (
                  <button
                    key={montant}
                    type="button"
                    onClick={() => handleMontantSelect(montant)}
                    className={`amount-btn ${
                      montantSelectionne === montant ? "selected" : ""
                    }`}
                  >
                    {montant}€
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">ou</span>
                <input
                  type="number"
                  name="montantPersonnalise"
                  value={formData.montantPersonnalise || ""}
                  onChange={handleMontantPersonnalise}
                  placeholder="Montant personnalisé"
                  className="input-cyber flex-1"
                  min="1"
                />
                <span className="text-[var(--gold)]">€</span>
              </div>
              {errors.montant && <p className="error-msg">{errors.montant}</p>}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="label-cyber">Récurrence 🔄</label>
              <select
                name="recurrence"
                value={formData.recurrence || "unique"}
                onChange={handleChange}
                className="select-cyber"
              >
                <option value="unique">Don unique</option>
                <option value="mensuel">Don mensuel</option>
                <option value="annuel">Don annuel</option>
              </select>
            </motion.div>

            <motion.div variants={fieldVariants} className="flex items-center gap-3">
              <input
                type="checkbox"
                name="anonyme"
                id="anonyme"
                checked={formData.anonyme || false}
                onChange={handleChange}
                className="checkbox-cyber"
              />
              <label htmlFor="anonyme" className="text-gray-300 cursor-pointer">
                Faire un don anonyme 🎭
              </label>
            </motion.div>
          </>
        )}

        {/* Bénévole Form Fields */}
        {mission === "benevole" && (
          <>
            <motion.div variants={fieldVariants}>
              <label className="label-cyber">
                Canal Téléphonique <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone || ""}
                onChange={handleChange}
                placeholder="+33 6 00 00 00 00"
                className="input-cyber"
              />
              {errors.telephone && (
                <p className="error-msg">{errors.telephone}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="label-cyber">
                Compétences & Pouvoirs 🛡️{" "}
                <span className="text-[var(--danger)]">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {competencesOptions.map((competence) => (
                  <button
                    key={competence}
                    type="button"
                    onClick={() => handleCompetenceChange(competence)}
                    className={`p-3 rounded-lg border-2 transition-all text-sm ${
                      formData.competences?.includes(competence)
                        ? "border-[var(--secondary)] bg-[var(--secondary)]/20 text-[var(--secondary)]"
                        : "border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    {competence}
                  </button>
                ))}
              </div>
              {errors.competences && (
                <p className="error-msg">{errors.competences}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="label-cyber">Disponibilité 📅</label>
              <select
                name="disponibilite"
                value={formData.disponibilite || ""}
                onChange={handleChange}
                className="select-cyber"
              >
                <option value="">Sélectionnez votre disponibilité</option>
                <option value="weekend">Weekends</option>
                <option value="semaine">En semaine</option>
                <option value="soir">Soirs uniquement</option>
                <option value="flexible">Flexible</option>
              </select>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="label-cyber">
                Motivation & Vision <span className="text-[var(--danger)]">*</span>
              </label>
              <textarea
                name="motivation"
                value={formData.motivation || ""}
                onChange={handleChange}
                placeholder="Pourquoi souhaitez-vous rejoindre notre guilde ?"
                className="textarea-cyber"
                rows={4}
              />
              {errors.motivation && (
                <p className="error-msg">{errors.motivation}</p>
              )}
            </motion.div>
          </>
        )}

        {/* Info Form Fields */}
        {mission === "info" && (
          <>
            <motion.div variants={fieldVariants}>
              <label className="label-cyber">
                Type d&apos;Information <span className="text-[var(--danger)]">*</span>
              </label>
              <select
                name="typeInfo"
                value={formData.typeInfo || ""}
                onChange={handleChange}
                className="select-cyber"
              >
                <option value="">Choisissez une catégorie</option>
                <option value="projets">Nos Projets en Cours</option>
                <option value="evenements">Événements à Venir</option>
                <option value="partenariat">Devenir Partenaire</option>
                <option value="association">L&apos;Association</option>
                <option value="autre">Autre</option>
              </select>
              {errors.typeInfo && (
                <p className="error-msg">{errors.typeInfo}</p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="label-cyber">
                Votre Question <span className="text-[var(--danger)]">*</span>
              </label>
              <textarea
                name="questionSpecifique"
                value={formData.questionSpecifique || ""}
                onChange={handleChange}
                placeholder="Posez votre question, nos Agents de Support sont prêts à vous répondre..."
                className="textarea-cyber"
                rows={4}
              />
              {errors.questionSpecifique && (
                <p className="error-msg">{errors.questionSpecifique}</p>
              )}
            </motion.div>
          </>
        )}

        {/* Submit Button */}
        <motion.div variants={fieldVariants} className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`btn-cyber w-full flex items-center justify-center gap-3 ${
              mission === "contact"
                ? "btn-primary"
                : mission === "don"
                ? "bg-gradient-to-r from-[var(--gold)] to-yellow-500 text-black"
                : mission === "benevole"
                ? "btn-secondary"
                : "btn-accent"
            }`}
          >
            {isLoading ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin" />
                Transmission en cours...
              </>
            ) : (
              <>
                <FiSend className="w-5 h-5" />
                {mission === "contact" && "Envoyer le Message"}
                {mission === "don" && "Confirmer le Don"}
                {mission === "benevole" && "Rejoindre la Guilde"}
                {mission === "info" && "Envoyer la Demande"}
              </>
            )}
          </button>

          {/* Security Badge 🔒 */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FiShield className="w-4 h-4 text-[var(--primary)]" />
              <span>Données sécurisées</span>
            </div>
            <div className="flex items-center gap-1">
              <FiLock className="w-4 h-4 text-[var(--primary)]" />
              <span>Connexion cryptée</span>
            </div>
          </div>
        </motion.div>
      </motion.form>
    </AnimatePresence>
  );
}

