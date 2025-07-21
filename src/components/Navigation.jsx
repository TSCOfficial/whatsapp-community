import Logo from "../assets/placeholder-logo.svg?react"
import { getSession, useCurrentUser, removeSession } from "../lib/session"
import Button from "./Button"
import LinkButton from "./LinkButton"
import styles from "../assets/Navigation.module.css"
import { useNavigate } from "react-router"
import { getAvatarById, getAvatarUrl, getAvatarUrlById } from "../lib/buckets"
import { useEffect, useState } from "react"

export default function Navigation() {
    const [avatarUrl, setAvatarUrl] = useState("")
    const navigate = useNavigate()
    const user = useCurrentUser()
    
    useEffect(() => {
        const fetchAvatarUrl = async () => {
            const avatar_url = await getAvatarUrlById(user.avatar_id)
            setAvatarUrl(avatar_url.publicUrl)
        }

        fetchAvatarUrl()
    })

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
                    <img className={styles.userAvatar} src={avatarUrl} alt="" />
                    <p>{user.user_metadata.display_name}</p>
                    <Button onClick={logout}>Logout</Button>
                
                </div>
                : <LinkButton to="/auth/signin">Anmelden</LinkButton>
            }
        </nav>
    )
}