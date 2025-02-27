FROM node:latest

COPY . .

RUN npm i

CMD ["node","app.js"]