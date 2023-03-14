FROM node:lts-alpine

COPY . /app

WORKDIR /app

EXPOSE 3003

CMD ["npm", "run", "dev"]
