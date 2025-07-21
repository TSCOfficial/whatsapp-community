export default function validateAuth(user) {

    const errors = {}

    let isValid = true

    const regexEmail = ".*@.*"

    console.log(user)

    if (user.avatar?.length === 0) {
        errors.profile = "Profilbild ist ein Pflichtfeld"
        isValid = false
    }

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

    if (user.password?.trim().length < 8) {
        errors.password = "Das Passwort muss mindestens 8 zeichen enthalten"
        isValid = false
    }

    if (user.passwordConfirmation?.trim().length === 0) {
        errors.passwordConfirmation = "Das Passwort muss bestätigt werden"
        isValid = false
    }
    

    return { errors, isValid }
}