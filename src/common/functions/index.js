const moment = require('moment');
export function trimString(string, length) {
    return string.length > 70 ? string.substring(0, length) + '...' : string
}
export function trimString10(string, length) {
    return string.length > 10 ? string.substring(0, length) + '...' : string
}
export function getFormattedDate(date, format = "MM/DD/yyyy") {
    return moment(date).format(format)
}