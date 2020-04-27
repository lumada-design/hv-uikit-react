*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-asset-inventory--


*** Test Cases ***
asset inventory card view against WCAG2AA standard    ${url}accessibility
asset inventory list view against WCAG2AA standard    ${url}accessibility-list
