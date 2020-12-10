FROM node:latest

ENV NODE_ENV=production

COPY . /app

WORKDIR /app

RUN yarn install --verbose

EXPOSE 3000

CMD [ "yarn","start" ]
