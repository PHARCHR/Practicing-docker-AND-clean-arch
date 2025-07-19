FROM node:latest

WORKDIR /PROJECT_BACKEND4

COPY package*.json ./
 RUN npm install
 RUN npm install -g nodemon


 COPY . .

 EXPOSE 3000

 CMD ["nodemon", "app.js"]