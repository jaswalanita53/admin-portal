
const moment = require("moment")
let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let todayDateStr = moment().format("YYYY-MM-DD")
let after30daysDay = moment().add(30,'days').format("YYYY-MM-DD")




export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayDateStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: after30daysDay + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}

export {todayDateStr,after30daysDay}