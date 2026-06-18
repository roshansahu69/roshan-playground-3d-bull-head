"use client";
import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Loader.module.css";
import { useGSAP } from "@gsap/react";

export default function Loader() {
  const { active, progress } = useProgress();
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Smoothly update the progress bar width based on loaded assets
  useGSAP(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [progress]);

  // When loading finishes, trigger premium slide-up and fade animations using GSAP
  useGSAP(() => {
    if (!active && progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
        },
      });

      tl.to([progressBarRef.current, progressTextRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.in",
      })
        .to(titleRef.current, {
          letterSpacing: "0.1em",
          opacity: 0,
          duration: 0.6,
          ease: "power3.inOut"
        }, "-=0.2")
        .to(containerRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.0,
          ease: "power4.inOut",
        }, "-=0.3");
    }
  }, [active, progress]);

  useGSAP(() => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    gsap.set(heroSection, { opacity: 0, y: 100 })
    if (isDone) {

      gsap.to(heroSection,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power4.out'
        })
    }
  }, [isDone])

  if (isDone) return null;

  return (
    <div ref={containerRef} className={styles.loaderContainer}>
      <div className={styles.loaderContent}>        <div className={styles.progressWrapper}>
        <div className={styles.progressTrack}>
          <div ref={progressBarRef} className={styles.progressBar} />
        </div>
        <span ref={progressTextRef} className={styles.progressText}>
          {Math.round(progress)}%
        </span>
      </div>
      </div>
    </div>
  );
}
