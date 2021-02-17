export const getRemainingCreditForGivenCreditLimit = walletBalance => ({
  current: expenses,
  limit: creditLimit,
}) => {
  const absoluteRemainingCredit = Math.max(creditLimit - expenses, 0)
  return Math.min(walletBalance, absoluteRemainingCredit)
}
