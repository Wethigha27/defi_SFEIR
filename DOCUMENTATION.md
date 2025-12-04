# 📚 Documentation - Village Numérique Résistant NIRD

> **Défi SFEIR - Nuit de l'Info 2025**

Application web pour promouvoir un numérique éducatif plus libre et durable. Aide les établissements scolaires à résister aux Big Tech grâce à Linux, aux logiciels libres et au reconditionnement.

🔗 **URL** : https://defi-sfeir-tsb6.vercel.app/

---

## 🎯 Le Thème NIRD

| Pilier | Signification |
|--------|--------------|
| 🤝 **N**umérique **I**nclusif | Accessibilité pour tous |
| ♻️ **R**esponsable | Éthique, sobriété, respect des données |
| 🌱 **D**urable | Linux, logiciels libres, reconditionnement |

---

## ⚡ Fonctionnalités Principales

1. **4 Missions disponibles**
   - 📞 Établir le Contact
   - 💰 Offrir un Don
   - 🛡️ Rejoindre la Guilde (bénévolat)
   - ❓ Demander des Infos

2. **Assistant IA** (Mistral AI 🇫🇷)
   - Analyse l'intention de l'utilisateur en langage naturel
   - Suggère automatiquement la mission appropriée

3. **Formulaire Dynamique**
   - S'adapte selon la mission choisie
   - Validation des données avec Zod

4. **Page de Confirmation Personnalisée**
   - Message adapté à la mission
   - Intégration du thème NIRD

5. **Sécurité**
   - Protection anti-spam (Honeypot)
   - Rate limiting (5 req/min)
   - Sanitization contre XSS

---

## 🛠️ Stack Technique

| Technologie | Utilisation |
|-------------|-------------|
| **Next.js 16** | Framework React |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Mistral AI** 🇫🇷 | IA française |

---

## 📦 Installation

```bash
# Cloner et installer
git clone https://github.com/Wethigha27/defi_SFEIR.git
cd defi_SFEIR
npm install

# Lancer le serveur
npm run dev
```

> **Variable optionnelle** : Créer `.env.local` avec `MISTRAL_API_KEY=votre-clé`
>
> L'app fonctionne aussi sans clé API (réponses prédéfinies).

---

## 📁 Structure du Projet

```
src/
├── app/
│   ├── api/
│   │   ├── analyze-intent/   → API Mistral AI
│   │   └── submit/           → API soumission formulaire
│   ├── confirmation/         → Page de confirmation
│   ├── globals.css           → Styles globaux
│   └── page.tsx              → Page d'accueil
├── components/
│   ├── AIAssistant.tsx       → Assistant IA
│   ├── Confetti.tsx          → Animation confetti
│   ├── DynamicForm.tsx       → Formulaire dynamique
│   ├── Header.tsx            → En-tête
│   ├── MissionSelector.tsx   → Sélecteur de mission
│   └── ParticleBackground.tsx → Fond animé
└── lib/
    └── security.ts           → Sécurité (rate limit, validation)
```

---

## ♿ Accessibilité

- ✅ Labels ARIA sur les formulaires
- ✅ Navigation au clavier
- ✅ Focus visible
- ✅ Contrastes suffisants
- ✅ Structure HTML5 sémantique
- ✅ Responsive (mobile-first)

---

## 👨‍💻 Équipe & Crédits

**Équipe 404** • Nuit de l'Info 2025 • Défi SFEIR 🦎

---

🏘️ *Ensemble, construisons un numérique éducatif plus autonome, plus durable, plus éthique !*

**NIRD** : 🤝 Inclusif • ♻️ Responsable • 🌱 Durable

