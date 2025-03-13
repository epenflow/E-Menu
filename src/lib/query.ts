import { QueryClient } from "@tanstack/react-query";

const query = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});
export default query;
