export default function Log(message) {
    const date = new Date();
    const time = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    };
    const timestamp = `${time.day}.${time.month}.${time.year}`;

    const baseMessage = `${timestamp}`;

    const logger = {
        warn() {
            console.warn(`${baseMessage} [WARN] ${message}`);
            return this;
        },
        error() {
            console.error(`${baseMessage} [ERROR] ${message}`);
            return this;
        },
        log() {
            console.log(`${baseMessage} [LOG] ${message}`);
            return this;
        }
    };

    logger.log();

    return logger;
}
