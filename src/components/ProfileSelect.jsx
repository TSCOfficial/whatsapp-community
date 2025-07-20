import { getAllProfiles, getProfileUrl } from "../lib/buckets";
import {useEffect, useState} from "react";
import styles from "./ProfileSelect.module.css"

export default function ProfileSelect() {

    const [profileUrls, setProfileUrls] = useState([])

    useEffect(() => { // useEffect runs two times in dev mode! in prod mode it works fine
        const asyncFunc = async () => {
            const profiles = await getAllProfiles()
            profiles.map(async (profile) => {
                console.log(profile)
                const url = await getProfileUrl(profile.name)
                setProfileUrls((prev) => [...prev, url.publicUrl])
            })
        }
        asyncFunc()
    
    }, [] )

    return (
        <>
            <div>
                {
                    profileUrls.map((url) => {
                        console.warn(url)
                        return (
                            <img src={url} alt="" key={url} className={styles.profile}/>
                        )   
                    })
                }
            </div>

            <input
                type="text"
                name="profile"
                value="Hello"
                hidden
            />
        </>
    )
}