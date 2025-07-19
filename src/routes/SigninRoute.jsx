import { signin } from "../lib/auth";
import validateAuth from "../lib/validateAuth";
import { saveSession } from "../lib/session";
import Log from "../../lib/logging"
import AuthForm from "../components/AuthForm";

async function clientAction({request}) {
    const formData = await request.formData()
    const user = Object.fromEntries(formData)

    const {errors, isValid} = validateAuth(user)
    if (!isValid) {
        return errors // returns errors to form when pressing submit
    }

    const response = await signin(user)
    saveSession(response.session)
    console.log(response)
}
export default function SigninRoute(){
    return (
        <>
        <h1>Anmelden</h1>
        <AuthForm method="signin"/>
        </>
    )
}

SigninRoute.action = clientAction