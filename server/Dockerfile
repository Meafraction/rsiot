FROM node:17.3.1

WORKDIR /app

COPY package.json package-lock.json ./
COPY . /app/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
