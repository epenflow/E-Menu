import { Link } from '@inertiajs/react'
import type React from 'react'
import { buttonVariants } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Block, Heading, Text } from '~/components/ui/typography'
import For from '~/components/utility/for'
import { useIsCurrentPath } from '~/hooks/use-is-current-path'
import { cn } from '~/lib/utils'
import DashboardContainer from './dashboard/dashboard-container'

const asideMenuItems = [
  {
    href: '/settings/profile',
    title: 'Profile',
  },
  {
    href: '/settings/password',
    title: 'Password',
  },
] satisfies Array<{
  title: string
  href: string
}>

type SettingLayoutProps = React.PropsWithChildren
const SettingLayout: React.FC<SettingLayoutProps> = ({ children }) => {
  const isCurrentPath = useIsCurrentPath()
  return (
    <DashboardContainer>
      <div className="px-4 py-6 space-y-6">
        <Block>
          <Heading level={3} className="font-medium">
            Settings
          </Heading>
          <Text>Manage your profile and account settings</Text>
        </Block>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="max-w-xl lg:w-48">
            <nav className="flex flex-col gap-1 space-x-0">
              <For each={asideMenuItems}>
                {(item, key) => (
                  <Link
                    key={key}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'sm' }),
                      {
                        'bg-muted': isCurrentPath(item.href),
                      },
                      'justify-start'
                    )}
                  >
                    {item.title}
                  </Link>
                )}
              </For>
            </nav>
          </aside>
          <Separator className="md:hidden" />
          <div className="flex-1 md:max-w-2xl">{children}</div>
        </div>
      </div>
    </DashboardContainer>
  )
}
export default SettingLayout
