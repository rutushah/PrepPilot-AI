import {
    boolean,
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    serial,
  } from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccount } from "@auth/core/adapters";
import {relations } from "drizzle-orm";


export const users = pgTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
  })

  export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    //   type: text("type").$type<AdapterAccountType>().notNull(),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
  )
 
  export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  })
 
  
  export const verificationTokens = pgTable(
    "verificationToken",
    {
      identifier: text("identifier").notNull(),
      token: text("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
    },
        (verificationToken) => ({
            compoundKey: primaryKey({
                columns:[
                    verificationToken.identifier,
                    verificationToken.token
                ],
            }),
        })
    )

export const quiz = pgTable("quizzes", {
    id: serial("id").primaryKey(),
    name: text("name"),
    description: text("description"),
    userId : text("user_id"),
});

export const quizRelations = relations(quiz, ({many, one}) => ({
    questions: many(questions),
}))

export const questions = pgTable("questions", {
    id: serial("id").primaryKey(),
    questionText: text("question_text"),
    quizId: integer("quiz_id"),
});

export const questionsRelations = relations(questions, ({one,many}) =>({
    quiz: one(quiz,{
        fields:[questions.quizId],
        references:[quiz.id]
    }),
    answers: many(questionAnswers)
}))

export const questionAnswers = pgTable("answers",{
    id: serial("id").primaryKey(),
    questionId: integer("question_id"),
    answerText: text("answer_text"),
    isCorrect: boolean("is_correct"),
})

export const questionAnswersRelations = relations(questionAnswers, ({one}) => ({
    question : one(questions, {
        fields:[questionAnswers.questionId],
        references:[questions.id]
    })
}))