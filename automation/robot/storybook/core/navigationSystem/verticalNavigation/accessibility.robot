*** Setting ***
Resource         ../../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${components}navigation-system-vertical-navigation--


*** Test Cases ***
Static vertical navigation     ${url}main
Collapse vertical navigation   ${url}collapsable
