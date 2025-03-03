import type { SignUpValidator } from '#validators/auth'
import { Link, useForm } from '@inertiajs/react'
import { LockIcon, Plus, UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import Button from '~/components/ui/button'
import Input, { InputError, InputIcon, InputPassword } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import AuthLayout from '~/layouts/auth-layout'
import { cn } from '~/lib/utils'

export default function () {
  const { data, setData, post, processing, errors, reset } = useForm<SignUpValidator>({
    username: '',
    password: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    post('sign-in', {
      onSuccess: () => reset(),
      onError: (error) => {
        if ('E_INVALID_CREDENTIALS' in error) {
          toast.error(error.E_INVALID_CREDENTIALS)
        }
      },
    })
  }

  return (
    <AuthLayout>
      <section className="max-w-md border w-full p-2 bg-accent mx-4 relative">
        <Plus strokeWidth="1" className="absolute size-6 -top-3 -left-3 text-foreground" />
        <Plus strokeWidth="1" className="absolute size-6 -bottom-3 -left-3 text-foreground" />
        <Plus strokeWidth="1" className="absolute size-6 -top-3 -right-3 text-foreground" />
        <Plus strokeWidth="1" className="absolute size-6 -bottom-3 -right-3 text-foreground" />
        <div className="p-6 bg-card rounded-md border">
          <div className="space-y-2 text-center mb-6">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className={cn(errors.username && 'text-destructive')}>
                Username
              </Label>
              <div className="relative">
                <InputIcon>
                  <UserIcon size={18} />
                </InputIcon>
                <Input
                  id="username"
                  className="pl-10"
                  placeholder="john@example.com"
                  value={data.username}
                  onChange={(event) => setData('username', event.target.value)}
                  autoComplete="username"
                />
              </div>
              <InputError error={errors.username}>{errors.username}</InputError>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className={cn(errors.password && 'text-destructive')}>
                  Password
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <InputIcon>
                  <LockIcon />
                </InputIcon>
                <InputPassword
                  id="password"
                  className="pl-10"
                  placeholder="**************"
                  value={data.password}
                  onChange={(event) => setData('password', event.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <InputError error={errors.password}>{errors.password}</InputError>
            </div>

            <Button type="submit" className="w-full" isPending={processing}>
              {processing ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button" className="w-full">
                Google
              </Button>
              <Button variant="outline" type="button" className="w-full">
                GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              <span>Don't have an account?&nbsp;</span>
              <Link
                href="/auth/sign-up"
                className="text-sm text-foreground underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </AuthLayout>
  )
}
