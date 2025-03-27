import { Block, Heading, Text } from "~/components/ui/typography";

const DiningTableHeader = () => {
  return (
    <Block className="gap-1">
      <Heading level={3} className="font-medium">
        Manage Dining Tables
      </Heading>
      <Text>View and manage the dining tables in your restaurant.</Text>
    </Block>
  );
};
export default DiningTableHeader;
