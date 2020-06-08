*** Setting ***
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Cases ***
icon checked switch    ${components}selectors-switch--no-change
disables switch        ${components}selectors-switch--disabled
