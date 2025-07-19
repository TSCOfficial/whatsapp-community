import { Form } from "react-router";
import LinkButton from "./LinkButton";
import Button from "./Button";

export default function AuthForm({method, errors = {}, onCancel}) {
    return (
        <Form method="post" noValidate>
            <fieldset>
                {
                    method == "signup"
                    ? <>
                    <input
                        type="text"
                        name="username"
                        placeholder="Benutzername"
                    />
                    { errors.username && <p>{errors.username}</p>}
                    </>
                    : null
                }
                <input
                type="email"
                name="email"
                placeholder="E-Mail"
                />
                { errors.email && <p>{errors.email}</p>}
                <input
                type="password"
                name="password"
                placeholder="Passwort"
                />
                { errors.password && <p>{errors.password}</p>}
            </fieldset>
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