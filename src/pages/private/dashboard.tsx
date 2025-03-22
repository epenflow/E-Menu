import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "~/components/ui/scroll-area";
import For from "~/components/utils/for";

const Dashboard = () => {
  return (
    <div className="w-full">
      <ScrollArea className="w-52 whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          <For
            each={Array.from({ length: 1000 })}
            children={(_, key) => (
              <div key={key} className="w-10">
                {key}
              </div>
            )}
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
export default Dashboard;
