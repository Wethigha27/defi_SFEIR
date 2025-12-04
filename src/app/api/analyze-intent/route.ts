import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `Tu es un assistant intelligent qui analyse l'intention d'un utilisateur pour le diriger vers la bonne mission sur un site d'association.

Les 4 missions disponibles sont :
1. "contact" : Pour envoyer un message, poser une question générale, établir un premier contact, signaler un problème, proposer un partenariat
2. "don" : Pour faire un don financier, contribuer à la cause, soutenir l'association, devenir mécène, sponsoriser
3. "benevole" : Pour devenir bénévole, rejoindre l'équipe, participer aux événements, aider, s'impliquer, chercher un stage ou une opportunité
4. "info" : Pour obtenir des informations sur l'association, les projets, les événements, comprendre le fonctionnement

IMPORTANT: Tu dois analyser TOUS types de demandes, même inhabituelles, et les mapper intelligemment vers une des 4 missions.

Exemples de mapping intelligent :
- "Je veux créer un jeu vidéo avec vous" → benevole (participation à un projet)
- "Mon entreprise veut vous aider" → contact (partenariat)
- "C'est pour un exposé scolaire" → info (recherche d'informations)
- "Je suis développeur et j'ai du temps libre" → benevole
- "Où va l'argent des dons ?" → info
- "Je veux organiser un événement ensemble" → contact
- "Comment fonctionne votre association ?" → info
- "Je peux donner du matériel" → don (contribution matérielle = don en nature)

Réponds UNIQUEMENT avec un JSON au format :
{
  "mission": "contact" | "don" | "benevole" | "info",
  "explanation": "Explication engageante et personnalisée en français (2-3 phrases max) avec des emojis appropriés. Mentionne spécifiquement ce que l'utilisateur a demandé."
}`;

export async function POST(request: NextRequest) {
  try {
    const { intent } = await request.json();

    if (!intent || typeof intent !== "string") {
      return NextResponse.json(
        { error: "Intent invalide" },
        { status: 400 }
      );
    }

    if (!OPENAI_API_KEY) {
      // Fallback without API key
      return NextResponse.json(analyzeLocally(intent));
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Analyse cette demande et oriente l'utilisateur: "${intent}"` },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI API error");
      return NextResponse.json(analyzeLocally(intent));
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    try {
      // Essayer de parser le JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.mission && parsed.explanation) {
          return NextResponse.json(parsed);
        }
      }
      return NextResponse.json(analyzeLocally(intent));
    } catch {
      return NextResponse.json(analyzeLocally(intent));
    }
  } catch (error) {
    console.error("Analyze intent error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

function analyzeLocally(text: string): { mission: string; explanation: string } {
  const lowerText = text.toLowerCase();

  // Détection des dons et contributions
  if (
    lowerText.includes("don") || 
    lowerText.includes("argent") || 
    lowerText.includes("financer") ||
    lowerText.includes("euro") ||
    lowerText.includes("€") ||
    lowerText.includes("payer") ||
    lowerText.includes("contribuer financ") ||
    lowerText.includes("mécène") ||
    lowerText.includes("sponsor") ||
    lowerText.includes("soutien financier") ||
    lowerText.includes("donation")
  ) {
    return {
      mission: "don",
      explanation: `🎯 Je comprends que tu souhaites soutenir financièrement notre cause ! La mission "Offrir un Don" 💰 est parfaite pour concrétiser ta générosité.`,
    };
  }

  // Détection du bénévolat et participation
  if (
    lowerText.includes("bénévol") ||
    lowerText.includes("participer") ||
    lowerText.includes("rejoindre") ||
    lowerText.includes("équipe") ||
    lowerText.includes("volontaire") ||
    lowerText.includes("membre") ||
    lowerText.includes("engager") ||
    lowerText.includes("impliquer") ||
    lowerText.includes("nuit de l'info") ||
    lowerText.includes("guilde") ||
    lowerText.includes("faire partie") ||
    lowerText.includes("aider") ||
    lowerText.includes("stage") ||
    lowerText.includes("développeur") ||
    lowerText.includes("designer") ||
    lowerText.includes("compétence")
  ) {
    return {
      mission: "benevole",
      explanation: `🛡️ Excellent ! Tu veux mettre tes talents au service du Nexus ! Rejoins notre Guilde des Bénévoles pour participer à nos missions épiques.`,
    };
  }

  // Détection des demandes d'information
  if (
    lowerText.includes("question") ||
    lowerText.includes("savoir") ||
    lowerText.includes("information") ||
    lowerText.includes("renseignement") ||
    lowerText.includes("en savoir plus") ||
    lowerText.includes("comment") ||
    lowerText.includes("qu'est") ||
    lowerText.includes("c'est quoi") ||
    lowerText.includes("expliquer") ||
    lowerText.includes("détail") ||
    lowerText.includes("projet") ||
    lowerText.includes("activité") ||
    lowerText.includes("fonctionnement") ||
    lowerText.includes("exposé") ||
    lowerText.includes("recherche")
  ) {
    return {
      mission: "info",
      explanation: `❓ Tu cherches des informations ! La mission "Demander des Infos" te permettra d'obtenir toutes les réponses à tes questions sur le Nexus.`,
    };
  }

  // Détection des contacts et partenariats
  if (
    lowerText.includes("contact") ||
    lowerText.includes("écrire") ||
    lowerText.includes("message") ||
    lowerText.includes("parler") ||
    lowerText.includes("joindre") ||
    lowerText.includes("partenariat") ||
    lowerText.includes("collaboration") ||
    lowerText.includes("entreprise") ||
    lowerText.includes("organiser") ||
    lowerText.includes("proposer") ||
    lowerText.includes("problème") ||
    lowerText.includes("suggestion")
  ) {
    return {
      mission: "contact",
      explanation: `📞 Je vois que tu souhaites établir le contact avec nous ! La mission "Établir le Contact" te mettra en relation directe avec nos Agents de Support.`,
    };
  }

  // Analyse contextuelle avancée pour cas non standards
  
  // Si la personne parle d'elle-même avec des compétences
  if (
    (lowerText.includes("je suis") || lowerText.includes("j'ai")) &&
    (lowerText.includes("temps") || lowerText.includes("disponible") || lowerText.includes("compétent"))
  ) {
    return {
      mission: "benevole",
      explanation: `💪 Super ! Tu as des compétences et du temps à offrir. Rejoins notre Guilde des Bénévoles pour les mettre à profit !`,
    };
  }

  // Si c'est une salutation
  if (
    lowerText.includes("bonjour") ||
    lowerText.includes("salut") ||
    lowerText.includes("hello") ||
    lowerText.includes("coucou")
  ) {
    return {
      mission: "contact",
      explanation: `👋 Salutations, voyageur ! Établis le contact avec nous pour démarrer une conversation avec notre équipe.`,
    };
  }

  // Default intelligent
  if (text.length > 100) {
    return {
      mission: "contact",
      explanation: `📡 J'ai analysé ta demande détaillée ! La mission "Établir le Contact" te permettra de nous expliquer en détail ton projet ou besoin.`,
    };
  }

  return {
    mission: "info",
    explanation: `🔍 Je vais t'orienter vers la mission "Demander des Infos" pour que tu puisses en apprendre davantage sur le Nexus et nos activités !`,
  };
}
