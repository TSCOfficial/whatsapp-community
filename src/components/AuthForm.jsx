import { Form } from "react-router";
import LinkButton from "./LinkButton";
import Button from "./Button";
import Fieldset from "./Fieldset";
import Field from "./Field";
import { getAllProfiles } from "../lib/buckets";
import {useEffect} from "react";

export default function AuthForm({method, errors = {}, onCancel}) {
    let profiles = [];

    useEffect(() => {
        profiles = getAllProfiles()
    }, [])
    
    return (
        <Form method="post" noValidate>
            <Fieldset>
                {
                    method == "signup"
                    ? <>
                        {
                            <p>
                                {profiles}
                            </p>
                        }
                        <Field
                            type="text"
                            name="username"
                            placeholder="Benutzername"
                            title="Benutzername"
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
            {
                method == "signup"
                ? <>
                    <LinkButton to="/auth/signin">Bereits ein Account?</LinkButton>
                    <Button type="submit">Registrieren</Button>
                </>
                : <>
                    <LinkButton to="/auth/signup">Noch kein Account?</LinkButton>
                    <Button type="submit">Anmelden</Button>
                </>
            }
            
            <Button onClick={onCancel}>Abbrechen</Button>
        </Form>
    )
}