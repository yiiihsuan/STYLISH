FROM node:18.18.0-alpine

COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force

COPY ./ ./

#RUN npm run swagger

EXPOSE 3000

CMD ["node", "index.js"]
