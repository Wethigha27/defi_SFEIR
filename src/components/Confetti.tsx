"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  size: number;
  delay: number;
  duration: number;
}

const confettiColors = [
  "#00f5d4",
  "#7b2cbf",
  "#f15bb5",
  "#fee440",
  "#ff006e",
  "#00bbf9",
];

// Seeded random for consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        x: seededRandom(i * 1) * 100,
        color: confettiColors[Math.floor(seededRandom(i * 2) * confettiColors.length)],
        rotation: seededRandom(i * 3) * 360,
        size: seededRandom(i * 4) * 10 + 5,
        delay: seededRandom(i * 5) * 0.5,
        duration: seededRandom(i * 6) * 2 + 2,
      });
    }
    setPieces(newPieces);
  }, []);

  // Don't render anything on server to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className="confetti-container">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: -20,
            width: piece.size,
            height: piece.size * 0.6,
            backgroundColor: piece.color,
            borderRadius: "2px",
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: "100vh",
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn" as const,
          }}
        />
      ))}
    </div>
  );
}
