import { getAllAvatars, getAvatarUrl } from "../lib/buckets";
import {useEffect, useState} from "react";
import styles from "../assets/ProfileSelect.module.css"
import Button from "./Button";

export default function ProfileSelect({preSelected}) {

    const [profileList, setProfileList] = useState([])
    const [selected, setSelected] = useState("")

    useEffect(() => { // useEffect runs two times in dev mode! in prod mode it works fine
        const asyncFunc = async () => {
            const profiles = await getAllAvatars()
            profiles.map(async (profile) => {
                const url = await getAvatarUrl(profile.name)
                setProfileList((prev) => [...prev, {...profile, url: url.publicUrl}])
            })
            if (preSelected && preSelected !== "") {
                setSelected(preSelected)
            } else {
                setSelected(profiles[0].id)
            }
            
        }
        asyncFunc()
    
    }, [] )

    const onClick = (e, id) => {
        e.preventDefault()
        setSelected(id)
    }

    return (
        <>
            <div>
                {
                    profileList.map((profile) => {
                        console.warn(profile)
                        return (
                            <Button onClick={(e) => onClick(e, profile.id)} key={profile.url} id={selected == profile.id ? styles.activeAvatar : null}>
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