import { convertAngleAndLengthToCoordinates } from './mathUtils'

export const arcPath = (r1: number, r2: number, a1: number, a2: number) => {
  const [x1, y1] = convertAngleAndLengthToCoordinates(a1, r1 <= 0 ? 0 : r1)
  const [x2, y2] = convertAngleAndLengthToCoordinates(a1, r2 <= 0 ? 0 : r2)
  const [x3, y3] = convertAngleAndLengthToCoordinates(a2, r2 <= 0 ? 0 : r2)
  const [x4, y4] = convertAngleAndLengthToCoordinates(a2, r1 <= 0 ? 0 : r1)

  return 'M ' + x2 + ' ' + y2 + ' A ' + r2 + ' ' + r2 + ' 0 0 1 ' + x3 + ' ' + y3 + ' L ' + x4 + ' ' + y4 + ' A ' + r1 + ' ' + r1 + ' 0 0 0 ' + x1 + ' ' + y1
}
