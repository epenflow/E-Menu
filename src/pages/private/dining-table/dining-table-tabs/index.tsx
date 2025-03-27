import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import For from "~/components/utils/for";
import { DiningTableStatus } from "~/services/dining-table";
import DiningTableDialog from "../dining-table-dialog";
import DiningTableTabsAll from "./dining-table-tabs-all";

const DiningTableTabs = () => {
  return (
    <Tabs defaultValue={DiningTableStatus.ALL}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <TabsList>
          <For
            each={Object.values(DiningTableStatus)}
            children={(status, key) => (
              <TabsTrigger key={`${key}-${status}`} value={status}>
                {status}
              </TabsTrigger>
            )}
          />
        </TabsList>
        <DiningTableDialog />
      </div>
      <DiningTableTabsAll />
    </Tabs>
  );
};

export default DiningTableTabs;
