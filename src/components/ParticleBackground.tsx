"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  xOffset: number;
}

const colors = [
  "rgba(0, 245, 212, 0.6)",
  "rgba(123, 44, 191, 0.6)",
  "rgba(241, 91, 181, 0.6)",
  "rgba(254, 228, 64, 0.6)",
];

// Seeded random for consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: seededRandom(i * 1) * 100,
        y: seededRandom(i * 2) * 100,
        size: seededRandom(i * 3) * 4 + 2,
        duration: seededRandom(i * 4) * 20 + 10,
        delay: seededRandom(i * 5) * 5,
        color: colors[Math.floor(seededRandom(i * 6) * colors.length)],
        xOffset: seededRandom(i * 7) * 20 - 10,
      });
    }
    setParticles(newParticles);
  }, []);

  // Don't render anything on server to avoid hydration mismatch
  if (!isMounted) {
    return <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      ))}
    </div>
  );
}
