export const clampText = (input: string, length = 60): string => {
  if (input.length > length) return input.substring(0, length) + '...'
  return input
}
