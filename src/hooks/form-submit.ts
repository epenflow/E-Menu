import React from "react";

const useFormSubmit = (fn: VoidFunction) => {
  return React.useCallback(
    <T>(e: React.FormEvent<T>) => {
      e.preventDefault();
      e.stopPropagation();
      fn();
    },
    [fn],
  );
};
export default useFormSubmit;
