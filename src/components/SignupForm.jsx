import { Form } from "react-router";
import LinkButton from "./LinkButton";
import Button from "./Button";
import Fieldset from "./Fieldset";
import Field from "./Field";
import { getAllProfiles, getProfileUrl } from "../lib/buckets";
import {useEffect, useState} from "react";

export default function SignupForm({errors = {}, onCancel}) {
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
        <Form method="post" noValidate>
            <Fieldset>
                <div>
                    {
                        profileUrls.map((url) => {
                            console.warn(url)
                            return (
                                <img src={url} alt="" key={url}/>
                            )   
                        })
                    }
                </div>
                
                <Field
                    type="text"
                    name="username"
                    placeholder="Benutzername"
                    title="Benutzername"
                    error={errors.username}
                />

                <Field
                type="email"
                name="email"
                placeholder="E-Mail"
                title="E-Mail"
                error={errors.email}
                />
                <Field
                type="password"
                name="password"
                placeholder="Passwort"
                title="Passwort"
                error={errors.password}
                />
            </Fieldset>
            <>
                <LinkButton to="/auth/signin">Bereits ein Account?</LinkButton>
                <Button type="submit">Registrieren</Button>
            </>
            <Button onClick={onCancel}>Abbrechen</Button>
        </Form>
    )
}