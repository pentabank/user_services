FROM node:latest

ENV NODE_ENV=production

COPY . /app

WORKDIR /app

RUN yarn

EXPOSE 3000

CMD [ "node","app.ts" ]