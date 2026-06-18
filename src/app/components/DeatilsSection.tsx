import { useRef } from 'react';
import styles from './DeatilsSection.module.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DeatilsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const outerCircleRef = useRef<HTMLDivElement>(null);
    const innerCircleRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        if (!sectionRef.current || !outerCircleRef.current || !innerCircleRef.current) return;

        gsap.set([innerCircleRef.current, outerCircleRef.current], { opacity: 0 })
        ScrollTrigger.create({
            trigger: innerCircleRef.current,
            start: "top 80%",
            onEnter: () => {
                const tl = gsap.timeline();
                tl.to(innerCircleRef.current, {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power4.out',
                })
                tl.to(outerCircleRef.current, {
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power4.out',
                }, 0.4)
            }
        })

    }, [])
    return (
        <section className={styles.detailsSection} ref={sectionRef}>
            <div className={styles.outerCircle} ref={outerCircleRef}></div>
            <div className={styles.innerCircle} ref={innerCircleRef}></div>
            <h1 className={styles.exploreText}>Explore</h1>
            <h1 className={styles.bullText}>The Bull</h1>
            <span className={styles.dragText}>(Drag the bull for 3D view)</span>
        </section>
    )
}

export default DeatilsSection