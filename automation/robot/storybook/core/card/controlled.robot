*** Setting ***
Resource    ../_keywords.resource
Variables         variables.yaml


*** Test Cases ***
controlled card selection by switch
  Go To                             ${tests}card--controlled
  Wait Until Element Is Enabled     controller
  Checkbox Should Not Be Selected   ${Checkbox}
  Click Element                     controller
  Checkbox Should Be Selected       ${Checkbox}
