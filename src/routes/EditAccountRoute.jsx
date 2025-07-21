import { updateAccount } from "../lib/auth";
import validateAuth from "../lib/validateAuth";
import { removeSession, saveSession, useCurrentUser } from "../lib/session";
import Log from "../../lib/logging"
import { redirect, useNavigate, useActionData } from "react-router";
import AuthForm from "../components/AuthForm";

async function clientAction({request}) {
    const formData = await request.formData()
    const user = Object.fromEntries(formData)

    new Log("update action data (user): ", user)
    new Log("user password: ", user.password)

    const {errors, isValid} = validateAuth(user)
    if (!isValid) {
        return errors // returns errors to form when pressing submit
    }
    new Log("update user: ", user)
    const response = await updateAccount(user)
    new Log("response from update: ", response)
    const param = new URLSearchParams(location.search)
    const path = param.get("path")
    return redirect(path ?? "/")
}

// This route is not definitive and may be removed in the future.
// It is, during the early developement stage, used to create the account update function(s)
export default function EditAccountRoute(){
    const navigate = useNavigate()
    const errors = useActionData()
    const user = useCurrentUser()
    new Log("user: ", user)

    const onCancel = () => {
        navigate(-1)
    }

    return (
        <>
        <h1>Aktualisieren</h1>
        <AuthForm method="update" user={user} onCancel={onCancel} errors={errors}/>
        </>
    )
}

EditAccountRoute.action = clientAction