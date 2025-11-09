# Use an official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Angular CLI globally (needed for "ng serve")
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose Angular default port
EXPOSE 4200

# Run the Angular app and make it accessible from outside the container
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "4200"]
