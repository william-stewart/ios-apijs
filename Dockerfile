FROM node:10-alpine

COPY ./ios-apijs/package*.json ./

RUN npm install

COPY ./ios-apijs ./

EXPOSE 8082

CMD [ "npm", "start", "Server.js" ]
