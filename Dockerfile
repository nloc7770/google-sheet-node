FROM node:14.19.3-alpine
WORKDIR /usr/src/app

COPY package*.json ./


# Install dependencies
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
