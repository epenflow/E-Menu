import { Link } from '@inertiajs/react'
import { buttonVariants } from '~/components/ui/button'
import For from '~/components/utility/for'
import { cn } from '~/lib/utils'

export default function () {
  return (
    <header className={cn('sticky top-0 w-full z-50 bg-card', 'border-b border-dashed')}>
      <nav className="container border-x border-dashed h-12 flex items-center justify-between">
        <ul className="flex gap-2.5 items-center">
          <For each={['E-Menu', 'Features']}>
            {(char, key) => (
              <li
                key={key}
                className={cn(
                  buttonVariants({ variant: 'link', size: 'sm' }),
                  'px-0 text-xs',
                  char !== 'E-Menu' && 'hidden md:inline-flex'
                )}
              >
                {char}
              </li>
            )}
          </For>
        </ul>

        <ul className="flex items-center gap-2.5">
          <For
            each={
              [
                { href: '/auth/sign-in', title: 'Sign-in' },
                { href: '/demo', title: 'Demo' },
              ] satisfies Array<{
                title: string
                href: string
              }>
            }
          >
            {(value, key) => (
              <li
                key={key}
                className={cn(
                  buttonVariants({ variant: key % 2 === 0 ? 'default' : 'outline', size: 'sm' }),
                  'text-xs font-medium'
                )}
              >
                <Link href={value.href}>{value.title}</Link>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </header>
  )
}
