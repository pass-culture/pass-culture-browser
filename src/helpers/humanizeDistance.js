export const humanizeDistance = value => {
  if (value < 30) return `${Math.round(value)} m`
  if (value < 100) return `${Math.round(value / 5) * 5} m`
  if (value < 1000) return `${Math.round(value / 10) * 10} m`
  if (value < 5000) return `${Math.round(value / 100) / 10} km`
  return `${Math.round(value / 1000)} km`
}

export default humanizeDistance
