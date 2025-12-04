import { NextRequest, NextResponse } from "next/server";

// Configure your OpenAI API key in environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages invalides" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!OPENAI_API_KEY) {
      // Fallback responses when no API key is configured
      return NextResponse.json({
        message: getFallbackResponse(messages[messages.length - 1]?.content || ""),
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages as ChatMessage[],
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      return NextResponse.json({
        message: getFallbackResponse(messages[messages.length - 1]?.content || ""),
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    return NextResponse.json({
      message: assistantMessage || "Je médite sur ta question... 🧘",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Erreur serveur", message: "Les circuits sont perturbés... 🔧" },
      { status: 500 }
    );
  }
}

// Fallback responses when OpenAI is not available
function getFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (message.includes("bonjour") || message.includes("salut") || message.includes("hello")) {
    return "Salutations, voyageur ! 🚀 Bienvenue dans le Nexus Connecté. Je suis Axolotl 🦎, ton guide. Comment puis-je t'aider ?";
  }

  if (message.includes("don") || message.includes("donner") || message.includes("contribution")) {
    return "Tu souhaites offrir un Don de Ressources ? 💎 C'est une noble quête ! Clique sur 'Offrir un Don' dans le Portail d'Intention pour contribuer à notre cause. Chaque don nous aide à financer la Nuit de l'Info ! 🙏";
  }

  if (message.includes("bénévol") || message.includes("guilde") || message.includes("rejoindre")) {
    return "Tu veux rejoindre la Guilde des Bénévoles ? 🛡️ Excellent choix, guerrier du code ! Sélectionne 'Rejoindre la Guilde' dans le Portail et partage tes compétences. Ensemble, nous accomplirons de grandes missions ! ⚔️";
  }

  if (message.includes("contact") || message.includes("message") || message.includes("écrire")) {
    return "Pour établir le contact avec nos Agents de Support 🕵️, choisis 'Établir le Contact' dans le Portail d'Intention. Nous te répondrons sous peu via les canaux cryptés ! 📡";
  }

  if (message.includes("info") || message.includes("information") || message.includes("question")) {
    return "Tu cherches des informations sur le Nexus ? 🔍 Sélectionne 'Demander des Infos' dans le Portail pour poser tes questions. Nos analystes sont prêts à t'éclairer ! ✨";
  }

  if (message.includes("nuit") || message.includes("info") || message.includes("événement")) {
    return "La Nuit de l'Info 🌃 est un événement épique où les Chevaliers du Code se rassemblent pour relever des défis ! Notre association y participe activement. Veux-tu en savoir plus ou nous rejoindre ? 🚀";
  }

  if (message.includes("merci") || message.includes("thanks")) {
    return "C'est moi qui te remercie, voyageur ! 🙏 Que la puissance du code t'accompagne dans tes quêtes. N'hésite pas si tu as d'autres questions ! ⚡";
  }

  if (message.includes("aide") || message.includes("help")) {
    return "Je suis là pour te guider ! 🦎 Tu peux :\n• 📞 Établir le Contact\n• 💰 Offrir un Don\n• 🛡️ Rejoindre la Guilde\n• ❓ Demander des Infos\n\nQuelle mission t'intéresse ?";
  }

  // Default response
  const responses = [
    "Intéressante question, voyageur ! 🤔 Pour mieux te guider, utilise le Portail d'Intention ci-dessus. Choisis ta mission et je t'accompagnerai ! 🚀",
    "Les flux de données me suggèrent de t'orienter vers le Portail d'Intention ! 🌐 Là, tu pourras choisir ta voie : Contact, Don, Bénévolat ou Informations. Que la force du code soit avec toi ! ⚡",
    "Ah, une énigme que même les anciens circuits n'avaient pas prévue ! 🦎 Explore le Portail d'Intention pour découvrir comment contribuer au Nexus. Chaque action compte ! ✨",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

