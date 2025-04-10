"use client";

import { useEffect, useState } from "react";

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);
    
    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseenter", updatePosition);
    window.addEventListener("mouseleave", () => setHidden(true));
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Add event listeners to all links and buttons
    const links = document.querySelectorAll("a, button");
    links.forEach(link => {
      link.addEventListener("mouseenter", handleLinkHoverStart);
      link.addEventListener("mouseleave", handleLinkHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseenter", updatePosition);
      window.removeEventListener("mouseleave", () => setHidden(true));
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleLinkHoverStart);
        link.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-300 ${
          hidden ? "opacity-0" : "opacity-100"
        } ${clicked ? "scale-75" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: linkHovered ? "60px" : "24px",
          height: linkHovered ? "60px" : "24px",
          backgroundColor: linkHovered ? "rgba(236, 72, 153, 0.5)" : "white",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, background-color 0.3s, opacity 0.3s",
        }}
      />
      
      {/* Cursor trail effect */}
      <div
        className="fixed pointer-events-none z-40 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "120px",
          height: "120px",
          transform: "translate(-50%, -50%)",
          opacity: hidden ? 0 : 0.6,
          transition: "opacity 0.3s, left 0.5s ease-out, top 0.5s ease-out",
        }}
      />
    </>
  );
}