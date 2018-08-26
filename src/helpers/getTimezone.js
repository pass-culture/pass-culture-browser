const DEFAULT_TIMEZONE = 'Europe/Paris'
const CAYENNE_TIMEZONE = 'America/Cayenne'

export function getTimezone(departementCode) {
  const isValidType =
    typeof departementCode !== 'string' || typeof departementCode !== 'number'
  if (!departementCode || !isValidType) return DEFAULT_TIMEZONE
  const code = departementCode.toString()
  switch (code) {
    case '97':
    case '973':
      return CAYENNE_TIMEZONE
    default:
      return DEFAULT_TIMEZONE
  }
}

export default getTimezone
