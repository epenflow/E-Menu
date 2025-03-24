import Pattern from "~/components/ui/pattern";
import For from "~/components/utils/for";
import PrivateContainer from "~/layouts/private/private-container";

const Dashboard = () => {
  return (
    <PrivateContainer>
      <div className="flex gap-4 flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <For
            each={Array.from({ length: 3 })}
            children={(_, key) => (
              <Pattern
                key={key}
                className="relative h-52 [--diagonal-space:10px_10px] border rounded-md"
              />
            )}
          />
        </div>
        <Pattern className="relative h-96 w-full  [--diagonal-space:10px_10px] border rounded-md" />
      </div>
    </PrivateContainer>
  );
};
export default Dashboard;
