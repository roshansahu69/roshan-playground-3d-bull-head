import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLeft}>
                <span>3D model by <a href="https://polyhaven.com/all?a=Tina" target="_blank" rel="noopener noreferrer">Tina</a></span>
                <a href="https://polyhaven.com/a/bull_head" target="_blank" rel="noopener noreferrer">Get the Model</a>
            </div>
            <div className={styles.footerRight}>
                <span>Developed by:</span>
                <a href="https://roshan-sahu.com" target="_blank" rel="noopener noreferrer">Roshan Sahu</a>
            </div>
        </footer>
    )
}
