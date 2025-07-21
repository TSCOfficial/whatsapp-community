import validateAuth from "../lib/validateAuth";
import { saveSession } from "../lib/session";
import { signup } from "../lib/auth";
import { redirect, useNavigate, useActionData } from "react-router";
import AuthForm from "../components/AuthForm";


async function clientAction({request}) {
    const formData = await request.formData()
    const user = Object.fromEntries(formData)

    console.log(user)

    const {errors, isValid} = validateAuth(user)
    if (!isValid) {
        return { errors: errors } // returns errors to form when pressing submit
    }

    const {data, error} = await signup(user)
    if (data) {
        saveSession(data.session)
        const param = new URLSearchParams(location.search)
        const path = param.get("path")
        return redirect(path ?? "/")
    }
    return { responseError: error }
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