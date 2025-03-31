FROM node:18-alpine
WORKDIR /app

# Copy package.json from the server directory into /app
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install --legacy-peer-deps

# Copy the rest of the files from server (or adjust as needed)
COPY server/ ./

# If other files (like models, .env) are outside /server, copy them appropriately
COPY ../models/ ../models/
COPY ../.env ../.env

EXPOSE 5000
CMD ["node", "./server.mjs"]
