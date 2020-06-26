# A11Y Accessibility Tests

## Running tests

Before you start, make sure that you:

1. Have storybook up and running (`npm start` in root directory)
2. Have the dependencies installed (`npm i`)

### Running all for all stories

```
npm run pa11y-ci
```

### Running for specific stories

```
STORY=$STORY_NAME  npm run pa11y-ci
```

Where `$STORY_NAME` is a _filter string_ for the URLs of the stories you want to test.
Some examples:

```
STORY=card npm run pa11y-ci
STORY=forms npm run pa11y-ci
STORY=forms-formelement npm run pa11y-ci
```
