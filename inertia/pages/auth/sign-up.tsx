import type { SignUpValidator } from '#validators/auth'
import { Link, useForm } from '@inertiajs/react'
import { LockIcon, Mail, UserIcon, UserPen } from 'lucide-react'
import Button, { buttonVariants } from '~/components/ui/button'
import Input, { InputPassword } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import AuthLayout from '~/layouts/auth-layout'
import AuthBreadcrumb from '~/layouts/auth/auth-breadcrumb'
import AuthCard, { AuthCardContent } from '~/layouts/auth/auth-card'
import { cn } from '~/lib/utils'

export default function () {
  const { data, setData, post, processing, errors, reset } = useForm<SignUpValidator>({
    fName: '',
    lName: '',
    username: '',
    email: '',
    password: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    post('sign-up', {
      onSuccess: () => reset(),
      onError: (error) => {
        console.log(error)
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
              title: 'Sign up',
            },
          ]}
        />

        <AuthCardContent onSubmit={submit}>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="fName" className={cn(errors.fName && 'text-destructive')}>
                First name
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
                  id="fName"
                  type="text"
                  className="pl-10"
                  placeholder="john"
                  value={data.fName}
                  onChange={(event) => setData('fName', event.target.value)}
                  autoComplete="name"
                />
              </div>
              {errors.fName ? (
                <p
                  className={cn(
                    'text-destructive text-sm transition-opacity ease-in-out duration-500 delay-75',
                    errors.fName ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {errors.fName}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lName" className={cn(errors.lName && 'text-destructive')}>
                Last name
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
                  id="lName"
                  type="text"
                  className="pl-10"
                  placeholder="doe"
                  value={data.lName}
                  onChange={(event) => setData('lName', event.target.value)}
                  autoComplete="username"
                />
              </div>
              {errors.lName ? (
                <p
                  className={cn(
                    'text-destructive text-sm transition-opacity ease-in-out duration-500 delay-75',
                    errors.lName ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {errors.lName}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className={cn(errors.username && 'text-destructive')}>
              Username
            </Label>
            <div className="relative">
              <div
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'hover:bg-transparent',
                  'absolute top-1/2 -translate-y-1/2 left-0'
                )}
              >
                <UserPen size={18} />
              </div>
              <Input
                id="username"
                className="pl-10"
                placeholder="john_doe"
                value={data.username}
                onChange={(event) => setData('username', event.target.value)}
                autoComplete="username"
              />
            </div>
            {errors.username ? (
              <p
                className={cn(
                  'text-destructive text-sm transition-opacity ease-in-out duration-500 delay-75',
                  errors.username ? 'opacity-100' : 'opacity-0'
                )}
              >
                {errors.username}
              </p>
            ) : null}
          </div>

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
                <Mail size={18} />
              </div>
              <Input
                id="email"
                className="pl-10"
                type="email"
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
            <Label htmlFor="password" className={cn(errors.password && 'text-destructive')}>
              Password
            </Label>
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
            <span>Already have account?&nbsp;</span>
            <Link
              href="/auth/sign-in"
              className="text-sm text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </AuthCardContent>
      </AuthCard>
    </AuthLayout>
  )
}
