# ----------------------------------------------------------------------------------------------------------------------
#
#     ____             __             _____ __   
#    / __ \____  _____/ /_____  _____/ __(_) /__ 
#   / / / / __ \/ ___/ //_/ _ \/ ___/ /_/ / / _ \
#  / /_/ / /_/ / /__/ ,< /  __/ /  / __/ / /  __/
# /_____/\____/\___/_/|_|\___/_/  /_/ /_/_/\___/ 
#                                               
#
# For official documentation, see:
# https://docs.docker.com/engine/reference/builder/
#
# ----------------------------------------------------------------------------------------------------------------------

# ----------------------------------------------------------------------------------------------------------------------
# BUILD ENVIRONMENT
#
# Description:
# Set up environment to create production ready Node / NestJS application
#
# For official documentation, see:
# https://docs.docker.com/develop/develop-images/multistage-build
#
# ----------------------------------------------------------------------------------------------------------------------

# Set base image
# See official available Node base images at Docker Hub https://hub.docker.com/_/node
FROM node:14-alpine AS builder

# Set current working directory
# See official /opt directory documentation at Linux Filesystem Hierarchy
# https://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/opt.html
WORKDIR /opt/multiple-auth-server

# Copy all files from ./ to WORKDIR
COPY . .

# Install dependencies and devDependencies
RUN npm install
RUN npm cache clean --force

# Run script to create NestJS production bundle in the /opt/skillsandfriends directory
RUN npm run build

# ----------------------------------------------------------------------------------------------------------------------
# SERVER ENVIRONMENT
#
# Description:
# Set up environment to run production ready Node / NestJS application
#
# For official documentation, see:
# https://docs.docker.com/develop/develop-images/multistage-build
#
# ----------------------------------------------------------------------------------------------------------------------

# Set base image
# See official available Node base images at Docker Hub https://hub.docker.com/_/node
FROM node:14-alpine AS server

# Set image labels
LABEL MAINTAINER="Matvei Kinner"
LABEL MAINTAINER_EMAIL="matvei.kinner@gmail.com"

# Set arguments which can be later overwritten higher in hierarchy with ex. Docker Compose, or .gitlab-ci.yml
ARG ARG_APP_VERSION=0.0.1
ARG ARG_ENV=production
ARG ARG_PORT=3000

# Set environmental variables from arguments
ENV VERSION=${ARG_APP_VERSION}
ENV NODE_ENV=${ARG_ENV}
ENV PORT=${ARG_PORT}

# Install OS package upgrades, and update available package indexes
RUN apk upgrade --update

# Install TZData to set chosen Timezone
RUN apk add -U tzdata && \
  cp /usr/share/zoneinfo/Europe/Helsinki /etc/localtime && \
  apk del tzdata

# Install Git
RUN apk add git

# Install Tini Docker container tool to handle Kernel signals properly, see https://github.com/krallin/tini
RUN apk add --no-cache tini

# Clean OS package cache
RUN rm -rf /var/cache/apk/*

# Set current working directory
# See official /opt directory documentation at Linux Filesystem Hierarchy
# https://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/opt.html
WORKDIR /opt/multiple-auth-server

# Copy package.json and package-lock.json to WORKDIR
COPY package*.json ./

# Install exact dependecies (excluding devDependencies) from package-lock.json. NestJS (depending on the setup) requires
# several dependencies which are not possible to bundle with ex. Webpack due to depedency chains which can include C++
# For reference, see https://github.com/ZenSoftware/bundled-nest
RUN npm ci --only=production

# Clean NPM _cacache to free additional space
RUN npm cache clean --force

# Copy NestJS bundle from builder step
COPY --from=builder /opt/multiple-auth-server/dist ./dist

# Execute Tini as Docker entrypoint
ENTRYPOINT ["/sbin/tini", "--"]

# Run NestJS server main executable file
CMD [ "node", "dist/src/main" ]

# Run healthcheck to see that the Node server responds
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:${PORT} || exit 1
