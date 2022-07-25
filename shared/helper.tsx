export const addItemsToArray = (categories: string[], array: string[] | undefined) => {
  const newArray = []
  if (array !== undefined) {
    newArray.push(...categories, ...array)
  }
  return newArray
}

export const camelize = (str: string) => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())

export const capitalise = (text: string) => text
  .split(' ')
  .map((word) => {
    if (word[0] !== undefined) {
      return word[0].toUpperCase() + word.substring(1).toLowerCase()
    } return word
  })
  .join(' ')

export const isValidDate = (date: unknown) => date instanceof Date && !Number.isNaN(date)

export const multipleClassNames = (...classes: string[]) => classes.filter(Boolean).join(' ')
