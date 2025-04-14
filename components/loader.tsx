"use client";

import { useEffect, useState, useRef } from "react";
import AnimatedLetter from "./animated-letter";

interface Node {
  x: number;
  y: number;
  radius: number;
  connections: Node[];
  pulseRadius: number;
  pulseOpacity: number;
  pulsing: boolean;
  pulseDelay: number;
}

export default function Loader() {
  const [isActive, setIsActive] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [randomValues, setRandomValues] = useState<
    { left: string; top: string; transform: string; opacity: number; binary: string }[]
  >([]);
  const letters = "SYNEXIS".split("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsActive(false);
    }, 2500);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    // Generate random values on the client side
    const generatedValues = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      transform: `rotate(${Math.random() * 360}deg)`,
      opacity: Math.random() * 0.5 + 0.1,
      binary: Array.from({ length: 15 })
        .map(() => Math.round(Math.random()))
        .join(""),
    }));
    setRandomValues(generatedValues);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const nodes: Node[] = [];
      const nodeCount = Math.floor(
        (window.innerWidth * window.innerHeight) / 15000
      );

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          connections: [],
          pulseRadius: 0,
          pulseOpacity: 0,
          pulsing: false,
          pulseDelay: Math.random() * 3000,
        });
      }

      nodes.forEach((node) => {
        const nearbyNodes = nodes
          .filter((otherNode) => {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) +
                Math.pow(node.y - otherNode.y, 2)
            );
            return node !== otherNode && distance < 150;
          })
          .slice(0, 3);

        node.connections = nearbyNodes;
      });

      let startTime = Date.now();

      const drawCircuit = () => {
        if (!isVisible) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        nodes.forEach((node) => {
          node.connections.forEach((connectedNode) => {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.strokeStyle = "rgba(147, 51, 234, 0.15)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          });
        });

        nodes.forEach((node) => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(147, 51, 234, 0.3)";
          ctx.fill();

          if (!node.pulsing && elapsedTime > node.pulseDelay) {
            node.pulsing = true;
          }

          if (node.pulsing) {
            node.pulseRadius += 0.3;
            node.pulseOpacity = Math.max(0, 0.7 - node.pulseRadius / 50);

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(147, 51, 234, ${node.pulseOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            if (node.pulseRadius > 50) {
              node.pulseRadius = 0;
              node.pulseOpacity = 0.7;
              node.pulseDelay = elapsedTime + Math.random() * 3000;
              node.pulsing = false;
            }
          }
        });

        requestAnimationFrame(drawCircuit);
      };

      drawCircuit();

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(removeTimer);
        window.removeEventListener("resize", resizeCanvas);
      };
    }

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.7 }}
      />

      <div className="absolute inset-0 overflow-hidden z-0 opacity-5">
        {randomValues.map((value, i) => (
          <div
            key={i}
            className="absolute text-xs text-purple-700 font-mono"
            style={{
              left: value.left,
              top: value.top,
              transform: value.transform,
              opacity: value.opacity,
            }}
          >
            {value.binary}
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(147, 51, 234, 0.03) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(147, 51, 234, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="text-center relative z-10">
        <h1 className="font-bold text-6xl sm:text-8xl">
          {letters.map((letter, index) => (
            <AnimatedLetter
              key={index}
              letter={letter}
              index={index}
              delay={150 + index * 100}
              isActive={isActive}
            />
          ))}
        </h1>

        <div
          className={`mt-6 mx-auto bg-gradient-to-r from-purple-500 to-purple-600 h-1 transition-all duration-2000 ease-in-out ${
            isActive ? "w-full" : "w-0"
          }`}
          style={{
            transitionDelay: "800ms",
            maxWidth: "300px",
            boxShadow: "0 0 10px rgba(147, 51, 234, 0.7)",
          }}
        />

        <div className="mt-3 text-sm text-purple-500 font-light opacity-70">
          <span className="inline-block animate-pulse">Loading</span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            .
          </span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            .
          </span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.6s" }}
          >
            .
          </span>
        </div>
      </div>
    </div>
  );
}