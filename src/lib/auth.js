import Supabase from "../../lib/supabase"

export async function signup(user){
    const username = user.username
    const email = user.email
    const password = user.password

    const {data, error} = await Supabase().auth.signUp({
        email: email,
        password: password,
        user_metadata: {
            username: username
        }
    })
    if (error) {
        new Log(`Error creating user: ${error}`).error()
    } else {
        new Log(`User successfully created: ${data}`)
        return data;
    }
}

export async function signin(email, password){
    const {data, error} = await Supabase().auth.signInWithPassword({
        email: email,
        password: password
    })
    if (error) {
        new Log(`Error creating user: ${error}`).error()
    } else {
        new Log(`User successfully created: ${data}`)
        return data;
    }
}