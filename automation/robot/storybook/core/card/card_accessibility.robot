*** Setting ***
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Cases ***
selectable card       ${components}card--selectable
no selectable card    ${components}card--all-components
