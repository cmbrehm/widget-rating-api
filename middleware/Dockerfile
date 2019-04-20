FROM node:10

WORKDIR /home/node/app
ADD package.json .
ADD index.js .
RUN npm install --production
EXPOSE 3000
CMD [ "npm", "start"]
