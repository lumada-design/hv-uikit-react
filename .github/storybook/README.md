# Storybook Action

This is a wrapper action to start and stop a docker container which serves the storybook to be tested.

## Requirements

The storybook `index.html` and other resources must exist in `.github/storybook/www` so that it gets added to the docker image.

## Developing

To edit the behaviour of this action check the `start.js` and `stop.js` files under `src`.

## Build

The action needs to be built before commiting so that the packaged files are up to date. To perform the build you can run:

```
npm run package
```
