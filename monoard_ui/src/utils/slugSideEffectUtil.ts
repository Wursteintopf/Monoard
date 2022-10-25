const getSlugNumber = (slug: string, usedSlugs: string[], initial: number): number => {
  return usedSlugs.includes(slug + '_' + initial)
    ? getSlugNumber(slug, usedSlugs, initial + 1)
    : initial
}

export const slugSideEffect = (value: string, usedSlugs: string[]) => {
  let snakeCase = value
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z][a-z])/)
    .map((word) => word.toLowerCase())
    .join('_')

  if (usedSlugs.includes(snakeCase)) {
    snakeCase += '_' + getSlugNumber(snakeCase, usedSlugs, 1)
  }

  return snakeCase
}
