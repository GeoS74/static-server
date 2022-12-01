FROM node

WORKDIR /static-server

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3500

CMD ["node", "./dist/index"]