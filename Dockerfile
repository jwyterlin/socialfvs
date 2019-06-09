FROM node:10-alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package*.json /usr/src/app

RUN npm install
RUN sh env.sh
COPY . /usr/src/app

EXPOSE 1337

CMD ["npm", "start"]
