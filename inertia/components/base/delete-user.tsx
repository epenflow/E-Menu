import { useForm } from '@inertiajs/react'
import React from 'react'
import { toast } from 'sonner'
import Button from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { InputPassword } from '../ui/input'
import { Label } from '../ui/label'
import { Block, Heading, Text } from '../ui/typography'

const DeleteUser = () => {
  const localRef = React.useRef<HTMLInputElement>(null)
  const {
    setData,
    errors,
    data,
    clearErrors,
    reset,
    processing,
    delete: destroy,
  } = useForm({
    password: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    destroy('profile/destroy', {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: (error) => {
        if ('E_INVALID_CREDENTIALS' in error) {
          toast.error(error.E_INVALID_CREDENTIALS)
        }
        localRef.current?.focus()
      },
      onFinish: () => reset(),
    })
  }
  const closeModal = () => {
    clearErrors()
    reset()
  }

  return (
    <Block>
      <Heading level={3} className="font-medium">
        Delete account
      </Heading>
      <Text>Delete your account and all of its resources</Text>
      <div className="space-y-4 mt-2 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Warning</p>
          <p className="text-sm">Please proceed with caution, this cannot be undone.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="destructive">
              Delete Profile
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
            <DialogDescription>
              Once your account is deleted, all of its resources and data will also be permanently
              deleted. Please enter your password to confirm you would like to permanently delete
              your account.
            </DialogDescription>
            <form className="space-y-6" onSubmit={submit}>
              <div className="grid gap-2">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>

                <InputPassword
                  id="password"
                  name="password"
                  ref={localRef}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                />

                {errors.password ? (
                  <p className="text-destructive text-sm">{errors.password}</p>
                ) : null}
              </div>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="secondary" onClick={closeModal}>
                    Cancel
                  </Button>
                </DialogClose>

                <Button variant="destructive" disabled={processing} type="submit">
                  {processing ? 'Deleting...' : 'Delete account'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Block>
  )
}
export default DeleteUser
