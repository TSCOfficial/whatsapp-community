import Logo from "../assets/placeholder-logo.svg?react"
import { getSession, useCurrentUser, removeSession } from "../lib/session"
import Button from "./Button"
import LinkButton from "./LinkButton"
import styles from "../assets/Navigation.module.css"
import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import Avatar from "./Avatar"

export default function Navigation() {
    const navigate = useNavigate()
    const user = useCurrentUser()
    

    const logout = async (e) => {
        e.preventDefault()
        removeSession()
        navigate("/")
    }

    return (
        <nav className={styles.nav}>
            <Logo className={styles.logo}/>
            
            {
                user
                ? <div>
                    <Avatar/>
                    <p>{user.user_metadata.display_name}</p>
                    <LinkButton to="/auth/update">Aktualisieren</LinkButton>
                    <Button onClick={logout}>Abmelden</Button>
                
                </div>
                : <LinkButton to="/auth/signin">Anmelden</LinkButton>
            }
        </nav>
    )
}