# Use the official Node.js image from Docker Hub
FROM node:20.11.0-alpine3.18


# TODO: Build the client and move the dist folder to server

# Set the working directory inside container for all the 
# subsequent instructions
WORKDIR /user/app/server

# Copy the package.json file, contents of the 'src' directory
# and 'dist' directory to the working directory
COPY package.json ./
COPY src/ ./src
COPY dist/ ./dist

# Run shell command to remove scripts as they intended for developers.
RUN rm -rf ./src/scripts

# Remove the 'prepare' script from the package.json file
# to avoid 'Module not found' error causes by husky.
RUN npm pkg delete scripts.prepare

# Install dependencies with npm, excluding development dependencies
RUN npm install --omit=dev

# Set the command to start the server when the container starts
CMD ["npm", "run", "start:prod"]
