import type React from 'react'
import { cn } from '~/lib/utils'
import RootLayout from './root-layout'

type AuthLayoutProps = React.ComponentProps<'main'>
const AuthLayout: React.FC<AuthLayoutProps> = ({ className, ...props }) => {
  return (
    <RootLayout>
      <main
        className={cn('min-h-svh h-full flex items-center justify-center', className)}
        {...props}
      />
    </RootLayout>
  )
}
export default AuthLayout
