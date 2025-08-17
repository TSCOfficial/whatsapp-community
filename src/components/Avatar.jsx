import { useState, useEffect } from "react";
import {getAvatarById, getAvatarUrl, getAvatarUrlById} from "../lib/buckets/avatars";
import { useCurrentUser } from "../lib/session";
import styles from "../assets/Avatar.module.css"
import {getUserById} from "../lib/auth.js";

/**
 * Fetch the avatar via a users id, the avatar url, the avatar name or the avatar id
 * @param userId User ID
 * @param url Avatar URL
 * @param name Avatar name
 * @param id Avatar ID
 * @returns {JSX.Element}
 * @constructor
 */
export default function Avatar({userId, url, name, id, props}) {
    const [avatarUrl, setAvatarUrl] = useState()
    const currentUser = useCurrentUser()

        useEffect(() => {
        const fetchAvatar = async () => {
            if (url) {
                setAvatarUrl(url)
            } else if (userId) {
                console.log("chck user with id: ", userId)
                const user = await getUserById(userId)
                console.log(user[0])
                const avatar_url = getAvatarUrl(user[0].avatar_name)
                setAvatarUrl(avatar_url)
            } else if (name) {
                const avatar_url = getAvatarUrl(name)
                setAvatarUrl(avatar_url)
            } else if (id) {
                const avatar_url = await getAvatarUrlById(id)
                setAvatarUrl(avatar_url)
            } else {
                const avatar_url = await getAvatarUrlById(currentUser.avatar_id)
                setAvatarUrl(avatar_url)
            }
        }
        fetchAvatar()
    })

    return (
        avatarUrl
        ? <img className={styles.avatar} src={avatarUrl} alt=""{...props}/>
        : <div className={styles.noAvatar}{...props}></div>
    )
}