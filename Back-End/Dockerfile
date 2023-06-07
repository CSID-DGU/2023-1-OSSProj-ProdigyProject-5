FROM node:16

WORKDIR /app
COPY package.json .
COPY package-lock.json ./
COPY ./ ./

RUN npm install
#RUN apk add --no-cache --virtual .gyp python make g++ pkgconfig pixman-dev cairo-dev pango-dev

CMD ["npm","run", "start"]

