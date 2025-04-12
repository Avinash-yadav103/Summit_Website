"use client";

import { useEffect, useRef } from "react";

interface BubbleAnimationProps {
  count?: number;
  speed?: "slow" | "medium" | "fast";
  opacity?: number;
  colorScheme?: "lavender" | "purple" | "mixed";
  size?: "small" | "mixed" | "large";
}

export default function BubbleAnimation({
  count = 15,
  speed = "medium",
  opacity = 0.15,
  colorScheme = "lavender",
  size = "mixed"
}: BubbleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = {
      lavender: ["rgba(230, 230, 250, 0.7)", "rgba(216, 191, 216, 0.6)", "rgba(183, 176, 230, 0.5)"],
      purple: ["rgba(139, 92, 246, 0.6)", "rgba(168, 85, 247, 0.5)", "rgba(126, 34, 206, 0.4)"],
      mixed: ["rgba(230, 230, 250, 0.6)", "rgba(168, 85, 247, 0.5)", "rgba(183, 176, 230, 0.4)", "rgba(219, 39, 119, 0.3)"]
    };

    const selectedColors = colors[colorScheme];
    
    const speedFactors = { slow: 0.3, medium: 0.6, fast: 1 };
    const speedFactor = speedFactors[speed];

    const bubbles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speedY: number;
      wobbleSpeed: number;
      wobbleSize: number;
      wobbleOffset: number;
    }> = [];

    // Get size ranges based on size prop
    const getSizeRange = () => {
      switch (size) {
        case "small": return { min: 3, max: 10 };
        case "large": return { min: 10, max: 30 };
        default: return { min: 3, max: 20 };
      }
    };

    const sizeRange = getSizeRange();

    // Initialize bubbles
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: selectedColors[Math.floor(Math.random() * selectedColors.length)],
        speedY: (0.2 + Math.random() * 0.8) * speedFactor,
        wobbleSpeed: 0.01 + Math.random() * 0.02,
        wobbleSize: 2 + Math.random() * 5,
        wobbleOffset: Math.random() * Math.PI * 2
      });
    }

    // Animation loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = opacity;
      time += 0.01;

      bubbles.forEach(bubble => {
        // Move bubble upward
        bubble.y -= bubble.speedY;
        
        // Add wobble motion
        const wobbleX = Math.sin(time * bubble.wobbleSpeed + bubble.wobbleOffset) * bubble.wobbleSize;
        
        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x + wobbleX, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        
        // Add highlight to make it look like a bubble
        ctx.beginPath();
        ctx.arc(
          bubble.x + wobbleX - bubble.radius * 0.3, 
          bubble.y - bubble.radius * 0.3, 
          bubble.radius * 0.3, 
          0, Math.PI * 2
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();

        // Reset bubble position when it goes off screen
        if (bubble.y < -bubble.radius * 2) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, speed, opacity, colorScheme, size]);

  // Make sure the container takes up the full viewport
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh' }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}