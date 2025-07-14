
/**
 * Create a log message to the console
 * @param {string} message 
 * @param {boolean} warn 
 * @param {boolean} error 
 */
export function Log (message, warn, error) {
    const date = new Date()
    const time = {
        day: date.getDate,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    }
    const logTimeContructor = `${time.day}.${time.month}.${time.year}`

    if (warn) {
        console.warn(`${logTimeContructor} [WARN] ${message}`)
    }
    else if (error) {
        console.error(`${logTimeContructor} [ERROR] ${message}`)
    }
    else {
        console.log(`${logTimeContructor} [LOG] ${message}`)
    }

    
}