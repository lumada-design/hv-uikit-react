*** Setting ***
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Cases ***
badge simple       ${components}badge--main
badge with icon    ${components}badge--with-icon
badge with text    ${components}badge--with-text
