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
import { json,pgTable, serial, text, varchar, jsonb ,timestamp,integer, boolean, numeric, uuid } from 'drizzle-orm/pg-core';
import { sql } from "drizzle-orm";

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

// 🟢 User Plan (Tracks User Balance & Subscription)
export const userPlan = pgTable("user_plan", {
  id: serial("id").primaryKey(),
  userId: uuid("userId").notNull().unique(), // Each user has one plan
  balance: numeric("balance", { precision: 20, scale: 8 }).default(sql`0`), // User's available balance in $
  totalUsage: numeric("total_usage", { precision: 20, scale: 8 }).default(sql`0`), // Total spent
  remainingCredits: numeric("remaining_credits", { precision: 20, scale: 8 }).default(sql`0`), // Remaining credits in $
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// 🟢 Plan Tier (Defines Rate Limits & Min Deposit)
export const planTier = pgTable("plan_tier", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // e.g., "Free", "Pro", "Enterprise"
  minDeposit: numeric("min_deposit", { precision: 10, scale: 2 }).default(sql`0`), // Min balance required
  maxRequestsPerMinute: integer("max_requests_per_minute").notNull(), // Rate limit per user
  maxConcurrentRequests: integer("max_concurrent_requests").notNull(), // Max parallel API calls
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 🟢 Model Pricing (Defines Cost per Token)
export const modelPricing = pgTable("model_pricing", {
  id: serial("id").primaryKey(),
  modelName: text("model_name").notNull().unique(), // e.g., "GPT-4", "Claude"
  inputTokenPrice: numeric("input_token_price").notNull(), // Price per input token
  outputTokenPrice: numeric("output_token_price").notNull(), // Price per output token
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 🟢 API Keys (User Authentication & Tracking)
export const apiKeys = pgTable("api_keys", {
  id: serial("id"),
  userId: uuid("userId").notNull().references(() => userPlan.userId), // Links to user
  api_key: varchar("api_key", { length: 64 }).notNull().unique(), // API key
  status: boolean("is_active").default(true), // Key status
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 🟢 API Usage (Tracks User Consumption & Cost)
export const apiUsage = pgTable("api_usage", {
  id: serial("id").primaryKey(),
  userId: uuid("userId").notNull().references(() => userPlan.userId),
  apiKeyId: integer("api_key_id").notNull().references(() => apiKeys.id),
  modelId: integer("model_id").notNull().references(() => modelPricing.id),
  inputTokens: integer("input_tokens").default(0), // Input tokens used
  outputTokens: integer("output_tokens").default(0), // Output tokens generated
  searches: integer("searches").default(0), // Web searches performed
  totalCost: numeric("total_cost", { precision: 10, scale: 4 }).default(sql`0`), // Total charge
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 🟢 Web Search Pricing (Fixed Cost per Search)
export const webSearchPricing = pgTable("web_search_pricing", {
  id: serial("id").primaryKey(),
  pricePerSearch: numeric("price_per_search", { precision: 10, scale: 4 }).notNull(), // Cost per web search
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),                               // Auto-incrementing ID
  userId: uuid('userId').notNull(), // Use UUID type for userId
  categories: jsonb("categories")                              // JSONB array for categories
    .default(sql`'["AI", "Technology"]'::jsonb`)
    .$type<string[]>(),
  languages: jsonb("languages")                                // JSONB array for languages
    .default(sql`'[]'::jsonb`)
    .$type<string[]>(),
  createdAt:timestamp("created_at").default(sql`CURRENT_TIMESTAMP`)
    .defaultNow(),
  updatedAt:timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// potatoai@123
// postgresql://postgres:[YOUR-PASSWORD]@db.lqfncvigfsrmhownygra.supabase.co:5432/postgres 











