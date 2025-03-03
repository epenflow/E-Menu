import { router } from '@inertiajs/react'
import Button from '~/components/ui/button'

export default function () {
  return (
    <div>
      <p>Hello</p>
      <Button onClick={() => router.get('/auth/sign-out')} type="button">
        Sign-out
      </Button>
    </div>
  )
}
