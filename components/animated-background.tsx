"use client";

import { useEffect, useRef } from "react";

interface AnimatedBackgroundProps {
  variant?: "particles" | "waves" | "grid";
  colorScheme?: "purple" | "pink" | "mixed" | "lavender" | "red"; // Added lavender and red
  density?: "low" | "medium" | "high";
  speed?: "slow" | "medium" | "fast";
  opacity?: number;
}

export default function AnimatedBackground({
  variant = "particles",
  colorScheme = "mixed",
  density = "medium",
  speed = "medium",
  opacity = 1.05,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to container size
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Initial size
    resizeCanvas();

    // Resize on window resize
    window.addEventListener("resize", resizeCanvas);

    // Get colors based on colorScheme
    const colors = {
      purple: ["rgba(139, 92, 246, 0.7)", "rgba(124, 58, 237, 0.5)", "rgba(109, 40, 217, 0.3)"],
      pink: ["rgba(244, 114, 182, 0.7)", "rgba(236, 72, 153, 0.5)", "rgba(219, 39, 119, 0.3)"],
      mixed: ["rgba(139, 92, 246, 0.6)", "rgba(236, 72, 153, 0.5)", "rgba(109, 40, 217, 0.4)", "rgba(219, 39, 119, 0.3)"],
      lavender: ["rgba(230, 230, 250, 0.7)", "rgba(216, 191, 216, 0.6)", "rgba(183, 176, 230, 0.5)"],
      red: ["rgba(254, 202, 202, 0.7)", "rgba(252, 165, 165, 0.6)", "rgba(248, 113, 113, 0.5)", "rgba(239, 68, 68, 0.4)"]
    };

    const selectedColors = colors[colorScheme];
    
    // Get density count
    const densityFactors = { low: 0.3, medium: 1, high: 2 };
    const densityFactor = densityFactors[density];
    
    // Get speed factor
    const speedFactors = { slow: 0.5, medium: 1, fast: 2 };
    const speedFactor = speedFactors[speed];

    // Animation variables
    let animationFrameId: number;

    // Different animation variants
    if (variant === "particles") {
      // Particles animation
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000) * densityFactor;
      const particles: Array<{
        x: number;
        y: number;
        radius: number;
        color: string;
        speedX: number;
        speedY: number;
      }> = [];

      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: selectedColors[Math.floor(Math.random() * selectedColors.length)],
          speedX: (Math.random() - 0.5) * speedFactor,
          speedY: (Math.random() - 0.5) * speedFactor,
        });
      }

      // Draw particles
      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = opacity;
        
        // Draw particles
        particles.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();

          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });

        // Connect nearby particles with lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = particles[i].color;
              ctx.globalAlpha = opacity * (1 - distance / 100);
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        animationFrameId = requestAnimationFrame(drawParticles);
      };

      drawParticles();
    } else if (variant === "waves") {
      // Waves animation
      let phase = 0;
      const waveCount = 3 * densityFactor;
      
      const drawWaves = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = opacity;
        
        for (let i = 0; i < waveCount; i++) {
          const amplitude = canvas.height / (8 + i * 2);
          const wavelength = canvas.width / (2 + i);
          const color = selectedColors[i % selectedColors.length];
          
          ctx.beginPath();
          ctx.moveTo(0, canvas.height / 2);
          
          for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height / 2 + 
                     amplitude * Math.sin((x / wavelength) + phase + (i * Math.PI / 4));
            ctx.lineTo(x, y);
          }
          
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        phase += 0.005 * speedFactor;
        animationFrameId = requestAnimationFrame(drawWaves);
      };
      
      drawWaves();
    } else if (variant === "grid") {
      // Grid animation
      let offset = 0;
      const gridSize = 40 / densityFactor;
      
      const drawGrid = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = opacity;
        
        const rows = Math.ceil(canvas.height / gridSize);
        const cols = Math.ceil(canvas.width / gridSize);
        
        // Draw vertical lines
        for (let i = 0; i <= cols; i++) {
          const x = i * gridSize + (Math.sin(offset + i * 0.2) * 5);
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.strokeStyle = selectedColors[i % selectedColors.length];
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let i = 0; i <= rows; i++) {
          const y = i * gridSize + (Math.sin(offset + i * 0.2) * 5);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.strokeStyle = selectedColors[i % selectedColors.length];
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        
        // Draw points at intersections
        for (let i = 0; i <= cols; i++) {
          for (let j = 0; j <= rows; j++) {
            const x = i * gridSize + (Math.sin(offset + i * 0.2) * 5);
            const y = j * gridSize + (Math.sin(offset + j * 0.2) * 5);
            
            ctx.beginPath();
            ctx.arc(x, y, 1 + Math.sin(offset + i * j * 0.01) * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = selectedColors[(i + j) % selectedColors.length];
            ctx.fill();
          }
        }
        
        offset += 0.02 * speedFactor;
        animationFrameId = requestAnimationFrame(drawGrid);
      };
      
      drawGrid();
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant, colorScheme, density, speed, opacity]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}