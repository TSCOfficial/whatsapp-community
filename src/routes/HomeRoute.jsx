import { useEffect, useState } from "react"
import { useCurrentUser } from "../lib/session"

export default function HomeRoute() {
    const user = useCurrentUser()
  

    return (
        <>
            <h1>Welcome</h1>
            <p>{JSON.stringify(user)}</p>
        </>
    )
}