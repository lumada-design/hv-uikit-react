*** Setting ***
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Cases ***
multiple selection list    ${components}list--multi-selection-with-select-all
single selection list      ${components}list--single-selection-with-icon
