# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json, package-lock.json, and other necessary config files
COPY ./package.json ./package-lock.json ./tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]