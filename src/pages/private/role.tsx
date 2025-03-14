import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import For from "~/components/utils/for";
import { allRoleQueryOptions } from "~/lib/services/role";

const Role = () => {
  const { routeApi } = resources;
  const {
    data: { data },
  } = useSuspenseQuery(allRoleQueryOptions(routeApi.useSearch()));
  console.log(data);
  return (
    <div>
      <For
        each={data}
        children={(roles, key) => (
          <div key={`${key}-${roles.name}`}>
            <p>{roles.name}</p>
            <For
              each={roles.abilities}
              children={(ability) => <p key={`${key}-${ability}`}>{ability}</p>}
            />
          </div>
        )}
      />
    </div>
  );
};
export default Role;
const resources = {
  routeApi: getRouteApi("/_private/role"),
};
