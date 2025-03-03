import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const patternVariants = cva('absolute w-full h-full block bg-center top-0 left-0', {
  variants: {
    pattern: {
      diagonal: 'pattern-diagonal',
      boxes: 'pattern-boxes',
      polka: 'pattern-polka',
    },
  },
  defaultVariants: {
    pattern: 'diagonal',
  },
})

type PatternProps = React.ComponentProps<'span'> & VariantProps<typeof patternVariants>
export default function ({ className, pattern, ...props }: PatternProps) {
  return <span className={cn(patternVariants({ pattern, className }))} {...props} />
}
