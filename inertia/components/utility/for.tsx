import React from 'react'
type ForProps<T> = {
  each?: T[]
  children?: (value: T, index: number) => React.ReactNode
}

export default function <T>({ each, children }: ForProps<T>) {
  return each?.map((value, index) => children?.(value, index))
}
