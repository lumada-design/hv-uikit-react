*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-selectors-switch--


*** Test Cases ***
icon checked switch against WCAG2AA standard    ${url}no-labels
disables switch against WCAG2AA standard        ${url}disabled
