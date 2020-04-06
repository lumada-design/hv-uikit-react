## How extract Test data documentation

http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#test-data-documentation-tool-testdoc

## How Test Cases are catalogued

### by errors:

| tag                | description                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| smoke              | smoke tests                                                                         |
| distinct           | distinct behavior between browsers not supported by UIKIT                           |
| responsive         | responsive tests (resize windows)                                                   |
| pa11y              | accessibility tests with pa11y command                                              |
| keyboard           | keyboard interaction tests ( https://www.w3.org/TR/wai-aria-practices )             |
| wai-aria-practices | WAI-ARIA Roles, States, and Properties ( https://www.w3.org/TR/wai-aria-practices ) |

### just by errors:

| tag                            | description                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| bug-\${browser}                | bug on that specific browser ex( bug-ie )                                           |
| bug-\${browser}-webdriver      | selenium webdriver bug on that specific browser ex( bug-ie-webdriver )              |
| run-any-way                    | run any way the issue to verify if the error is the expected or if is already fixed |
| run-any-way-\${browser}        | as the same of above but referencing a specific browser where the issue occur       |
| bug-infrastructure             | infrastructure issues for all browsers (locally are correct/passing)                |
| bug-infrastructure-\${browser} | infrastructure bug on specific browser (locally are correct/passing)                |
| issue                          | unknown error to be investigated                                                    |
| issue-\${browser}              | unknown error to be investigated on that browser                                    |

### browser supported:

\${browser} [ie, firefox, chrome, safari]
