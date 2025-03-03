import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import Button from '~/components/ui/button'
import Pattern from '~/components/ui/pattern'
import { Block, Heading, Text } from '~/components/ui/typography'
import For from '~/components/utility/for'
import ContainerLayout, { InnerContainerLayout } from '~/layouts/container-layout'

export default function () {
  return (
    <ContainerLayout>
      <InnerContainerLayout>
        <Badge variant="secondary" className="relative z-10">
          Restaurant Point of Sale
        </Badge>
        <Block center className="text-center">
          <Heading level={1}>Modern Digital Menu for Modern Restaurants</Heading>
          <Text>
            Streamline ordering, boost sales, and enhance customer experience with our intuitive
            e-menu system.
          </Text>
        </Block>
        <Block className="flex-row">
          <Button size="sm">Try Free for 30 Days</Button>
          <Button variant="outline" size="sm">
            Schedule Demo
          </Button>
        </Block>

        <Block className="flex-row items-center gap-5 flex-wrap">
          <Text className="text-xs font-medium hidden md:block">No credit card required</Text>

          <div className="flex items-center gap-1">
            <div className="-space-x-2 flex flex-row">
              <For each={['M', 'E', 'N', 'U']}>
                {(char, key) => (
                  <Avatar key={`${key}-${char}`} className="outline-2 outline-card">
                    <AvatarFallback>{char}</AvatarFallback>
                  </Avatar>
                )}
              </For>
            </div>
            <Text className="text-xs font-medium">500+ restaurants trust us</Text>
          </div>
        </Block>

        <Pattern pattern="boxes" className="[--boxes-space:50px_50px]" />
        <span className="absolute h-full w-full left-0 bottom-0 bg-gradient-to-t from-card via-card to-transparent" />
      </InnerContainerLayout>
    </ContainerLayout>
  )
}
