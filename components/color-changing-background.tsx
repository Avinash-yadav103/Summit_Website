"use client";

import { useEffect, useRef } from "react";

interface ColorChangingBackgroundProps {
  colors?: string[];
  duration?: number;
  opacity?: number;
  scrollFactor?: number;
}

export default function ColorChangingBackground({
  colors = ["#e9d5ff", "#f0abfc", "#d8b4fe", "#f5d0fe"],
  duration = 15, // Still used for auto-animation when not scrolling
  opacity = 0.08, // Reduced default opacity
  scrollFactor = 1.5 // Higher values make colors change faster on scroll
}: ColorChangingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const lastScrollY = useRef(0);
  const isScrolling = useRef(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match container
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Convert hex colors to rgba
    const rgbaColors = colors.map(hex => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    });

    // Animation variables
    let currentColorIndex = 0;
    let nextColorIndex = 1;
    
    // Scroll handler - update progress based on scroll position
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the section is through the viewport
      // -1 = completely above viewport, 0 = top at viewport top, 1 = bottom at viewport bottom, 2 = completely below viewport
      const sectionProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      
      // Clamp progress value between 0 and 1 and apply scroll factor
      const normalizedProgress = Math.max(0, Math.min(1, sectionProgress)) * scrollFactor;
      
      // Update progress for color change
      progressRef.current = normalizedProgress % 1;
      
      // Update color indices based on how far we've scrolled through all colors
      const totalProgress = normalizedProgress * (colors.length - 1);
      currentColorIndex = Math.floor(totalProgress) % colors.length;
      nextColorIndex = (currentColorIndex + 1) % colors.length;
      
      lastScrollY.current = window.scrollY;
      isScrolling.current = true;
      
      // Reset scroll flag after a short delay
      setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    // Create gradient animation
    const animate = () => {
      // Only auto-increment if not currently scrolling
      if (!isScrolling.current) {
        progressRef.current += 0.002 / duration;
        
        if (progressRef.current >= 1) {
          progressRef.current = 0;
          currentColorIndex = nextColorIndex;
          nextColorIndex = (nextColorIndex + 1) % rgbaColors.length;
        }
      }

      // Draw gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, rgbaColors[currentColorIndex]);
      gradient.addColorStop(1, rgbaColors[nextColorIndex]);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize position
    animate(); // Start animation loop

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, duration, opacity, scrollFactor]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
}