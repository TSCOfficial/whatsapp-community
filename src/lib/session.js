import { atom, useAtom } from "jotai"
import { useEffect } from "react"

const STORAGE_KEY = "session"
const SESSION_EVENT = "session-changed"
const sessionAtom = atom(getSession())

export function getJWTToken() {
    const session = getSession()
    return session?.jwt
}

export function getSession() {
    const session = localStorage.getItem(STORAGE_KEY)
    return session ? JSON.parse(session) : ""
}

export function saveSession(session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    window.dispatchEvent(new CustomEvent(SESSION_EVENT, { detail: session }))
}

export function removeSession() {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent(SESSION_EVENT, { detail: null }))
}

export function useSession() {
    const [session, setSession] = useAtom(sessionAtom)

    useEffect(() => {
        const savedSession = localStorage.getItem(STORAGE_KEY)
        if (savedSession) {
            try {
                const sessionValues = JSON.parse(savedSession)
                setSession(sessionValues)
            } catch (e) {
                console.error(e)
            }
        }

        const handleStorageChange = (event) => {
            if (event.key === STORAGE_KEY) {
                try {
                    if (event.newValue) {
                        setSession(JSON.parse(event.newValue))
                    } else {
                        setSession(null)
                    }
                } catch (e) {
                    console.error(e)
                }
            }
        }

        const handleCustomSessionChange = (event) => {
            setSession(event.detail)
        }

        window.addEventListener("storage", handleStorageChange)
        window.addEventListener(SESSION_EVENT, handleCustomSessionChange)

        return () => {
            window.removeEventListener("storage", handleStorageChange)
            window.removeEventListener(SESSION_EVENT, handleCustomSessionChange)
        }
    }, [])

    return session
}

export function useCurrentUser() {
    const session = useSession()
    return session?.user
}
