import Logo from "../assets/placeholder-logo.svg?react"
import { getSession, useCurrentUser } from "../lib/session"
import LinkButton from "./LinkButton"
import styles from "./Navigation.module.css"

export default function Navigation() {
    const user = useCurrentUser()
    return (
        <nav className={styles.nav}>
            <Logo className={styles.image}/>
            
            {
                user
                ? <p>{user.email}</p>
                : <LinkButton to="/auth/signin">Anmelden</LinkButton>
            }
        </nav>
    )
}