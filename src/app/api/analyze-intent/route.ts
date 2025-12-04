import { NextRequest, NextResponse } from "next/server";

// Mistral AI 🇫🇷 - IA française cohérente avec le thème NIRD
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

const SYSTEM_PROMPT = `Tu es un assistant intelligent du Village Numérique Résistant (démarche NIRD) qui analyse l'intention d'un utilisateur.

Contexte : NIRD = Numérique Inclusif, Responsable et Durable. Nous aidons les établissements scolaires à résister aux Big Tech avec Linux et les logiciels libres.

Les 4 missions disponibles sont :
1. "contact" : Pour envoyer un message, poser une question générale, établir un premier contact, signaler un problème, proposer un partenariat
2. "don" : Pour faire un don financier, soutenir le reconditionnement de matériel, financer les solutions libres
3. "benevole" : Pour devenir bénévole, rejoindre la résistance numérique, participer aux événements, aider à déployer Linux
4. "info" : Pour obtenir des informations sur NIRD, Linux, les logiciels libres, le reconditionnement, les projets

IMPORTANT: Tu dois analyser TOUS types de demandes et les mapper intelligemment vers une des 4 missions.

Exemples de mapping intelligent :
- "Je veux aider les écoles à installer Linux" → benevole
- "Mon entreprise veut sponsoriser" → contact (partenariat)
- "C'est quoi NIRD ?" → info
- "Je suis développeur et j'ai du temps libre" → benevole
- "Je veux donner du matériel informatique" → don
- "Comment fonctionne le reconditionnement ?" → info

Réponds UNIQUEMENT avec un JSON au format :
{
  "mission": "contact" | "don" | "benevole" | "info",
  "explanation": "Explication engageante en français (2-3 phrases max) avec des emojis. Mentionne le Village Résistant ou NIRD si pertinent."
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

    if (!MISTRAL_API_KEY) {
      // Fallback without API key
      return NextResponse.json(analyzeLocally(intent));
    }

    // Appel à l'API Mistral AI 🇫🇷
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Analyse cette demande et oriente l'utilisateur: "${intent}"` },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error("Mistral API error");
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

  // Détection NIRD spécifique
  if (
    lowerText.includes("nird") ||
    lowerText.includes("linux") ||
    lowerText.includes("logiciel libre") ||
    lowerText.includes("open source") ||
    lowerText.includes("reconditionnement") ||
    lowerText.includes("big tech") ||
    lowerText.includes("résistance") ||
    lowerText.includes("village")
  ) {
    return {
      mission: "info",
      explanation: `🏘️ Tu t'intéresses à notre démarche NIRD ! La mission "Demander des Infos" te permettra d'en apprendre plus sur la résistance numérique et les logiciels libres.`,
    };
  }

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
    lowerText.includes("donation") ||
    lowerText.includes("matériel")
  ) {
    return {
      mission: "don",
      explanation: `💎 Tu souhaites soutenir le Village Résistant ! Ton don aidera à financer le reconditionnement de matériel et le déploiement de Linux dans les écoles 🐧`,
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
    lowerText.includes("compétence") ||
    lowerText.includes("école") ||
    lowerText.includes("installer")
  ) {
    return {
      mission: "benevole",
      explanation: `🛡️ Excellent ! Tu veux rejoindre la résistance numérique ! La Guilde des Bénévoles t'attend pour aider les écoles à adopter Linux et les logiciels libres 🐧`,
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
      explanation: `❓ Tu cherches des informations sur le Village Résistant ! Découvre comment les écoles peuvent s'affranchir des Big Tech 🏘️`,
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
      explanation: `📞 Tu souhaites établir le contact avec le Village Résistant ! Notre équipe NIRD te répondra pour discuter de ta demande 🏘️`,
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
      explanation: `💪 Super ! Tu as des compétences à offrir au Village Résistant. Rejoins notre Guilde pour aider les écoles à adopter le numérique libre !`,
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
      explanation: `👋 Bienvenue au Village Numérique Résistant ! Établis le contact pour rejoindre notre communauté NIRD 🏘️`,
    };
  }

  // Default intelligent
  if (text.length > 100) {
    return {
      mission: "contact",
      explanation: `📡 J'ai analysé ta demande détaillée ! Contacte le Village Résistant pour nous expliquer ton projet ou besoin 🏘️`,
    };
  }

  return {
    mission: "info",
    explanation: `🔍 Découvre la démarche NIRD et comment le Village Résistant aide les écoles à adopter un numérique libre et durable ! 🌱`,
  };
}
