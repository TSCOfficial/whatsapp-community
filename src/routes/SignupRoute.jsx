import validateAuth from "../lib/validateAuth";
import { saveSession } from "../lib/session";
import { signup } from "../lib/auth";
import AuthForm from "../components/AuthForm";
import { redirect, useNavigate, useActionData } from "react-router";


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
    const param = new URLSearchParams(location.search)
    const path = param.get("path")
    return redirect(path == "/")
}

export default function SignupRoute(){
    const navigate = useNavigate()
    const errors = useActionData()

    const onCancel = () => {
        navigate(-1)
    }

    return (
        <>
        <h1>Registrieren</h1>
        <AuthForm method="signup" onCancel={onCancel} errors={errors}/>
        </>
    )
}

SignupRoute.action = clientAction