*** Setting ***
Variables         ../../../_resources/storybook_variables.yaml
Resource          ../../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=core-new-vertical-navigation--


*** Test Cases ***
Static vertical navigation against WCAG2AA standard      ${url}static
Collapse vertical navigation against WCAG2AA standard    ${url}collapsable
