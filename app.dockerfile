FROM node:20.18.0-alpine

ARG NEXT_PUBLIC_WS_URL=wss://potatoapi-a9eeerg5afbwbyg2.centralindia-01.azurewebsites.net
ARG NEXT_PUBLIC_API_URL=https://potatoapi-a9eeerg5afbwbyg2.centralindia-01.azurewebsites.net/api
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /home/potatoai

COPY ui /home/potatoai/

RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["yarn", "start"]