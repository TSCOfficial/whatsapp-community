// lib/errorMessages.js

const errorMessages = {
  "invalid_credentials": "E-Mail oder Passwort ist falsch.",
  "user_already_exists": "Dieser Benutzer ist bereits registriert.",
  "email_exists": "Ein Benutzer mit dieser E-Mail adresse ist bereits registriert.",
  // Fallback:
  "default": "Ein unbekannter Fehler ist aufgetreten."
}

export function translateError(errorCode = "default") {
    if (Object.keys(errorMessages).includes(errorCode)) {
        return errorMessages[errorCode]
    }
    return errorMessages["default"]
}
