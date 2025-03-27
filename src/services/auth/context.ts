import React from "react";
import { type AuthContextValues } from "./type";

export const AuthContext = React.createContext<AuthContextValues | undefined>(
  undefined,
);
