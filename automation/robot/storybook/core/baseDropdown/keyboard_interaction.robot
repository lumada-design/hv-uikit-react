*** Setting ***
Resource         _resources.resource
Test Setup       open basedropdown sample    with-content
Force Tags       keyboard
Documentation    https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-6


*** Test Cases ***
drop options when dropdown is focused and is pressed ENTER after an ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${container}
    Press Keys                           None           ESCAPE
    Wait Until Element Is not Visible    ${container}
    Press Keys                           None           ENTER
    Wait Until Element Is Visible        ${container}

close dropdown when is pressed ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${container}
    Press Keys                           None           ESCAPE
    Wait Until Element Is not Visible    ${container}
