*** Setting ***
Variables         ../../../_resources/storybook_variables.yaml
Resource          ../../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-navigation-system-vertical-navigation--


*** Test Cases ***
Static vertical navigation against WCAG2AA standard      ${url}main
Collapse vertical navigation against WCAG2AA standard    ${url}collapsable
