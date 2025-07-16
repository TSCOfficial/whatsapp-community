import { Form } from "react-router";
import LinkButton from "./LinkButton";
import Button from "./Button";

export default function SigninForm({errors = {}, onCancel}) {
    return (
        <Form method="post" noValidate>
            <fieldset>
                <input
                type="text"
                name="username"
                placeholder="Benutzername"
                />
                <input
                type="email"
                name="email"
                placeholder="E-Mail"
                />
                <input
                type="password"
                name="password"
                placeholder="Passwort"
                />
            </fieldset>
            <LinkButton to="/auth/signup">Noch kein Account?</LinkButton>

            <Button type="submit">Anmelden</Button>
            <Button onClick={onCancel}>Abbrechen</Button>
        </Form>
    )
}