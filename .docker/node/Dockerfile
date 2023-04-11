###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install -g @nestjs/cli

CMD ["npm", "run", "start:dev"]