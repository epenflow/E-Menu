/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type LazyProps<T extends React.ComponentType<any>> = {
  load: Promise<{ default: T }>;
  fallback?: React.ReactNode;
} & React.ComponentProps<T>;

const LazySuspense = <T extends React.ComponentType<any>>({
  load,
  fallback,
  ...props
}: LazyProps<T>) => {
  const Load = React.useMemo(() => React.lazy(() => load), [load]);

  return (
    <React.Suspense fallback={fallback}>
      <Load {...props} />
    </React.Suspense>
  );
};

export default LazySuspense;
