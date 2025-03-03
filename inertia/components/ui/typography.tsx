import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '~/lib/utils'

const headingVariants = cva('text-foreground', {
  variants: {
    level: {
      1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
      2: 'scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0',
      3: 'scroll-m-20 text-2xl font-bold tracking-tight',
      4: 'scroll-m-20 text-xl font-bold tracking-tight',
    },
  },
  defaultVariants: {
    level: 1,
  },
})
type HeadingProps = React.ComponentProps<'h1'> & VariantProps<typeof headingVariants>
export const Heading: React.FC<HeadingProps> = ({ className, level, ...props }) => {
  return <h1 className={cn(headingVariants({ level, className }))} {...props} />
}

type TextProps = React.ComponentProps<'p'>
export const Text: React.FC<TextProps> = ({ className, ...props }) => {
  return <p className={cn('leading-7 text-foreground/80', className)} {...props} />
}

type BlockProps = React.ComponentProps<'div'> & {
  center?: boolean
}
export const Block: React.FC<BlockProps> = ({ className, center, ...props }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2.5 max-w-xl text-pretty flex-wrap relative z-10',
        center && 'mx-auto',
        className
      )}
      {...props}
    />
  )
}
