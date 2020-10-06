*** Setting ***
Resource      _resources.resource
Test Setup    Run Keywords
...           Go To    ${components}base-dropdown--with-content
...           AND    Wait Until Element Is Enabled    ${dropdown}
Force Tags    keyboard


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
