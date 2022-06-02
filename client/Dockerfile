FROM node:lts-alpine

RUN yarn global add http-server

WORKDIR /app

# Copy deps related files first to use Docker's layer caching effectively
COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["http-server", "dist"]