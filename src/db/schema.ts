// import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
// 
// export const messages = sqliteTable('messages', {
  // id: integer('id').primaryKey(),
  // content: text('content').notNull(),
  // chatId: text('chatId').notNull(),
  // messageId: text('messageId').notNull(),
  // role: text('type', { enum: ['assistant', 'user'] }),
  // metadata: text('metadata', {
    // mode: 'json',
  // }),
// });
// 
// export const chats = sqliteTable('chats', {
  // id: text('id').primaryKey(),
  // title: text('title').notNull(),
  // createdAt: text('createdAt').notNull(),
  // focusMode: text('focusMode').notNull(),
// });
// 
import { json,pgTable, serial, text, varchar, timestamp,uuid } from 'drizzle-orm/pg-core';

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  content: text('content').notNull(), // Content column
  chatId: varchar('chatId', { length: 255 }).notNull(), // Chat ID (varchar with max length)
  messageId: varchar('messageId', { length: 255 }).notNull(), // Message ID (varchar with max length)
  role: text('role', { enum: ['assistant', 'user'] }), // Role column with enum
  metadata:json('metadata'), // Use json type for metadata  , // Uncomment if metadata is required and supported in your schema
});

export const chats = pgTable('chats', {
  id: varchar('id', { length: 255 }).primaryKey(), // UUID or text ID
  title: text('title').notNull(), // Title column
  userId: uuid('userId'), // Use UUID type for userId
  // userId:varchar('userId', { length: 255 }),
  createdAt: text('createdAt').notNull(), // Timestamp with default
  focusMode: text('focusMode').notNull(), // Focus mode as text
});

// potatoai@123
// postgresql://postgres:[YOUR-PASSWORD]@db.lqfncvigfsrmhownygra.supabase.co:5432/postgres 











