import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, validateFormData, sanitizeInput } from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Trop de requêtes. Veuillez patienter quelques instants. ⏳",
          retryAfter: Math.ceil(rateLimit.resetIn / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000)),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
          },
        }
      );
    }

    const body = await request.json();
    const { mission, data } = body;

    if (!mission || !data) {
      return NextResponse.json(
        { success: false, error: "Données manquantes" },
        { status: 400 }
      );
    }

    // Validate form data
    const validation = validateFormData(data, mission);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation échouée",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Sanitize all string inputs
    const sanitizedData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        sanitizedData[key] = sanitizeInput(value);
      } else {
        sanitizedData[key] = value;
      }
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify admins
    // For now, we just return success

    console.log("Form submission received:", {
      mission,
      data: sanitizedData,
      ip,
      timestamp: new Date().toISOString(),
    });

    // Generate confirmation reference
    const reference = `NX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      message: "Soumission réussie ! 🎉",
      reference,
      mission,
      nom: sanitizedData.nom,
      montant: sanitizedData.montant || sanitizedData.montantPersonnalise,
    });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}



