
FROM node:23

# Update and install security patches
RUN apt-get update && apt-get upgrade -y && apt-get clean

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY ./proto ./proto


RUN npm run build

CMD ["node", "dist/main"]
