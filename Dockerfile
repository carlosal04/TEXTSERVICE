FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3000
ENV BASE_URL=http://localhost:${PORT}
EXPOSE ${PORT}

CMD ["node", "index"]

