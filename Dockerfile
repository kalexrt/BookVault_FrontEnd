# Use Node 18 image and alpine
FROM node:18-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies specified in package.json
RUN npm install

# Copy all files from the current directory to the working directory in the container
COPY . .

# Expose port 5173 to allow traffic to the container
EXPOSE 5173

# Define the command to run the application
CMD ["npm", "run", "dev"]