import type React from 'react'
import type { ScrollAreaProps } from '~/components/ui/scroll-area'
import ScrollArea from '~/components/ui/scroll-area'
import { cn } from '~/lib/utils'

type DashboardContainerProps = ScrollAreaProps & {
  scrollable?: boolean
}
const DashboardContainer: React.FC<DashboardContainerProps> = ({
  scrollable = true,
  className,
  ...props
}) => {
  if (scrollable) {
    return (
      <ScrollArea
        className={cn('h-dashboard-container px-4 max-h-dashboard-container')}
        {...props}
      />
    )
  }
  return <div className={className} {...props} />
}
export default DashboardContainer
