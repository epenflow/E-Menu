import { ListOrdered, SquareMenu, Wallet, type LucideIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { CardOuter } from "~/components/ui/card";
import Pattern from "~/components/ui/pattern";
import { Block, Heading, Text } from "~/components/ui/typography";
import For from "~/components/utils/for";
import ContainerLayout, {
  ContainerInnerLayout,
} from "~/layouts/container-layout";

const SectionFeature = () => {
  const { features } = resources;

  return (
    <ContainerLayout id="feature" className="h-full">
      <ContainerInnerLayout className="min-h-screen h-full py-10 overflow-clip">
        <Badge variant="secondary" className="relative z-10">
          Features
        </Badge>
        <Block center className="text-center">
          <Heading>Everything You Need for Modern Dining</Heading>
          <Text>
            Our e-menu platform provides all the tools to modernize your
            restaurant operations.
          </Text>
        </Block>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          <For each={features}>
            {(feature, key) => (
              <CardOuter key={key}>
                <Block className="bg-card px-6 py-12 h-full rounded-md border">
                  <Block className="flex-row items-center">
                    <feature.icon />
                    <Text className="w-fit">{feature.label}</Text>
                  </Block>
                  <Heading level={4} className="font-medium">
                    {feature.title}
                  </Heading>
                  <Text>{feature.description}</Text>
                </Block>
              </CardOuter>
            )}
          </For>
        </div>

        <Pattern pattern="polka" />
        <span className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-card to-transparent via-card" />
      </ContainerInnerLayout>
    </ContainerLayout>
  );
};
export default SectionFeature;
const resources = {
  features: [
    {
      icon: SquareMenu,
      label: "Digital Menus",
      description:
        "Beautiful, interactive menus that showcase your dishes with high-quality images and detailed descriptions.",
      title: "Interactive Digital Menus",
    },
    {
      icon: Wallet,
      label: "Seamless Payments",
      description:
        "Integrated payment processing allows customers to pay directly from their table, reducing wait times.",
      title: "Hassle-Free Payments",
    },
    {
      icon: ListOrdered,
      label: "Order Management",
      description:
        "Streamlined kitchen operations with real-time order tracking and notification system.",
      title: "Efficient Order Management",
    },
  ] satisfies Array<{
    label: string;
    description: string;
    icon: LucideIcon;
    title: string;
  }>,
};
