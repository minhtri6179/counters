FROM --platform=linux/amd64 node:18-alpine

# Create app directory
WORKDIR /app

# Copy all dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 8000 to the outside world
EXPOSE 8000

CMD [ "npm", "start" ]
