import { useState, useEffect } from "react";
import { getAvatarUrl, getAvatarUrlById } from "../lib/buckets";
import { useCurrentUser } from "../lib/session";
import styles from "../assets/Avatar.module.css"

export default function Avatar({url, name, id}) {
    const [avatarUrl, setAvatarUrl] = useState()
    const user = useCurrentUser()

        useEffect(() => {
        const fetchAvatar = async () => {
            if (url) {
                setAvatarUrl(url)
            } else if (name) {
                const avatar_url = await getAvatarUrl(name)
                setAvatarUrl(avatar_url.publicUrl)
            } else if (id) {
                const avatar_url = await getAvatarUrlById(id)
                setAvatarUrl(avatar_url.publicUrl)
            } else {
                const avatar_url = await getAvatarUrlById(user.avatar_id)
                setAvatarUrl(avatar_url.publicUrl)
            }
        }
        fetchAvatar()
    })

    return (
        avatarUrl
        ? <img className={styles.avatar} src={avatarUrl} alt="" />
        : <div className={styles.noAvatar}></div>
    )
}