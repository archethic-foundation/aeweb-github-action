# Container image that runs your code
FROM node:lts-alpine3.16

# Install deps
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

# Add the app files
COPY . .

ENTRYPOINT ["npm", "start"]

