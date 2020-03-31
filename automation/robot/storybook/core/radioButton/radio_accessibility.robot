*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--


*** Test Cases ***
radio button with state management against WCAG2AA standard    ${url}radiobuttonstate
