'use client'

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
import Input from '../ui/input'
import { Label } from '../ui/label'
import { Block, Heading, Text } from '../ui/typography'

const ForgotUserPassword = () => {
  const emailRef = React.useRef<HTMLInputElement>(null)
  const { setData, errors, data, clearErrors, reset, processing, post } = useForm({
    email: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('password/email', {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Password reset link has been sent to your email')
        closeModal()
      },
      onError: (error) => {
        if ('email' in error) {
          toast.error(error.email)
        }
        emailRef.current?.focus()
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
        Reset Password
      </Heading>
      <Text>
        Forgot your password? No problem. Enter your email address and we'll send you a password
        reset link.
      </Text>
      <div className="space-y-4 mt-2 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-200/10 dark:bg-blue-700/10">
        <div className="relative space-y-0.5 text-blue-600 dark:text-blue-100">
          <p className="font-medium">Note</p>
          <p className="text-sm">
            You'll receive an email with instructions to reset your password.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="default">
              Reset Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
            <form className="space-y-6" onSubmit={submit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailRef}
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                />

                {errors.email ? <p className="text-destructive text-sm">{errors.email}</p> : null}
              </div>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                </DialogClose>

                <Button variant="default" disabled={processing} type="submit">
                  {processing ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Block>
  )
}

export default ForgotUserPassword
