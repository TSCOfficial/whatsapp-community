import { getAllProfiles, getProfileUrl } from "../lib/buckets";
import {useEffect, useState} from "react";
import styles from "../assets/ProfileSelect.module.css"
import Button from "./Button";

export default function ProfileSelect() {

    const [profileList, setProfileList] = useState([])
    const [selected, setSelected] = useState("")

    useEffect(() => { // useEffect runs two times in dev mode! in prod mode it works fine
        const asyncFunc = async () => {
            const profiles = await getAllProfiles()
            profiles.map(async (profile) => {
                console.log(profile)
                    const url = await getProfileUrl(profile.name)
                    setProfileList((prev) => [...prev, {...profile, url: url.publicUrl}])
            })
            setSelected(profiles[0].name)
        }
        asyncFunc()
    
    }, [] )

    const onClick = (e, name) => {
        e.preventDefault()
        setSelected(name)
    }

    return (
        <>
            <div>
                {
                    profileList.map((profile) => {
                        console.warn(profile)
                        return (
                            <Button onClick={(e) => onClick(e, profile.name)} key={profile.url}>
                                <img src={profile.url} alt="" className={styles.profile}/>
                            </Button>
                        )   
                    })
                }
            </div>

            <input
                type="text"
                name="profile"
                value={selected}
            />
        </>
    )
}