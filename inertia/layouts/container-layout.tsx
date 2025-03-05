import React from 'react'
import Pattern from '~/components/ui/pattern'
import { cn } from '~/lib/utils'

type ContainerLayoutProps = React.ComponentProps<'section'>
const ContainerLayout: React.FC<ContainerLayoutProps> = ({ className, children, ...props }) => {
  return (
    <section
      className={cn(
        'flex w-full h-container [--diagonal-space:5.25px] border-b border-dashed',
        className
      )}
      {...props}
    >
      <Pattern className="relative h-auto [--diagonal-rotation:45deg] shrink bg-left" />
      {children}
      <Pattern className="relative h-auto [--diagonal-rotation:-45deg] shrink bg-right" />
    </section>
  )
}
export default ContainerLayout
type InnerContainerLayoutProps = React.ComponentProps<'article'>
export const InnerContainerLayout: React.FC<InnerContainerLayoutProps> = ({
  className,
  ...props
}) => {
  return (
    <article
      className={cn(
        'container h-full shrink-0 bg-card border-x border-dashed relative',
        'flex flex-col gap-5 items-center justify-center',
        className
      )}
      {...props}
    />
  )
}
