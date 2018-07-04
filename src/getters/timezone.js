export default function getTimezone(venue) {
  console.log("VENUE", venue)
  if (!venue)
      return
    switch(venue.departementCode) {
        case '97':
          return 'America/Cayenne'
        case '973':
          return 'America/Cayenne'
        default:
          return 'Europe/Paris'
  }
}
