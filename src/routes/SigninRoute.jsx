import { signin } from "../lib/auth";
import SigninForm from "../components/SigninForm";
import validateAuth from "../lib/validateAuth";
import { saveSession } from "../lib/session";
import Log from "../../lib/logging"

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
        <SigninForm/>
        </>
    )
}

SigninRoute.action = clientAction