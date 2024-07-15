const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value)

export const formatDate = (rawDate: string) => {
  const date = new Date(rawDate)

  const day = addLeadingZero(date.getDate())
  const month = addLeadingZero(date.getMonth() + 1)
  const year = date.getFullYear()
  const hours = addLeadingZero(date.getHours())
  const minutes = addLeadingZero(date.getMinutes())
  const seconds = addLeadingZero(date.getSeconds())

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
}
