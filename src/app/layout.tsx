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
  title: "Le Nexus Connecté - L'Écho Personnalisé",
  description: "Portail d'Intention pour la Nuit de l'Info - Rejoignez notre communauté et soutenez notre cause",
  keywords: ["nexus", "association", "don", "bénévolat", "contact", "nuit de l'info"],
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
