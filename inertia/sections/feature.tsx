import { Coffee, CreditCard, Plus, SmartphoneIcon, type LucideIcon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import Pattern from '~/components/ui/pattern'
import { Block, Heading, Text } from '~/components/ui/typography'
import For from '~/components/utility/for'
import ContainerLayout, { InnerContainerLayout } from '~/layouts/container-layout'

export default function () {
  const { features } = resources

  return (
    <ContainerLayout className="h-full">
      <InnerContainerLayout className="min-h-screen h-full py-10 overflow-clip">
        <Badge variant="secondary" className="relative z-10">
          Features
        </Badge>
        <Block center className="text-center">
          <Heading>Everything You Need for Modern Dining</Heading>
          <Text>
            Our e-menu platform provides all the tools to modernize your restaurant operations.
          </Text>
        </Block>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          <For each={features}>
            {(feature, key) => (
              <div key={key} className="bg-accent p-2 relative border">
                <Plus strokeWidth="1" className="absolute size-6 -top-3 -left-3 text-foreground" />
                <Plus
                  strokeWidth="1"
                  className="absolute size-6 -bottom-3 -left-3 text-foreground"
                />
                <Plus strokeWidth="1" className="absolute size-6 -top-3 -right-3 text-foreground" />
                <Plus
                  strokeWidth="1"
                  className="absolute size-6 -bottom-3 -right-3 text-foreground"
                />
                <div className="p-6 bg-card h-full border rounded-md flex flex-col items-center text-center">
                  <div className="size-12 rounded-full bg-accent flex items-center justify-center mb-6 border">
                    <feature.icon className="text-foreground size-6" />
                  </div>
                  <h3 className="text-xl text-foreground font-medium mb-2">{feature.title}</h3>
                  <p className="text-foreground/80">{feature.description}</p>
                </div>
              </div>
            )}
          </For>
        </div>

        <Pattern pattern="polka" />
      </InnerContainerLayout>
    </ContainerLayout>
  )
}

const resources = {
  features: [
    {
      icon: SmartphoneIcon,
      title: 'Digital Menus',
      description:
        'Beautiful, interactive menus that showcase your dishes with high-quality images and detailed descriptions.',
    },
    {
      icon: CreditCard,
      title: 'Seamless Payments',
      description:
        'Integrated payment processing allows customers to pay directly from their table, reducing wait times.',
    },
    {
      icon: Coffee,
      title: 'Order Management',
      description:
        'Streamlined kitchen operations with real-time order tracking and notification system.',
    },
  ] satisfies Array<{
    title: string
    description: string
    icon: LucideIcon
  }>,
}
