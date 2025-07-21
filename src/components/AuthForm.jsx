import { Form } from "react-router";
import LinkButton from "./LinkButton";
import Button from "./Button";
import Fieldset from "./Fieldset";
import Field from "./Field";
import ProfileSelect from "./ProfileSelect";
import { useState, useEffect } from "react";

export default function AuthForm({method = "signin", user, errors = {}, onCancel}) {
    const [avatarId, setAvatarId] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

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
                {
                    method == "signup" || method == "update"
                    ? <>
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
                    </>
                    : null
                }
                

                <Field
                type="email"
                name="email"
                placeholder="E-Mail"
                title="E-Mail"
                onChange={(e) => setEmail(e.value)}
                value={email}
                error={errors.email}
                />
                <Field
                type="password"
                name="password"
                placeholder="Passwort"
                title="Passwort"
                onChange={(e) => setPassword(e.value)}
                value={password}
                error={errors.password}
                />

                {
                    method == "signup" || method == "update"
                    ? <Field
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Passwort bestätigen"
                        title="Passwort bestätigen"
                        onChange={(e) => setPasswordConfirmation(e.value)}
                        value={passwordConfirmation}
                        error={errors.passwordConfirmation}
                        />
                    : null
                }
            </Fieldset>

            {
                method == "signup"
                && <>
                    <LinkButton to="/auth/signin">Bereits ein Account?</LinkButton>
                    <Button type="submit">Registrieren</Button>
                </>
            } {

                method == "signin"
                && <>
                    <LinkButton to="/auth/signup">Noch kein Account?</LinkButton>
                    <Button type="submit">Registrieren</Button>
                </>
            } {

                method == "update"
                && <>
                    <Button type="submit">Aktualisieren</Button>
                </>
            }
           
            <Button onClick={onCancel}>Abbrechen</Button>
        </Form>
    )
}