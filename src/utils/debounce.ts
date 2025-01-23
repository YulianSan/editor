export const debounce = (fn: Function, delay: number, fnBefore?: Function) => {
  let timer: number | null = null

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }

    fnBefore?.(...args)
    timer = setTimeout(fn, delay, ...args)
  }
}
