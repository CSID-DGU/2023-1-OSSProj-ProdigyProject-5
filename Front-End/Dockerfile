FROM node:16

WORKDIR /app/pages
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install

CMD ["npm", "run", "start"]