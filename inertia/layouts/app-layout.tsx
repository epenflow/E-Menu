import type React from 'react'
import ScrollArea, { type ScrollAreaProps } from '~/components/ui/scroll-area'
import { cn } from '~/lib/utils'
import AppFooter from './app/app-footer'
import AppHeader from './app/app-header'
import RootLayout from './root-layout'

type AppLayoutProps = ScrollAreaProps
const AppLayout: React.FC<AppLayoutProps> = ({ className, children, ...props }) => {
  return (
    <RootLayout>
      <AppHeader />
      <ScrollArea className={cn('h-container', className)} {...props}>
        {children}
        <AppFooter />
      </ScrollArea>
    </RootLayout>
  )
}
export default AppLayout
