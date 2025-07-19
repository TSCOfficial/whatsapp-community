import validateAuth from "../lib/validateAuth";
import { saveSession } from "../lib/session";
import { signup } from "../lib/auth";
import AuthForm from "../components/AuthForm";

async function clientAction({request}) {
    const formData = await request.formData()
    const user = Object.fromEntries(formData)

    const {errors, isValid} = validateAuth(user)
    if (!isValid) {
        return errors // returns errors to form when pressing submit
    }

    const response = await signup(user)
    console.log(response)
    saveSession(response.session)
}

export default function SignupRoute(){
    return (
        <>
        <h1>Registrieren</h1>
        <AuthForm method="signup"/>
        </>
    )
}

SignupRoute.action = clientAction