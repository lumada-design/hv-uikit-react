*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}     ${STORYBOOK_URL}/iframe.html?id=coretextarea--


*** Test Cases ***
storybook sample textarea limited against WCAG2AA standard      ${url}textarealimit