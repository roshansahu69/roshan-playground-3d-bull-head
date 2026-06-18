import styles from './Navbar.module.css'

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <span>3D Playground</span>
            <a href="https://roshan-sahu.com" target='_blank'>Contact</a>
        </nav>
    )
}
