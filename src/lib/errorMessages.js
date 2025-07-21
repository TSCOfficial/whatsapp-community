// lib/errorMessages.js

const errorMessages = {
  "invalid_credentials": "E-Mail oder Passwort ist falsch.",
  "user_already_exists": "Dieser Benutzer ist bereits registriert.",
  "Network error": "Verbindungsfehler. Bitte versuche es später erneut.",
  "Failed to fetch": "Server nicht erreichbar.",
  // Fallback:
  "default": "Ein unbekannter Fehler ist aufgetreten."
}

export function translateError(errorCode = "default") {
    if (Object.keys(errorMessages).includes(errorCode)) {
        return errorMessages[errorCode]
    }
    return errorMessages["default"]
}
