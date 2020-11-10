FROM node:14.4.0-alpine3.11

WORKDIR /app

RUN npm install -g --unsafe-perm @quasar/cli http-server

COPY package*.json quasar.conf.js dist ./

RUN npm install

COPY . .

RUN quasar build

EXPOSE 8080

CMD [ "http-server", "dist/spa" ]
