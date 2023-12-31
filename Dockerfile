FROM node:18-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 9000
CMD ["npm", "start"]
