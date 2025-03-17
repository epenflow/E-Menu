import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export const withMemo: <T>(
  Component: T,
  propsAreEqual?: (prevProps: Readonly<T>, nextProps: Readonly<T>) => boolean,
) => T = React.memo;

export const disableReactDevTools: VoidFunction = () => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DEVTOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

    if (typeof DEVTOOLS === "object") {
      for (const [key, value] of Object.entries(DEVTOOLS)) {
        DEVTOOLS[key] = typeof value === "function" ? Function.prototype : null;
      }
    }
  }
};

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const serialize: <T>(value: T) => string = (value) =>
  JSON.stringify(value);
export const deserialize = <T>(value: string): T | undefined => {
  try {
    const parse: T = JSON.parse(value);
    return parse;
  } catch (error) {
    console.error("Error parse JSON", error);
    return undefined;
  }
};
export const assertIsDefined: <T>(
  data?: T | null,
) => asserts data is Exclude<T, null | undefined> = <T>(data?: T | null) => {
  if (data === null || typeof data === "undefined") {
    throw new Error(
      `Assertion failed: data is ${data === null ? "null" : "undefined"}`,
    );
  }
};

export const getInitials = (value?: string | null): string => {
  if (!value || typeof value === "undefined") {
    return "A";
  }
  const names = value.trim().split(" ");
  if (names.length === 0) return "A";
  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  const firstInitial = names[0].charAt(0);
  const lastInitial = names[names.length - 1].charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
};

export const isTokenExpires = (expiresAt?: Date | null) => {
  if (expiresAt && typeof expiresAt !== "undefined") {
    const expires = new Date(expiresAt);
    const now = new Date(Date.now() - 1000 * 60);

    return now > expires;
  }
  return true;
};
