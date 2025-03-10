import useIsomorphicLayoutEffect from "~/hooks/isomorphic-layout-effect";
import { disableReactDevTools } from "~/lib/utils";

const Invoke = () => {
  useIsomorphicLayoutEffect(() => {
    if (!import.meta.env.DEV) {
      disableReactDevTools();
    }
  }, []);

  return null;
};

export default Invoke;
