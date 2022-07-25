import {
  closestTo, nextSaturday, nextWednesday, sub,
} from 'date-fns'

export const nextDelivery = (): number | Date => {
  const today = sub(Date.now(), { days: 1 })
  const deliveryDates = [nextWednesday(today), nextSaturday(today)]
  return closestTo(today, deliveryDates) as Date
}

export const sortByDate = (dateA: string, dateB: string) => {
  const a = new Date(dateA)
  const b = new Date(dateB)

  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export const sortByDonutName = (a: [string, { [name: string]: string | number | [] | [Record<string, unknown>] } ], b: [string, { [name: string]: string | number | [] | [Record<string, unknown>] }]) => {
  const donut1Name = a[1].name.toLocaleString()
  const donut2Name = b[1].name.toLocaleString()
  if (donut1Name < donut2Name) return -1
  if (donut1Name > donut2Name) return 1
  return 0
}
