import React from "react";
import useIsomorphicLayoutEffect from "./isomorphic-layout-effect";

const useEventCallback = <Args extends unknown[], R>(
  fn: (...args: Args) => R,
): ((...args: Args) => R) | undefined => {
  const localRef = React.useRef<typeof fn>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useIsomorphicLayoutEffect(() => {
    localRef.current = fn;
  }, [fn]);

  return React.useCallback(
    (...args: Args) => localRef.current?.(...args),
    [localRef],
  );
};
export default useEventCallback;
