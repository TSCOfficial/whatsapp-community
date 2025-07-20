import { Form } from "react-router";
import LinkButton from "./LinkButton";
import Button from "./Button";
import Fieldset from "./Fieldset";
import Field from "./Field";

export default function SigninForm({errors = {}, onCancel}) {

    return (
        <Form method="post" noValidate>
            <Fieldset>
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

            <LinkButton to="/auth/signup">Noch kein Account?</LinkButton>
            <Button type="submit">Anmelden</Button>
            <Button onClick={onCancel}>Abbrechen</Button>
        </Form>
    )
}