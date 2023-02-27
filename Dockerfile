#this is dockerfile for building a docker image for the fragments project

################################################################################
# Stage 0: Base
################################################################################
# Use node version 18.13.0
FROM node:18.13.0-alpine@sha256:fda98168118e5a8f4269efca4101ee51dd5c75c0fe56d8eb6fad80455c2f5827 AS base 

LABEL maintainer="Khushwant Singh Rao <ksrao1@myseneca.ca>"
LABEL description="Fragments node.js microservice"

ENV PORT=8080

ENV NPM_CONFIG_LOGLEVEL=warn

ENV NPM_CONFIG_COLOR=false

# Set the NODE_ENV to production
ENV NODE_ENV production

# Use /app as our working directory
WORKDIR /app

# Copy the package.json and package-lock.json files into /app
COPY package*.json /app/

# Install node dependencies defined in package-lock.json
RUN npm ci --only=production

################################################################################
# Stage 1: local deployment
################################################################################

FROM node:18.13.0-alpine@sha256:fda98168118e5a8f4269efca4101ee51dd5c75c0fe56d8eb6fad80455c2f5827 AS deploy

# Set the default working directory
WORKDIR /app

# Copy generated node_modules from base stage
COPY --from=base /app/ /app/

# Copy src to /app/src/
COPY ./src ./src

# Copy our HTPASSWD file
COPY ./tests/.htpasswd ./tests/.htpasswd

# Start the container by running our server
CMD ["npm", "start"]

# We run our service on port 8080
EXPOSE 8080
