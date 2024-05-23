export const debounce = <T extends Function>(f: T, timeout = 400) => {
  let timeoutId: any
  const callable = (...args: any) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      f(...args)
    }, timeout)
  }

  return callable as any as T
}

export const addItemToArrayAndMaintainItemCount = <T>(
  pendingVal: T,
  array: T[],
  count = 5
): T[] => {
  if (array.length === count) {
    array.pop()
  }

  array.unshift(pendingVal)
  return [...array]
}
