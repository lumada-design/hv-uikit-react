# Contribution guidelines

We welcome contributions to our project. Here are a few guidelines that will help you along the way:

  - [Question or Problem?](#question-or-problem)
  - [New components](#new-components)
  - [Bugs](#bugs)
  - [Feature Requests](#feature-requests)
  - [Submission Guidelines](#submission-guidelines)
    - [Submitting an Issue](#submitting-an-issue)
    - [Submitting a Pull Request](#submitting-a-pull-request)
  - [Coding Standards](#coding-standards)
    - [Style Guide](#style-guide)
    - [Linting](#linting)
  - [Commit Message Guidelines](#commit-message-guidelines)
  - [Testing](#testing)
  
## Question or Problem?
Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. 
Please use **#ui-kit** slack channel on the [hitachivantara-eng workspace](https://hitachivantara-eng.slack.com/messages/CFY74GK6G).

## New component
When contributing with a new component, please add it to the **lab** in `packages/lab/src/<YOUR_COMPONENT>`

In order to make your component available in the Storybook you also need to add:
- A **story** in `packages/doc/stories/03-lab/<YOUR_STORY>.js`
- A **sample** in `packages/doc/sample/lab/<YOUR_SAMPLE>.js`

Too much work? We provide a generator that helps to scaffold all of this.

```
npm run generate
```

## Bugs
If you find a bug in the source code, you can help us by [submitting an issue]((#submitting-an-issue)) to this repo.
Even better you can [submit a Pull Request](#submitting-a-pull-request) with a fix.

## Feature Requests

You can request a new feature by [submitting an issue]((#submitting-an-issue)) to this repo.
Features can be **new components** or changes to **existing**.

Please make sure your features are compliant with the [Design System](https://hitachivantara.sharepoint.com/sites/DesignSystem/SitePages/Home.aspx) guidelines.

## Submission Guidelines

### Submitting an Issue
You can file new issues by selecting from our [new issue templates](https://github.com/pentaho/hv-uikit-react/issues/new/choose) and filling out the issue template. 
Before you submit your issue, search the repository, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, [open a new issue]((https://github.com/pentaho/hv-uikit-react/issues)). 
Help us to maximize the effort we can spend fixing issues and adding new features, by not reporting duplicate issues.

### Submitting a Pull Request
Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.

#### Branch Structure
All stable releases are tagged ([view tags](https://github.com/pentaho/hv-uikit-react/tags)). At any given time, `alpha` represents the latest development version of the library.
All contributions should target `alpha` branch. Maintainers wil be responsible to port changes to `master`.

#### Setup
1. Pull the latest `alpha` branch.  
2. Always work and submit pull requests from a branch:
   ```
   $ git checkout -b { YOUR_BRANCH_NAME } alpha
   ```
3. Make sure you follow our [coding standards](#coding-standards), and add new test cases where appropriate following the [testing guidelines](#testing).
4. Commit your changes using a descriptive commit message that follows our [commit message guidelines](#commit-message-guidelines). 
5. Once ready for feedback from other contributors and maintainers, push your commits to your fork:
   ```
   $ git push origin { YOUR_BRANCH_NAME }
   ```
6. Please send a pull request to `alpha` using the following format:
   ```
   #[issue number] - pattern name
   ```

Maintainers will be reviewing your work and making comments, asking questions and suggesting changes to be made before they merge your code.
Once all revisions to your merge request are complete, a maintainer will squash and merge your commits for you.

**That's it! Thank you for your contribution!**

## Coding Standards

### Style Guide

For a set of basic rules and guidelines for developing React components, see [here](https://github.com/airbnb/javascript/tree/master/react#basic-rules).
Feel free to edit/write components in your own style but be wary that we may ask you to make changes while reviewing your merge request.

### Linting

We enforce some style rules for code in this repository using [eslint](http://eslint.org/). You can install a linting addon to a lot of editors and IDEs that will follow our linting rules.
If you decide to not install a linter addon, or cannot, you can run `npm run lint` to get a report of any style issues. 

Any issues not fixed will be caught during CI, and will prevent merging.

## Commit Message Guidelines

We enforce [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) specs over how our git commit messages should be formatted. This leads to more readable messages that are easy to follow when looking through the project history. But also, we use the git commit messages to generate the change log.

Commits must be prefixed with a `type` in order to communicate intent, an optional `scope` may be provided after a type.

### Type
Must be one of the following:

- `feat:` a feature that is visible for end users.
- `fix:` a bugfix that is visible for end users.
- `chore:` a change that doesn't impact end users (e.g. chances to CI pipeline)
- `docs:` a change on the documentation
- `refactor:` a change in production code focused on readability, style and/or performance.
- Others commit types are allowed, for example: `style:`, `perf:`, `test:`.

Samples:
```
docs: correct spelling of CHANGELOG
```
```
feat(lang): added polish language
```
```
fix: minor typos in code, fixes issue #12
```



## Testing

If you add any features to our code, make sure to add tests so that your changes are covered. Tests are written using [JEST](https://github.com/facebook/jest). You can see how well your code is covered by looking at the `coverage/lcov-report/index.html` file after running the coverage command.

Test your changes by running our test commands:

- Run unit tests and generate code coverage report (stored in `coverage` folder):

  ```
  npm run test
  ```

- Watching unit tests:

  ```
  npm run test:watch
  ```