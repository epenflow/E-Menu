import { fallback } from "@tanstack/zod-adapter";
import * as z from "zod";
import { DiningTableStatus } from "./enum";

export const diningTableSchema = z.object({
  status: fallback(
    z.nativeEnum(DiningTableStatus),
    DiningTableStatus.ALL,
  ).default(DiningTableStatus.ALL),
  id: fallback(z.string().optional(), undefined),
});

export const addDiningTableSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  description: z.string().optional(),
  capacity: z.number({ message: "Capacity is required!" }),
});
