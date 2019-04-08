# Contribution guidelines

- [Contribution guidelines](#contribution-guidelines)
  - [Setup](#setup)
  - [Bugs](#bugs)
  - [Feature Requests](#feature-requests)
  - [Submission Guidelines](#submission-guidelines)
    - [Submitting an Issue](#submitting-an-issue)
    - [Submitting a Merge Request](#submitting-a-merge-request)
  - [Coding Standards](#coding-standards)
    - [Style Guide](#style-guide)
    - [Linting](#linting)
  - [Commit Message Guidelines](#commit-message-guidelines)
  - [Testing](#testing)

## Setup
1. For the time being the UI Kit lives in a private GitLab repository, so the first step is to create your personal account on our [GitLab](https://10.76.48.133/).

2. You need to ask to be added as a project member to be able to contribute. Please use **#ui-kit** slack channel on the hitachivantara-eng workspace: https://hitachivantara-eng.slack.com/messages/CFY74GK6G

3. Fork the project by navigating to the main [repository]((https://github.com/pentaho/hv-uikit-react)) and clicking the **Fork** button.
   
## Bugs

If you find a bug in the source code, you can help us by [submitting an issue]((https://github.com/pentaho/hv-uikit-react/issues)) to this repo. Even better you can submit a Merge Request with a fix.

## Feature Requests

You can request a new feature by submitting an issue to this repo.
Features can be **new patterns** or changes to **existing patterns**.
Please make sure your features are compliant with the [Design System](https://hitachivantara.sharepoint.com/sites/DesignSystem/SitePages/Home.aspx) guidelines.

## Submission Guidelines

### Submitting an Issue

Before you submit your issue, search the repository. Maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue. Help us to maximize the effort we can spend fixing issues and adding new features, by not reporting duplicate issues.

### Submitting a Merge Request

1. Pull the latest master branch.

2. Always work and submit merge requests from a branch. _Do not submit merge requests from the `master` branch of your fork_.

   ```
   $ git checkout -b { YOUR_BRANCH_NAME } master
   ```

3. Make sure you follow our [coding standards](#coding-standards).

4. Test your branch and add new test cases where appropriate per the [testing guidelines](#testing).

5. Once ready for feedback from other contributors and maintainers, **push your commits to your fork**:

   ```
   $ git push origin { YOUR_BRANCH_NAME }
   ```
6. Please create a merge request using the following format: `#[issue number] - pattern name`
7. Maintainers will be reviewing your work and making comments, asking questions and suggesting changes to be made before they merge your code.
8. Once all revisions to your merge request are complete, a maintainer will squash and merge your commits for you.

**That's it! Thank you for your contribution!**

## Coding Standards

Please follow the coding style of the project. We use eslint, so if possible, enable linting in your editor to get real-time feedback. The linting rules can be run manually with the following command npm run lint.

Finally, when you submit a pull request, they are run again by Jenkins, but hopefully by then your code is already clean!

### Style Guide

For a set of basic rules and guidelines for developing React components, see [here](https://github.com/airbnb/javascript/tree/master/react#basic-rules).

Feel free to edit/write components in your own style but be wary that we may ask you to make changes while reviewing your merge request.

### Linting

We enforce some style rules for code in this repository using [eslint](http://eslint.org/). You can install a linting addon to a lot of editors and IDEs that will follow our linting rules.

If you decide to not install a linter addon, or cannot, you can run `npm run lint` to get a report of any style issues. Any issues not fixed will be caught during CI, and will prevent merging.

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history. But also, we use the git commit messages to generate the change log.

More information about this format can be found in https://www.conventionalcommits.org/en/v1.0.0-beta.3/


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
