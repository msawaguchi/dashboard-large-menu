const locale = 'en-US'
const currency = 'USD'

export function priceFormatter(amount: number): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
