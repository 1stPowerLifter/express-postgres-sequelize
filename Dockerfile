FROM node:18.14.0

WORKDIR  /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

EXPOSE 8080
CMD [ "npm", "run", "start" ]