"use client";

import { useEffect, useState } from "react";
import AnimatedLetter from "./animated-letter";

export default function Loader() {
  const [isActive, setIsActive] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const letters = "SYNEXIS".split("");

  useEffect(() => {
    // Wait for animation to complete before starting fade out
    const fadeOutTimer = setTimeout(() => {
      setIsActive(false);
    }, 2500);

    // Remove from DOM after animation completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center">
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
          className={`mt-6 mx-auto bg-gradient-to-r from-lavender-500 to-purple-600 h-1 transition-all duration-2000 ease-in-out ${
            isActive ? "w-full" : "w-0"
          }`}
          style={{
            transitionDelay: "800ms",
            maxWidth: "300px"
          }}
        ></div>
      </div>
    </div>
  );
}