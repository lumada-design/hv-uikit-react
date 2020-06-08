*** Setting ***
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y
Documentation    WCAG2AA standard


*** Test Cases ***
card view    ${components}asset-inventory--main
list view    ${components}asset-inventory--list-view--main