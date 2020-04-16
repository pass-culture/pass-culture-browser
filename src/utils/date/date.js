import moment from 'moment'
import 'moment-timezone'
import { capitalize } from '../react-form-utils/functions'

import { getTimezone } from '../timezone'

const DAYS_IN_A_WEEK = 7
const LOCALE = 'fr-FR'
const MILLISECONDS_IN_A_DAY = 86400000
const MILLISECONDS_IN_A_MINUTE = 60000
const MILLISECONDS_IN_A_SECOND = 1000
const PASS_CULTURE_YEARS_VALIDITY = 2
const SATURDAY_INDEX_IN_A_WEEK = 6

const SUNDAY_INDEX_IN_A_WEEK = 0
const formatDate = (date, timeZone) => {
  const options = {
    timeZone,
  }
  return `${date.toLocaleDateString('fr-FR', options)}`
}
export const formatRecommendationDates = (departementCode, dateRange = []) => {
  if (dateRange.length === 0) return 'permanent'

  const timeZone = getTimezone(departementCode)
  const fromDate = new Date(dateRange[0])
  const toDate = new Date(dateRange[1])
  const fromFormated = formatDate(fromDate, timeZone)

  const toFormated = formatDate(toDate, timeZone)
  return `du ${fromFormated} au ${toFormated}`
}
export const computeEndValidityDate = date => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  date.setFullYear(date.getFullYear() + PASS_CULTURE_YEARS_VALIDITY)
  return `${date.toLocaleDateString('fr-FR', options)}`
}
export const dateStringPlusTimeZone = (dateString, departementCode) => {
  return moment(dateString)
    .tz(getTimezone(departementCode))
    .format('YYYY-MM-DD HH:mm:ss')
}

export const humanizeDate = (date, timezone) =>
  capitalize(
    moment(date)
      .tz(timezone)
      .format('dddd DD/MM/YYYY à H:mm')
  )
export const formatSearchResultDate = (departmentCode, dates = []) => {
  if (dates.length === 0) return null
  const timezone = getTimezone(departmentCode)
  let beginningDatetime = new Date(dates[0] * 1000)

  let endingDatetime = new Date(dates[1] * 1000)
  const day = beginningDatetime.toLocaleString(LOCALE, { timezone, day: '2-digit' })

  const month = beginningDatetime.toLocaleString(LOCALE, { timezone, month: 'long' })
  if (beginningDatetime.getDate() === endingDatetime.getDate() || dates.length === 1) {
    const hours = beginningDatetime.getHours()
    const minutes = beginningDatetime.getMinutes()
    const hoursWithLeadingZero = hours < 10 ? '0' + hours : hours
    const minutesWithLeadingZero = minutes < 10 ? '0' + minutes : minutes
    const weekDay = beginningDatetime.toLocaleString(LOCALE, { timezone, weekday: 'long' })

    const capitalizedWeekDay = weekDay.charAt(0).toUpperCase() + weekDay.slice(1)
    return `${capitalizedWeekDay} ${day} ${month} ${hoursWithLeadingZero}:${minutesWithLeadingZero}`
  }
  return `A partir du ${day} ${month}`
}

export const getFirstTimestampForGivenDate = date => {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return getTimestampFromDate(new Date(year, month, day, 0, 0, 0, 0))
}

export const getLastTimestampForGivenDate = date => {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return getTimestampFromDate(new Date(year, month, day, 23, 59, 59, 0))
}

export const getLastTimestampOfTheWeekForGivenDate = date => {
  const dayOfTheWeek = date.getDay()
  if (dayOfTheWeek === SUNDAY_INDEX_IN_A_WEEK) return getLastTimestampForGivenDate(date)
  const daysUntilSunday = DAYS_IN_A_WEEK - dayOfTheWeek
  const dateOfNextSunday = date.getTime() + MILLISECONDS_IN_A_DAY * daysUntilSunday
  return getLastTimestampForGivenDate(new Date(dateOfNextSunday))
}

export const getFirstTimestampOfTheWeekEndForGivenDate = date => {
  const dayOfTheWeek = date.getDay()
  if (dayOfTheWeek === SUNDAY_INDEX_IN_A_WEEK || dayOfTheWeek === SATURDAY_INDEX_IN_A_WEEK)
    return getTimestampFromDate(date)
  const daysUntilSaturday = SATURDAY_INDEX_IN_A_WEEK - dayOfTheWeek
  const dateOfNextSaturday = date.getTime() + MILLISECONDS_IN_A_DAY * daysUntilSaturday
  return getFirstTimestampForGivenDate(new Date(dateOfNextSaturday))
}

export const getTimestampFromDate = date => {
  const dateInTimestamp =
    (date.getTime() - getTimezoneOffsetInMilliseconds(date)) / MILLISECONDS_IN_A_SECOND
  return Math.ceil(dateInTimestamp)
}

const getTimezoneOffsetInMilliseconds = date => {
  const timezoneOffset = date.getTimezoneOffset()
  return timezoneOffset * MILLISECONDS_IN_A_MINUTE
}
