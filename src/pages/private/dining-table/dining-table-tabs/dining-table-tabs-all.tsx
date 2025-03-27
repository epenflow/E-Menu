import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { TabsContent } from "~/components/ui/tabs";
import For from "~/components/utils/for";
import { DiningTableStatus } from "~/services/dining-table";
import DiningTableSheet from "../dining-table-sheet";

const DiningTableTabsAll = () => {
  const getStatusColor = (status: DiningTableStatus) => {
    switch (status) {
      case DiningTableStatus.AVAILABLE:
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case DiningTableStatus.OCCUPIED:
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case DiningTableStatus.RESERVED:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <TabsContent
      value={DiningTableStatus.ALL}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <For
        each={Array.from({ length: 10 })}
        children={(_, key) => (
          <DiningTableSheet key={key}>
            <Card className="cursor-pointer">
              <CardContent className="flex justify-between">
                <h6 className="font-medium text-foreground">Table {key + 1}</h6>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline">2 Seats</Badge>
                  <Badge
                    className={getStatusColor(DiningTableStatus.AVAILABLE)}>
                    {DiningTableStatus.AVAILABLE}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="text-muted-foreground text-sm">
                {new Date().toISOString()}
              </CardFooter>
            </Card>
          </DiningTableSheet>
        )}
      />
    </TabsContent>
  );
};
export default DiningTableTabsAll;
