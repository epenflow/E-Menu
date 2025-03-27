import * as z from "zod";
import type { addDiningTableSchema, diningTableSchema } from "./schema";

export type DiningTableSchema = z.infer<typeof diningTableSchema>;
export type AddDiningTableSchema = z.infer<typeof addDiningTableSchema>;
