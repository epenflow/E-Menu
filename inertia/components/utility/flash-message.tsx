import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import React from 'react'
import { toast } from 'sonner'

const FlashMessage = () => {
  const { flashes } = usePage<SharedProps>().props

  React.useEffect(() => {
    flashes.forEach(({ type, message }) => {
      switch (type) {
        case 'success':
          toast.success(message)
          break
        case 'error':
          toast.error(message)
          break
        case 'warning':
          toast.warning(message)
          break
        case 'info':
          toast.info(message)
          break
      }
    })
  }, [flashes])
  return null
}
export default FlashMessage
