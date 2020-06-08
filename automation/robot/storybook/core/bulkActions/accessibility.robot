*** Setting ***
Resource         ../../_resources/accessibility.robot
Resource         _bulkActions.resource
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Cases ***
bulk actions sample    ${components}bulk-actions--controlled-with-actions
