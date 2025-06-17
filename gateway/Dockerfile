FROM node:20

# Set environment to reduce SWC issues

# Update and install security patches
RUN apt-get update && apt-get upgrade -y && apt-get clean

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "dist/main"]

