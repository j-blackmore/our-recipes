FROM node:12-alpine

RUN mkdir -p /app/server
WORKDIR /app/server

COPY . .

RUN npm install
RUN npm install -g nodemon

EXPOSE 4000
CMD [ "npm", "start" ]