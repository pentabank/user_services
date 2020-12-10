FROM node:latest

ENV NODE_ENV=production

COPY . /app

WORKDIR /app

RUN yarn

RUN yarn add ts-node

EXPOSE 3000

CMD [ "yarn","start" ]
