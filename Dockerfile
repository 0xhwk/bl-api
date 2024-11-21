# Step 1: Use an official Node.js runtime as the base image
FROM node:21

# Step 2: Create a directory inside the container for your app
RUN mkdir -p /bl-api

# Step 3: Set the working directory inside the container
WORKDIR /bl-api

# Step 4: Copy package.json and package-lock.json (for npm)
COPY package.json package-lock.json ./

# Step 5: Install the app dependencies using npm
RUN npm install

# Step 6: Copy the rest of your app’s source code into the working directory
COPY . .

# Step 7: Expose the port your app runs on
EXPOSE 8080

# Step 8: Define the command to run your app when the container starts
CMD ["npm", "start"]
