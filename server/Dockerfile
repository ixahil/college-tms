# Use the official Node.js slim image as the base image
FROM node:20.17.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Expose the application port
EXPOSE 8000

# Set environment variable
ENV NAME tms_server

# Start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
