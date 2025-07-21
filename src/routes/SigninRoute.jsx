import { signin } from "../lib/auth";
import validateAuth from "../lib/validateAuth";
import { saveSession } from "../lib/session";
import Log from "../../lib/logging"
import { redirect, useNavigate, useActionData } from "react-router";
import AuthForm from "../components/AuthForm";

async function clientAction({request}) {
    const formData = await request.formData()
    const user = Object.fromEntries(formData)

    const { errors, isValid } = validateAuth(user)
    if (!isValid) {
        return { errors: errors }
    }

    const { data, error } = await signin(user)

    if (data) {
        saveSession(data.session)
        const param = new URLSearchParams(location.search)
        const path = param.get("path")
        return redirect(path ?? "/")
    }
    return { responseError: error }
}

export default function SigninRoute(){
    const navigate = useNavigate()
    const errors = useActionData() // devNote: any data that is returned from the clientAction

    const onCancel = () => {
        navigate(-1)
    }

    return (
        <>
        <h1>Anmelden</h1>
        <AuthForm method="signin" onCancel={onCancel} errors={errors}/>
        </>
    )
}

SigninRoute.action = clientAction