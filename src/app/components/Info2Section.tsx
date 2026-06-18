import { useGSAP } from '@gsap/react';
import styles from './Info2Section.module.css'
import { useRef } from 'react';
import gsap from 'gsap';

const Info2Section = () => {
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
        <section className={styles.info2Section} ref={sectionRef}>
            <div className={styles.infoContent}>
                <h1 ref={titleRef}>The Golden Trajectory</h1>
                <p className={styles.description} ref={descriptionRef}>Always looking up, always moving forward. The golden horns symbolize our relentless pursuit of growth. It’s not simply about reaching the top—it’s about piercing through the ceiling and defining new heights. Precision, clarity, and an aggressive drive for success.</p>
            </div>
        </section>)
}

export default Info2Section