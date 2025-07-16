import Supabase from "../../lib/supabase"
import Log from "../../lib/logging"

export async function signup(user){
    const username = user.username
    const email = user.email
    const password = user.password

    const {data, error} = await Supabase().auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                display_name: username
            }
        }
    })
    if (error) {
        new Log(`Error creating user: ${error}`).error()
    } else {
        new Log(`User successfully created: ${data}`)
        return data;
    }
}

export async function signin(credentials){
    const {data, error} = await Supabase().auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
    })
    if (error) {
        new Log(`Error creating user: ${error}`).error()
    } else {
        new Log(`User successfully created: ${data}`)
        return data;
    }
}