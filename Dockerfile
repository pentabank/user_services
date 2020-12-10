FROM node:latest

COPY . /app

WORKDIR /app

RUN yarn install --verbose

EXPOSE 3000

CMD [ "yarn","start" ]
