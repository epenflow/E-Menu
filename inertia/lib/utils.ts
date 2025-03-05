import { router } from '@inertiajs/react'
import { clsx, type ClassValue } from 'clsx'
import React from 'react'
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

const extendedClickEvent = <C extends (...args: any[]) => any>(callback: C) => {
  return <T = MouseEvent>(event: React.MouseEvent<T, MouseEvent>) => {
    event.stopPropagation()
    callback(event)
  }
}
export const signOut = extendedClickEvent(() => {
  router.get('/auth/sign-out')
})
export const destroyProfile = extendedClickEvent(() => {
  router.get('profile/destroy')
})
