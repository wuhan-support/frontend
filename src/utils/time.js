function _getTimezoneOffset(date) {
  let offset = date.getTimezoneOffset()
  if (offset === -485) {
    offset = -485 - 43 / 60
  }
  return offset
}

function fromOADate(oadate) {
  const offsetDay = oadate - 25569
  const date = new Date(offsetDay * 86400000)

  const adjustValue = offsetDay >= 0 ? 1 : -1
  const oldDateTimezoneOffset = _getTimezoneOffset(date)
  const ms = (oadate * 86400000 * 1440 + adjustValue - 25569 * 86400000 * 1440 + oldDateTimezoneOffset * 86400000) / 1440
  let firstResult = new Date(ms)

  const fixHourSign = oldDateTimezoneOffset >= 0 ? 1 : -1
  const nextHour = new Date(ms + fixHourSign * 3600000)
  const nextHourTimezoneOffset = _getTimezoneOffset(nextHour)
  if (oldDateTimezoneOffset !== nextHourTimezoneOffset) {
    let newResult = new Date(ms + (nextHourTimezoneOffset - oldDateTimezoneOffset) * 60 * 1000)
    if (oldDateTimezoneOffset > nextHourTimezoneOffset) {
      if (fixHourSign === -1 || nextHourTimezoneOffset === _getTimezoneOffset(firstResult)) {
        newResult = newResult.getMilliseconds() === 999 ? new Date(newResult.valueOf() + 1) : newResult
        return newResult
      }
    } else if (oldDateTimezoneOffset < nextHourTimezoneOffset) {
      if (fixHourSign === 1 || nextHourTimezoneOffset === _getTimezoneOffset(firstResult)) {
        newResult = newResult.getMilliseconds() === 999 ? new Date(newResult.valueOf() + 1) : newResult
        return newResult
      }
    }
  }

  firstResult = firstResult.getMilliseconds() === 999 ? new Date(firstResult.valueOf() + 1) : firstResult
  return firstResult
}


export default {fromOADate}
