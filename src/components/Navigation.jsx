import Logo from "../assets/placeholder-logo.svg?react"
import LinkButton from "./LinkButton"
import styles from "./Navigation.module.css"

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <Logo className={styles.image}/>
            <LinkButton to="/auth/signin">Anmelden</LinkButton>
        </nav>
    )
}