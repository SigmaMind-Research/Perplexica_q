#############################
# Build stage
#############################

FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json and yarn.lock
COPY ui/package.json ui/yarn.lock ./

# Copy the rest of the application code
COPY ui .

# Install dependencies & build the application
RUN yarn install --frozen-lockfile && yarn build

#############################
# Production stage
#############################

FROM node:22-alpine

ARG NEXT_PUBLIC_WS_URL=wss://potatoapi-a9eeerg5afbwbyg2.centralindia-01.azurewebsites.net
ARG NEXT_PUBLIC_API_URL=https://potatoapi-a9eeerg5afbwbyg2.centralindia-01.azurewebsites.net/api
ARG NEXT_PUBLIC_SUPABASE_URL=https://lqfncvigfsrmhownygra.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZm5jdmlnZnNybWhvd255Z3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5OTU2OTMsImV4cCI6MjA0OTU3MTY5M30.dm4v7roYP643QQn8Av3cWF2DVkyDqo04tIgSpGgVkaw

ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}

WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Start the application
CMD ["yarn", "start"]