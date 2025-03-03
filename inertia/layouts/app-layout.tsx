import ScrollArea, { type ScrollAreaProps } from '~/components/ui/scroll-area'
import AppFooter from './app/app-footer'
import AppHeader from './app/app-header'

type AppLayoutProps = ScrollAreaProps
export default function ({ className, children, ...props }: AppLayoutProps) {
  return (
    <>
      <AppHeader />
      <ScrollArea className="h-container" {...props}>
        {children}
        <AppFooter />
      </ScrollArea>
    </>
  )
}
