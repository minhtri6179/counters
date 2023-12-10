FROM --platform=linux/amd64 node:18-alpine

# Create app directory
WORKDIR /app

# Copy all dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .
 
EXPOSE 3000
CMD [ "npm", "start" ]
