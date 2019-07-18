const getIsConfirmingCancelling = match => {
  const { params } = match
  const { confirmation } = params
  return typeof confirmation !== 'undefined'
}

export default getIsConfirmingCancelling
