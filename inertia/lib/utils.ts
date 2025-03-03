import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn: (...args: ClassValue[]) => string = (...args) => {
  return twMerge(clsx(args))
}

export const hasWindowObject = () => {
  return typeof window !== 'undefined'
}
export const disableReactDevTools = () => {
  if (hasWindowObject()) {
    const DEVTOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__

    if (typeof DEVTOOLS === 'object') {
      for (const [key, value] of Object.entries(DEVTOOLS)) {
        DEVTOOLS[key] = typeof value === 'function' ? Function.prototype : null
      }
    }
  }
}
