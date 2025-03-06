import type { SignInValidator } from '#validators/auth'
import type { SharedProps } from '@adonisjs/inertia/types'
import { Link, useForm } from '@inertiajs/react'
import { LockIcon, UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import Button, { buttonVariants } from '~/components/ui/button'
import Input, { InputPassword } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import AuthLayout from '~/layouts/auth-layout'
import AuthBreadcrumb from '~/layouts/auth/auth-breadcrumb'
import AuthCard, { AuthCardContent } from '~/layouts/auth/auth-card'
import { cn } from '~/lib/utils'

export default function ({ ...props }: SharedProps) {
  const { data, setData, post, processing, errors, reset } = useForm<SignInValidator>({
    email: '',
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
      <AuthCard>
        <AuthBreadcrumb
          breadcrumbs={[
            {
              title: 'Home',
              href: '/',
            },
            {
              title: 'Sign in',
            },
          ]}
        />

        <AuthCardContent onSubmit={submit}>
          <div className="space-y-2">
            <Label htmlFor="email" className={cn(errors.email && 'text-destructive')}>
              Email
            </Label>
            <div className="relative">
              <div
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'hover:bg-transparent',
                  'absolute top-1/2 -translate-y-1/2 left-0'
                )}
              >
                <UserIcon size={18} />
              </div>
              <Input
                id="email"
                type="email"
                className="pl-10"
                placeholder="email@example.com"
                value={data.email}
                onChange={(event) => setData('email', event.target.value)}
                autoComplete="email"
              />
            </div>
            {errors.email ? (
              <p
                className={cn(
                  'text-destructive text-sm transition-opacity ease-in-out duration-500 delay-75',
                  errors.email ? 'opacity-100' : 'opacity-0'
                )}
              >
                {errors.email}
              </p>
            ) : null}
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
              <div
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'hover:bg-transparent',
                  'absolute top-1/2 -translate-y-1/2 left-0'
                )}
              >
                <LockIcon />
              </div>
              <InputPassword
                id="password"
                className="pl-10"
                placeholder="**************"
                value={data.password}
                onChange={(event) => setData('password', event.target.value)}
                autoComplete="current-password"
              />
            </div>
            {errors.password ? (
              <p
                className={cn(
                  'text-destructive text-sm transition-opacity ease-in-out duration-500 delay-75',
                  errors.password ? 'opacity-100' : 'opacity-0'
                )}
              >
                {errors.password}
              </p>
            ) : null}
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
        </AuthCardContent>
      </AuthCard>
    </AuthLayout>
  )
}
