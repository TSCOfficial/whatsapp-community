import { signin } from "../lib/auth";
import validateAuth from "../lib/validateAuth";
import { saveSession } from "../lib/session";
import Log from "../../lib/logging"
import AuthForm from "../components/AuthForm";
import { redirect, useNavigate, useActionData } from "react-router";

async function clientAction({request}) {
    const formData = await request.formData()
    const user = Object.fromEntries(formData)

    const {errors, isValid} = validateAuth(user)
    if (!isValid) {
        return errors // returns errors to form when pressing submit
    }

    const response = await signin(user)
    saveSession(response.session)
    const param = new URLSearchParams(location.search)
    const path = param.get("path")
    return redirect(path == "/")
}

export default function SigninRoute(){
    const navigate = useNavigate()
    const errors = useActionData()

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