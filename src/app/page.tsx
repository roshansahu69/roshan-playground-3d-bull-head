'use client'
import { Canvas } from "@react-three/fiber";
import styles from "./page.module.css";
import Hero from "./components/Hero";
import DeatilsSection from "./components/DeatilsSection";
import Info2Section from "./components/Info2Section";
import Info1Section from "./components/Info1Section";
import { Navbar } from "./components/Navbar";
import { Experience } from "./components/Experience";

import { useState, useEffect } from "react";
import { Footer } from "./components/Footer";
import Loader from "./components/Loader";

export default function Home() {
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / window.innerHeight;
      setIsInteractive(progress >= 2.5);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.page}>
      <Loader />
      {/* Background 3D Canvas */}
      <div className={`${styles.canvasContainer} ${isInteractive ? styles.interactive : ""}`}>
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
          <Experience isInteractive={isInteractive} />
        </Canvas>
      </div>

      {/* Scrolling HTML Content */}
      <div className={styles.scrollContainer}>
        <Navbar />
        <Hero />
        <Info1Section />
        <Info2Section />
        <DeatilsSection />
      </div>

      <Footer />
    </div>
  );
}