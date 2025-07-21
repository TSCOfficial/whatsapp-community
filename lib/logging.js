export default function Log(message, object) {
    const date = new Date();
    const time = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds()
    };
    const timestamp = `${time.day}.${time.month}.${time.year} ${time.hour}:${time.minute}:${time.second}.${time.millisecond}`;

    const baseMessage = `${timestamp}`;

    const logger = {
        warn() {
            console.warn(`${baseMessage} [WARN] ${message}${object ? "⬇️" : ""}`);
            object ? console.warn(object) : null
            return this;
        },
        error() {
            console.error(`${baseMessage} [ERROR] ${message}${object ? "⬇️" : ""}`);
            object ? console.error(object) : null
            return this;
        },
        log() {
            console.log(`${baseMessage} [LOG] ${message}${object ? "⬇️" : ""}`);
            object ? console.log(object) : null
            return this;
        }
    };

    logger.log();

    return logger;
}
