*** Setting ***
Resource      _input.resource
Test Setup    Go To    ${tests}input--controlled-state


*** Test Cases ***
present and clear warning when controlled by outside
    Wait Until Element Is Visible    ${input}
    Element Should Not Be Visible               ${warning}
    click Button                                Error
    Element Should be visible                   ${warning}
    click Button                                Clear
    Element Should Not Be Visible               ${warning}


*** Variables ***
${input}      css:input[type=text]
${warning}    css:#validation-error
