# Use an official Node.js runtime as a parent image
FROM node:16-alpine


# Install curl 
RUN apk add --no-cache curl

# Set the working directory to /app in the container
WORKDIR /app

# Copy package.json and package-lock.json files into the container
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY app/ ./

# Expose the port that the app listens on (e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
