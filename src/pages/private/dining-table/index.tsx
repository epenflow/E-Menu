import PrivateContainer from "~/layouts/private/private-container";
import DiningTableHeader from "./dining-table-header";
import DiningTableTabs from "./dining-table-tabs";

const DiningTable = () => {
  return (
    <PrivateContainer>
      <div className="flex flex-col gap-6">
        <DiningTableHeader />
        <DiningTableTabs />
      </div>
    </PrivateContainer>
  );
};
export default DiningTable;
