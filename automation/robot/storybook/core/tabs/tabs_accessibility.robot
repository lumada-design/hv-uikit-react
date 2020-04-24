*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-tabs--


*** Test Cases ***
Storybook sample tabs against WCAG2AA standard                   ${url}main
Storybook sample tabs with disabled against WCAG2AA standard     ${url}text-size
