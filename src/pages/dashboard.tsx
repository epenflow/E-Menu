import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import For from "~/components/utils/for";
import usePagination from "~/hooks/pagination";
import { productsQueryOptions } from "~/lib/test";

const routeApi = getRouteApi("/_private/dashboard");
const Dashboard = () => {
  const { limit, page } = routeApi.useSearch();
  const search = routeApi.useSearch();
  const {
    data: { data, meta: paginator },
  } = useSuspenseQuery(productsQueryOptions(search));
  const { onNextPage, onPrevPage, hasNextPage, hasPrevPage } = usePagination(
    "/_private/dashboard",
    paginator,
  );

  return (
    <div>
      <Link to="/">Back</Link>
      <p>{page}</p>
      <p>{limit}</p>

      <div className="flex gap-2 text-sm font-medium">
        <button
          className={hasNextPage ? "text-destructive" : "text-primary"}
          disabled={hasNextPage}
          onClick={onNextPage}>
          next
        </button>
        <button
          className={hasPrevPage ? "text-destructive" : "text-primary"}
          disabled={hasPrevPage}
          onClick={onPrevPage}>
          prev
        </button>
      </div>
      <div className="grid grid-cols-4  gap-2 container">
        <For each={data}>
          {(value, key) => (
            <div
              key={`${key}-${value.title}`}
              className="border p-6 rounded-md">
              <div className="inline-flex items-center justify-between w-full">
                <h1 className="text-lg font-medium">{value.title}</h1>
                <p className="text-sm text-muted-foreground">{value.genre}</p>
              </div>
              <p>{value.createdAt}</p>
              <p>{value.updatedAt}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
export default Dashboard;
