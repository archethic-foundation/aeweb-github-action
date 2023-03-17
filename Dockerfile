# Container image that runs your code
FROM node:lts-alpine3.16

RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

# Install deps
COPY aeweb_action/package.json /aeweb_action/package.json
COPY aeweb_action/package-lock.json /aeweb_action/package-lock.json
RUN npm ci --prefix /aeweb_action 

# Add the app files
COPY aeweb_action/ /aeweb_action/

ENTRYPOINT ["npm", "start", "--prefix", "/aeweb_action"]
