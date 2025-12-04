import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Village Numérique Résistant - NIRD | Nuit de l'Info 2025",
  description: "Portail d'Intention pour un Numérique Inclusif, Responsable et Durable. Aidons les établissements scolaires à résister aux Big Tech avec Linux et les logiciels libres.",
  keywords: ["NIRD", "numérique responsable", "linux", "logiciels libres", "écoles", "nuit de l'info 2025", "village résistant"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className="bg-animated font-body">
        <div className="grid-pattern" />
        {children}
      </body>
    </html>
  );
}
