import { Plus } from 'lucide-react'
import React from 'react'
import { cn } from '~/lib/utils'

type AuthCardProps = React.ComponentProps<'div'>

const AuthCard: React.FC<AuthCardProps> = ({ className, ...props }) => {
  return (
    <section className="max-w-md border w-full p-2 bg-accent mx-4 relative">
      <Plus strokeWidth="1" className="absolute size-6 -top-3 -left-3 text-foreground" />
      <Plus strokeWidth="1" className="absolute size-6 -bottom-3 -left-3 text-foreground" />
      <Plus strokeWidth="1" className="absolute size-6 -top-3 -right-3 text-foreground" />
      <Plus strokeWidth="1" className="absolute size-6 -bottom-3 -right-3 text-foreground" />
      <div className={cn('p-6 bg-card rounded-md border', className)} {...props} />
    </section>
  )
}
export default AuthCard

type AuthCardContentProps = React.ComponentProps<'form'>
export const AuthCardContent: React.FC<AuthCardContentProps> = ({ className, ...props }) => {
  return <form className={cn('space-y-4', className)} {...props} />
}
