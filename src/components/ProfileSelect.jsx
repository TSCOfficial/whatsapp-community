import { getAllAvatars, getAvatarUrl } from "../lib/buckets/avatars";
import {useEffect, useState} from "react";
import styles from "../assets/ProfileSelect.module.css"
import Button from "./Button";

export default function ProfileSelect({preSelected}) {

    const [profileList, setProfileList] = useState([])
    const [selected, setSelected] = useState("")

    useEffect(() => { // useEffect can run multiple times in dev mode! in production mode it works fine
        const asyncFunc = async () => {
            const profiles = await getAllAvatars()

            const profilesWithUrl = await Promise.all(
                profiles.map(async (profile) => {
                    const url = await getAvatarUrl(profile.name)
                    return {
                        ...profile,
                        url: url.publicUrl
                    }
                
                })    
            )

            setProfileList(profilesWithUrl)
                 
        }
        asyncFunc()

        

        if (preSelected && preSelected !== "") {
            setSelected(preSelected)
        } else {
            setSelected(profileList[0]?.id)
        }

    }, [preSelected] )

    const onClick = (e, id) => {
        e.preventDefault()
        setSelected(id)
    }

    return (
        <>
            <div>
                {
                    profileList.map((profile, i) => {
                        return (
                            <Button onClick={(e) => onClick(e, profile.id)} key={i} id={selected == profile.id ? styles.activeAvatar : null}>
                                <img src={profile.url} alt="" className={styles.profile}/>
                            </Button>
                        )   
                    })
                }
            </div>

            <input
                type="text"
                name="avatar"
                value={selected}
            />
        </>
    )
}