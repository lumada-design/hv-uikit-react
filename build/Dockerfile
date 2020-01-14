FROM node:12.14.0-alpine3.11

RUN apk update && \
    apk upgrade && \
    apk --no-cache add git openssh-client

EXPOSE 9002

ENV UIKIT_FOLDER /home/node/hv-uikit-react

ENV UIKIT_USER node
ENV UIKIT_GROUP node

# don't run as root to avoid "prepublish: cannot run in wd" errors
# also remember to always use COPY and similar commands with the same user permissions
USER $UIKIT_USER:$UIKIT_GROUP

# don't let WORKDIR create the $UIKIT_FOLDER folder or it will be owned by root
RUN mkdir -p $UIKIT_FOLDER
WORKDIR $UIKIT_FOLDER

# set the npm registry
RUN npm config set @hv:registry https://nexus.pentaho.org/repository/group-npm/

# copy miscellaneous resources (first because they're less likely to change)
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./.eslint* ./.gitignore ./CONTRIBUTING.md ./ROADMAP.md ./
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./resources ./resources

# copy the top orchestrator package's files
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./package.json ./package-lock.json ./lerna.json ./

# bootstrap the top orchestrator package
RUN npm ci

# copy the project's packages (from the least to the most likely to change)
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./packages/icons ./packages/icons
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./packages/lab ./packages/lab
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./packages/doc ./packages/doc
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./automation ./automation
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./packages/core ./packages/core

# bootstrap the project's packages (also builds icons, core and lab packages)
RUN npm run bootstrap
