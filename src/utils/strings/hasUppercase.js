import isString from './isString'

function hasUppercase(value) {
  if (!isString(value) || !value.trim().length) return false
  return /[A-Z]/.test(value)
}

export default hasUppercase
