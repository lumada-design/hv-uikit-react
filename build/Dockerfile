FROM node:14.15.4-alpine3.11

RUN apk update && \
    apk upgrade && \
    apk --no-cache add git openssh-client

EXPOSE 9001

ENV UIKIT_FOLDER /home/node/hv-uikit-react

ENV UIKIT_USER node
ENV UIKIT_GROUP node

# don't run as root to avoid "prepublish: cannot run in wd" errors
# also remember to always use COPY and similar commands with the same user permissions
USER $UIKIT_USER:$UIKIT_GROUP

# don't let WORKDIR create the $UIKIT_FOLDER folder or it will be owned by root
RUN mkdir -p $UIKIT_FOLDER
WORKDIR $UIKIT_FOLDER

# copy miscellaneous resources (first because they're less likely to change)
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./.eslint* ./.gitignore ./CONTRIBUTING.md ./ROADMAP.md ./

# copy build scripts
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./scripts ./scripts

# copy configs
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./config ./config

# copy the top orchestrator package's files
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./package.json ./package-lock.json ./lerna.json ./babel.config.js ./prettier.config.js ./LICENSE.txt ./

# bootstrap the top orchestrator package
RUN npm ci

# copy the storybook files
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./.storybook ./.storybook
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./doc ./doc

# copy the project's packages (from the least to the most likely to change)
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./packages/themes ./packages/themes
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./packages/icons ./packages/icons
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./packages/lab ./packages/lab
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./automation ./automation
COPY --chown=$UIKIT_USER:$UIKIT_GROUP ./packages/core ./packages/core

# bootstrap the project's packages (also builds icons, core and lab packages)
RUN npm run bootstrap
