FROM node:20.18.0-alpine

ARG NEXT_PUBLIC_WS_URL=wss://apipotatoai.happyplant-cebe1602.southindia.azurecontainerapps.io
ARG NEXT_PUBLIC_API_URL=https://apipotatoai.happyplant-cebe1602.southindia.azurecontainerapps.io/api
ARG NEXT_PUBLIC_SUPABASE_URL=https://lqfncvigfsrmhownygra.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZm5jdmlnZnNybWhvd255Z3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5OTU2OTMsImV4cCI6MjA0OTU3MTY5M30.dm4v7roYP643QQn8Av3cWF2DVkyDqo04tIgSpGgVkaw

ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}



WORKDIR /home/potatoai

COPY ui /home/potatoai

RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["yarn", "start"]
