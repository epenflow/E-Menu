import React from 'react'

export function useIsCurrentPath() {
  const isCurrentPath = React.useCallback((path: string): boolean => {
    const currentPath = window.location.pathname
    return currentPath === path
  }, [])

  return isCurrentPath
}
