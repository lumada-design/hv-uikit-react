*** Setting ***
Resource    _resources.resource
Force Tags  v3


*** Test Cases ***
controlled card selection by switch
  Go To                             ${patterns}card--all-components
  Wait Until Element Is Enabled     ${checkbox}
  Checkbox Should Not Be Selected   ${checkbox}
  Click Element                     controller
  Checkbox Should Be Selected       ${checkbox}
