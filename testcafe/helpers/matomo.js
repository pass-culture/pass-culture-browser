import { RequestLogger } from 'testcafe'

export const matomoLogger = RequestLogger(/matomo/)

export const filterUrlWithAction = (logger, name) =>
  logger.requests
    .map(r => new URL(r.request.url))
    .filter(url => url.searchParams.get('e_a') === name)
