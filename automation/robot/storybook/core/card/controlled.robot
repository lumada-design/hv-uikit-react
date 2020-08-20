*** Setting ***
Force Tags  v3
Resource    ../_keywords.resource
Variables         variables.yaml


*** Test Cases ***
controlled card selection by switch
  Go To                             ${tests}card--all-components
  Wait Until Element Is Enabled     ${checkbox}
  Checkbox Should Not Be Selected   ${checkbox}
  Click Element                     controller
  Checkbox Should Be Selected       ${checkbox}
