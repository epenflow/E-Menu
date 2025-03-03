import { Text } from '~/components/ui/typography'
import ContainerLayout, { InnerContainerLayout } from '../container-layout'

export default function () {
  return (
    <ContainerLayout className="h-fit">
      <InnerContainerLayout className="flex items-center justify-center py-4">
        <Text className="text-xs font-medium">
          Copyright ©{new Date().getFullYear()} E-Menu. All rights reserved.
        </Text>
      </InnerContainerLayout>
    </ContainerLayout>
  )
}
