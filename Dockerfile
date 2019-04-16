FROM node:10-alpine

WORKDIR /opt/now-playing
COPY package.json /opt/now-playing/package.json
RUN npm install
COPY . /opt/now-playing
RUN cd static && npm install && npm run build
EXPOSE 4000

CMD ["npm", "start"]