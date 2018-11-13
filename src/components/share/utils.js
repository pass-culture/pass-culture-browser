import queryString from 'query-string'

const createMailToLink = (email, headers) => {
  let link = `mailto:${email}`
  if (headers) {
    const params = queryString.stringify(headers)
    link = `${link}?${params}`
  }
  console.log('LINK', link)
  return link
}

export default createMailToLink
