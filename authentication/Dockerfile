FROM node:20

WORKDIR /app

# Set environment to ensure devDependencies are installed
ENV NODE_ENV=development

# Update system (optional)
RUN apt-get update && apt-get upgrade -y && apt-get clean

COPY package*.json ./

# Install all dependencies, including dev
RUN npm ci

COPY . .
COPY ./proto ./proto

RUN npm run build

CMD ["node", "dist/main"]
