FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy all dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .
 
EXPOSE 8000
CMD [ "npm", "start" ]
