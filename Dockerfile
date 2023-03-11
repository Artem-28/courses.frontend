FROM node:lts-alpine

COPY . /app

WORKDIR /app

RUN  npm i -g @quasar/cli

EXPOSE 3003

CMD ["npm", "run", "dev"]
