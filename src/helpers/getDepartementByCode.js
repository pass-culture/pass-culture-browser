export const getDepartementByCode = code => {
  const strcode =
    (code && (typeof code === 'string' && code.trim())) ||
    (code && `${code}`) ||
    null
  if (!strcode) return null
  switch (strcode) {
    case '29':
      return 'Finistère'
    case '34':
      return 'Hérault'
    case '93':
      return 'Seine-Saint-Denis'
    case '971':
      return 'Guadeloupe'
    case '972':
      return 'Martinique'
    case '973':
      return 'Guyane'
    case '974':
      return 'La Réunion'
    case '976':
      return 'Mayotte'
    default:
      return ''
  }
}

export default getDepartementByCode
