import Supabase from "../../lib/supabase"
import Log from "../../lib/logging"
import { getAvatarById } from "./buckets"

export async function signup(user){
    // create auth.users record
    const {data: authData, error: authError} = await Supabase().auth.signUp({
        email: user.email,
        password: user.password,
        options: {
            data: {
                display_name: user.username
            }
        }
    })

    if (authError) {
        new Log(`Signup error, account creation error: `, authError).error()
        return
    }

    console.log(authData)
    new Log("user data: ", authData)

    // Create extended user record with profilpicture
    const {data: publicData, error: publicError} = await Supabase().from("users").insert({
        user_id: authData.user.id,
        avatar_id: user.avatar
    }).select()

    if (publicError) {
        new Log(`Signup error, avatar connection error: `, publicError).error()
        return
    }

    authData.user.avatar_id = publicData[0].avatar_id // Adds avatar_id field to user session data (saved in browser session)

    new Log(`Signup successful: `, authData)
    return authData;
    
}

export async function signin(credentials){
    const {data: authData, error: authError} = await Supabase().auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
    })

    if (authError) {
        new Log(`Signin error: `, authError).error()
        return
    }

    console.log(authData)

    const {data: publicData, error: publicError} = await Supabase().from("users")
        .select("avatar_id")
        .eq("user_id", authData.user.id)

    if (publicError) {
        new Log(`Signin error, avatar fetch failed: `, publicError).error()
        return
    }

    authData.user.avatar_id = publicData[0].avatar_id // Adds avatar_id field to user session data (saved in browser session)
        
    new Log(`Signin successful: `, authData)
    return authData;
}

export async function updateAccount(user) {
    const {data, error} = await Supabase().auth.updateUser({
        email: user.email,
        data: {
            display_name: user.username
        }
        
    })

    if (error) {
        new Log(`Account update error: `, error).error()
        return
    }

    new Log(`Account update successful: `, data)
    return data;
}