import { timestamp, text, primaryKey, integer, pgTable, 
    varchar, serial,boolean, pgEnum } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import {relations } from "drizzle-orm";

export const quizzes = pgTable("quizzes", {
    id: serial("id").primaryKey(),
    name: text("name"),
    description: text("description"),
    userId : text("user_id"),
});

