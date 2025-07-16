export default function validateAuth(user) {

    const errors = {
        displayname: "",
        username: "",
        email: "",
        password: "",
    }

    let isValid = true

    const regexEmail = ".*@.*"

    console.log(user)

    if (user.username?.trim().length === 0) {
        errors.username = "Anzeigenamen ist ein Pflichtfeld"
        isValid = false
    }

    if (user.username?.trim().length === 0) {
        errors.username = "Benutzername ist ein Pflichtfeld"
        isValid = false
    }

    if (user.email.trim().length === 0) {
        errors.email = "E-Mail ist ein Pflichtfeld"
        isValid = false
    } else if (!user.email.trim().match(regexEmail)) {
        errors.email = "E-Mail ist invalid"
        isValid = false
    }

    if (user.password.length < 8) {
        errors.password = "Das Passwort muss mindestens 8 zeichen enthalten"
        isValid = false
    }

    return { errors, isValid }
}