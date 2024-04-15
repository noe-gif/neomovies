FROM node:19

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 8083

CMD [ "npm", "start" ]

# docker build -t neomovie .
# docker run -p 8083:8083 neomovie
