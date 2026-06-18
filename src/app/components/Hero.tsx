import styles from './Hero.module.css';
const Hero = () => {
    return (
        <section className={`${styles.heroSection} hero`}>
            <div className={`${styles.heroContent} hero-content`}>
                <h1>Unyielding Momentum</h1>
                <div className={styles.subHeading}><span>Sculpted for the bold</span></div>
                <p className={styles.description}>Experience the raw power of market optimism, rendered in stunning three-dimensional space. We don't just react to the market; we dictate its direction.</p>
            </div>
            <div className={styles.scrollInfo}>
                <div className={styles.scrollIndicator}></div>
                <p className={styles.scrollText}>(Scroll to explore the anatomy of strength)</p>
            </div>
        </section>
    )
}

export default Hero
