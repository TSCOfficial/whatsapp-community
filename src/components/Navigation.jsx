import Logo from "../assets/placeholder-logo.svg?react"
import { getSession, useCurrentUser, removeSession } from "../lib/session"
import Button from "./Button"
import LinkButton from "./LinkButton"
import styles from "../assets/Navigation.module.css"

export default function Navigation() {
    const user = useCurrentUser()

    const logout = async (e) => {
        e.preventDefault()
        removeSession()
        navigate("/")
    }

    return (
        <nav className={styles.nav}>
            <Logo className={styles.image}/>
            
            {
                user
                ? <p>
                    {user.user_metadata.display_name}<br/>
                    <Button onClick={logout}>Logout</Button>
                </p>
                : <LinkButton to="/auth/signin">Anmelden</LinkButton>
            }
        </nav>
    )
}