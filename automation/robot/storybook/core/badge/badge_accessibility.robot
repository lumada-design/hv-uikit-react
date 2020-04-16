*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-badge--


*** Test Cases ***
storybook sample badgesimple against standard      ${url}main
storybook sample badgewithicon against standard    ${url}with-icon
storybook sample badgewithtext against standard    ${url}with-text
