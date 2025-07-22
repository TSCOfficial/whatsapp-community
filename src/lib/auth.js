import Supabase from "../../lib/supabase"
import Log from "../../lib/logging"
import { getAvatarById } from "./buckets/avatars"
import { Response } from "./response"
import { getSession, removeSession, saveSession } from "./session"

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
        return Response.error(authError.code)
    }

    new Log("user data: ", authData)

    // Create extended user record with profilpicture
    const {data: publicData, error: publicError} = await Supabase().from("users").insert({
        user_id: authData.user.id,
        avatar_id: user.avatar
    }).select()

    if (publicError) {
        new Log(`Signup error, avatar connection error: `, publicError).error()
        return Response.error(publicError.code)
    }

    authData.user.avatar_id = publicData[0].avatar_id // Adds avatar_id field to user session data (saved in browser session)

    new Log(`Signup successful: `, authData)
    return Response.success(authData);
    
}

export async function signin(credentials){
    const {data: authData, error: authError} = await Supabase().auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
    })

    if (authError) {
        new Log(`Signin error: `, authError).error()
        return Response.error(authError.code)
    }

    console.log(authData)

    // get
    const {data: publicData, error: publicError} = await Supabase().from("users")
        .select("avatar_id")
        .eq("user_id", authData.user.id)

    if (publicError) {
        new Log(`Signin error, avatar fetch failed: `, publicError).error()
        return Response.error(authError.code)
    }

    // merge userinfos
    authData.user.avatar_id = publicData[0].avatar_id // Adds avatar_id field to user session data (saved in browser session)
        
    new Log(`Signin successful: `, authData)
    return Response.success(authData)
}

export async function updateAccount(user) {
    // update auth user table
    const newData = {
        email: user.email,
        data: {
            display_name: user.username
        }
    }
    if (user.password) newData.password = user.password

    const {data: authData, error: authError} = await Supabase().auth.updateUser(newData)

    if (authError) {
        new Log(`Account update error: `, authError).error()
        return Response.error(authError.code)
    }

    console.log(user)
    // update publuc user table
    const {data: publicData, error: publicError} = await Supabase().from("users")
        .update({avatar_id: user.avatar})
        .eq("user_id", authData.user.id)
        .select()

    if (publicError) {
        new Log(`Account avatar update error: `, publicError).error()
        return Response.error(publicError.code)
    }

    console.log(publicData)
    authData.user.avatar_id = publicData[0].avatar_id

    // update session informations
    const currentSession = getSession()
    new Log("old session: ", currentSession)
    removeSession()
    currentSession.user = authData.user
    new Log("new session: ", currentSession)
    saveSession(currentSession)

    new Log(`Account update successful: `, authData)
    return Response.success(authData);
}