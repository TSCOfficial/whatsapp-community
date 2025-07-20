import { Form } from "react-router";
import LinkButton from "./LinkButton";
import Button from "./Button";
import Fieldset from "./Fieldset";
import Field from "./Field";
import ProfileSelect from "./ProfileSelect";

export default function SignupForm({errors = {}, onCancel}) {
    
    return (
        <Form method="post" noValidate>
            <Fieldset>
                <ProfileSelect/>
                                
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