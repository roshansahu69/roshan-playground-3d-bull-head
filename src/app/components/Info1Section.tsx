import { useRef } from 'react';
import styles from './Info1Section.module.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Info1Section = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    useGSAP(() => {
        if (!sectionRef.current || !titleRef.current || !descriptionRef.current) return;
        gsap.from([titleRef.current, descriptionRef.current], {
            opacity: 0,
            y: 20,
            duration: 1.4,
            stagger: 0.4,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
            }
        })
    }, [])
    return (
        <section className={styles.info1Section} ref={sectionRef}>
            <div className={styles.infoContent}>
                <h1 ref={titleRef}>Absolute Resolve</h1>
                <p className={styles.description} ref={descriptionRef}>True power isn't just about moving fast; it's about standing your ground when the pressure mounts. Forged from darkness and built to weather any economic storm, our foundation is immovable. We embrace the heavy lifting so you don't have to.</p>
            </div>
        </section>
    )
}

export default Info1Section