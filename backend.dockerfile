FROM node:18-slim

WORKDIR /home/potatoai

COPY src /home/potatoai/src
COPY tsconfig.json /home/potatoai/
COPY config.toml /home/potatoai/
COPY drizzle.config.ts /home/potatoai/
COPY package.json /home/potatoai/
COPY yarn.lock /home/potatoai/

# RUN mkdir /home/potatoai/data
# Expose port 80 to be used by Azure
EXPOSE 3001

RUN yarn install --frozen-lockfile --network-timeout 600000
RUN yarn build

CMD ["yarn", "start"]