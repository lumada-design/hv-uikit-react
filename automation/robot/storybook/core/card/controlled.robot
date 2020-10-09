*** Setting ***
Resource    _resources.resource


*** Test Cases ***
controlled card selection by switch
  Go To                             ${components}card--all-components
  Wait Until Element Is Enabled     ${checkbox}
  Checkbox Should Not Be Selected   ${checkbox}
  Click Element                     controller
  Checkbox Should Be Selected       ${checkbox}
