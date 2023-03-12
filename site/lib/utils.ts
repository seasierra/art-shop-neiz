export const findClosest = (arr: number[], num: number) =>
  arr.reduce((prev, curr) => {
    return Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
  })
