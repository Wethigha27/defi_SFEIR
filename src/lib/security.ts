// Security utilities for form protection

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT = {
  maxRequests: 5, // Max requests per window
  windowMs: 60000, // 1 minute window
};

/**
 * Check if a request should be rate limited
 */
export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return {
      allowed: true,
      remaining: RATE_LIMIT.maxRequests - 1,
      resetIn: RATE_LIMIT.windowMs,
    };
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.resetTime - now,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT.maxRequests - record.count,
    resetIn: record.resetTime - now,
  };
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (French format)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+33|0)[1-9](\s?\d{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Sanitize text input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/**
 * Check for spam patterns in text
 */
export function detectSpam(text: string): boolean {
  const spamPatterns = [
    /https?:\/\/[^\s]+/gi, // Multiple URLs
    /\b(viagra|casino|lottery|winner|click here|free money)\b/gi,
    /(.)\1{10,}/gi, // Repeated characters
    /\b[A-Z]{10,}\b/g, // All caps words
  ];

  let spamScore = 0;
  
  for (const pattern of spamPatterns) {
    if (pattern.test(text)) {
      spamScore++;
    }
  }

  // Check for multiple URLs
  const urlMatches = text.match(/https?:\/\/[^\s]+/gi);
  if (urlMatches && urlMatches.length > 2) {
    spamScore += 2;
  }

  return spamScore >= 2;
}

/**
 * Validate form data based on mission type
 */
export function validateFormData(
  data: Record<string, unknown>,
  mission: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Common validations
  if (!data.nom || typeof data.nom !== "string" || data.nom.trim().length < 2) {
    errors.push("Le nom est requis (minimum 2 caractères)");
  }

  if (!data.email || typeof data.email !== "string" || !validateEmail(data.email)) {
    errors.push("Email invalide");
  }

  // Check honeypot
  if (data.website && typeof data.website === "string" && data.website.length > 0) {
    errors.push("Détection de bot - soumission rejetée");
  }

  // Check for spam in text fields
  const textFields = ["message", "motivation", "questionSpecifique"];
  for (const field of textFields) {
    if (data[field] && typeof data[field] === "string" && detectSpam(data[field] as string)) {
      errors.push("Contenu suspect détecté");
      break;
    }
  }

  // Mission-specific validations
  switch (mission) {
    case "contact":
      if (!data.sujet || typeof data.sujet !== "string" || data.sujet.trim().length < 3) {
        errors.push("Le sujet est requis");
      }
      if (!data.message || typeof data.message !== "string" || data.message.trim().length < 10) {
        errors.push("Le message doit contenir au moins 10 caractères");
      }
      break;

    case "don":
      const montant = data.montant || data.montantPersonnalise;
      if (!montant || (typeof montant === "number" && montant < 1)) {
        errors.push("Le montant du don est requis");
      }
      break;

    case "benevole":
      if (!data.telephone || typeof data.telephone !== "string") {
        errors.push("Le téléphone est requis");
      }
      if (!data.competences || !Array.isArray(data.competences) || data.competences.length === 0) {
        errors.push("Sélectionnez au moins une compétence");
      }
      if (!data.motivation || typeof data.motivation !== "string" || data.motivation.trim().length < 20) {
        errors.push("Décrivez votre motivation (minimum 20 caractères)");
      }
      break;

    case "info":
      if (!data.typeInfo || typeof data.typeInfo !== "string") {
        errors.push("Sélectionnez un type d'information");
      }
      if (!data.questionSpecifique || typeof data.questionSpecifique !== "string" || data.questionSpecifique.trim().length < 10) {
        errors.push("Posez votre question (minimum 10 caractères)");
      }
      break;
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate a simple CSRF-like token
 */
export function generateToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}



