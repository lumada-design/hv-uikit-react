*** Setting ***
Resource      _resources.resource
Test Setup    Run Keywords
...           Go To    ${patterns}dropdown--multi-selection    AND
...           Wait Until Element Is Enabled    ${dropdown}
Force Tags    keyboard    v3


*** Test Cases ***
drop options when dropdown is focused and is pressed ENTER after an ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${options}
    Press Keys                           None    ESCAPE
    Wait Until Element Is not Visible    ${options}
    Press Keys                           None    ENTER
    Wait Until Element Is Visible        ${options}

close dropdown when is pressed ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${options}
    Press Keys                           None    ESCAPE
    Wait Until Element Is not Visible    ${options}

cancel dropdown selection when is pressed ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${options}
    Click Element                        ${option1}
    Element Attribute Value Should Be    ${option1}    aria-selected    true
    Press Keys                           None     ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${options}
    Element Attribute Value Should Be    ${option1}    aria-selected    false

move focus through component using TAB
    Click Element                    ${dropdown}
    Press Keys                       None     TAB    TAB    TAB
    Element Should Be Focused        ${buttonApply}

move focus to cancel button when focus is on apply button and is pressed TAB
    Click Element                    ${dropdown}
    Wait Until Element Is Visible    ${option4}
    set focus and press keys         ${buttonApply}     TAB
    Element Should Be Focused        ${buttonCancel}
