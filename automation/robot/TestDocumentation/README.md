## How extract Test data documentation 

http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#test-data-documentation-tool-testdoc

## How Test Cases are catalogued 

| tag                    | description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| distinct               | distinct behavior between browsers not supported by UIKIT                           |
| bug-ie                 | bug in Internet Explorer                                                            |
| bug-firefox            | bug in last supported Firefox                                                       |
| bug-chrome             | bug in last supported Chrome                                                        |
| bug-ie-webdriver       | bug in selenium webdriver for that browser                                          |
| bug-firefox-webdriver  | bug in selenium webdriver for that browser                                          |
| bug-chrome-webdriver   | bug in selenium webdriver for that browser                                          |
| bug-jenkins            | bugs just when executing via/by jenkins                                             |
| issue                  | unknown error to be investigated                                                    |
| pa11y                  | accessibility tests with pa11y command                                              |
| keyboard               | keyboard interaction tests ( https://www.w3.org/TR/wai-aria-practices )             |
| wai-aria-practices     | WAI-ARIA Roles, States, and Properties ( https://www.w3.org/TR/wai-aria-practices ) |
| smoke                  | smoke tests                                                                         |
| responsive             | responsive tests (resize windows)                                                   |
| run-any-way            | run any way the issue to verify if the error is the expected or if is already fixed |
| run-any-way-${browser} | as the same of above but referencing a specific browser where the issue occur       |
