FROM node as builder
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
RUN node app.js