*** Setting ***
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Cases ***
simple checkbox                   ${components}selectors-checkbox--main
checkbox with label and events    ${components}selectors-checkbox--with-click-action
