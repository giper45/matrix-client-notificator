FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
COPY index.js ./
RUN npm install
ENTRYPOINT ["node", "index.js"]
