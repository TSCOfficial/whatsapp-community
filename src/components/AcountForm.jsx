import { Form } from "react-router";
import LinkButton from "./LinkButton";
import Button from "./Button";
import Fieldset from "./Fieldset";
import Field from "./Field";
import ProfileSelect from "./ProfileSelect";
import { useState, useEffect } from "react";

export default function AccountForm({user, errors = {}, onCancel}) {
    const [avatarId, setAvatarId] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [changePassword, setChangePassword] = useState(false)

    useEffect(() => {
        if (user) {
            setAvatarId(user.avatar_id)
            setUsername(user.user_metadata.display_name)
            setEmail(user.email)
        }
    }, [])
    return (
        <Form method="post" noValidate>
            <Fieldset>

                <ProfileSelect preSelected={avatarId}/>
                        
                <Field
                    type="text"
                    name="username"
                    placeholder="Benutzername"
                    title="Benutzername"
                    onChange={(e) => setUsername(e.value)}
                    value={username}
                    error={errors.username}
                />

                <Field
                type="email"
                name="email"
                placeholder="E-Mail"
                title="E-Mail"
                onChange={(e) => setEmail(e.value)}
                value={email}
                error={errors.email}
                disabled
                />
                <p>E-Mail adresse kann nicht geändert werden.</p>

                {
                    changePassword == true
                    ? <>
                        <Field
                        type="password"
                        name="password"
                        placeholder="Passwort"
                        title="Passwort"
                        onChange={(e) => setPassword(e.value)}
                        value={password}
                        error={errors.password}
                        />

                        <Field
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Passwort bestätigen"
                            title="Passwort bestätigen"
                            onChange={(e) => setPasswordConfirmation(e.value)}
                            value={passwordConfirmation}
                            error={errors.passwordConfirmation}
                        />
                        <Button onClick={() => setChangePassword(false)}>Abbrechen</Button>
                    </>
                    : <Button onClick={() => setChangePassword(true)}>Passwort ändern</Button>
                }
            </Fieldset>

            {
                errors.responseError && <p>{errors.responseError}</p>
            }


            <Button type="submit">Aktualisieren</Button>

           
            <Button onClick={onCancel}>Abbrechen</Button>
        </Form>
    )
}