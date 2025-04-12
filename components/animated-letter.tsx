"use client";

import { useState, useEffect } from "react";

interface AnimatedLetterProps {
  letter: string;
  index: number;
  delay: number;
  isActive: boolean;
}

export default function AnimatedLetter({ letter, index, delay, isActive }: AnimatedLetterProps) {
  const [animationState, setAnimationState] = useState("initial"); // initial, zooming, visible, dissolving
  
  useEffect(() => {
    // First animation: Start zooming in
    const zoomTimer = setTimeout(() => {
      setAnimationState("zooming");
    }, delay);
    
    // Second animation: Fully visible
    const visibleTimer = setTimeout(() => {
      setAnimationState("visible");
    }, delay + 300);
    
    // Handle dissolve effect when isActive becomes false
    if (!isActive) {
      setAnimationState("dissolving");
    }
    
    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(visibleTimer);
    };
  }, [delay, isActive]);
  
  // Enhanced animation classes for more dramatic zoom from screen and dissolve
  const animationClasses = {
    initial: "opacity-0 scale-0 translate-z-0 translate-y-20",
    zooming: "opacity-90 scale-[1.8] translate-z-20 translate-y-0", 
    visible: "opacity-100 scale-100 translate-z-0 translate-y-0",
    dissolving: "opacity-0 scale-[3] blur-xl rotate-12 translate-y-[-20px]"
  };
  
  return (
    <span 
      className={`inline-block transition-all duration-700 transform-gpu ${animationClasses[animationState]}`}
      style={{ 
        transitionDelay: animationState === "dissolving" ? `${index * 70}ms` : `${delay}ms`,
        transitionTimingFunction: animationState === "zooming" ? "cubic-bezier(0.19, 1, 0.22, 1)" : 
                                 animationState === "dissolving" ? "cubic-bezier(0.95, 0.05, 0.795, 0.035)" : 
                                 "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        color: "transparent",
        backgroundClip: "text",
        backgroundImage: "linear-gradient(to right, #9370DB, #8A2BE2)",
        perspective: "1000px",
        perspectiveOrigin: "center",
      }}
    >
      {letter}
    </span>
  );
}