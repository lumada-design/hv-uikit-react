*** Setting ***
Resource          _resources.resource
Suite Setup       open storybook
Test Setup        Run Keywords
...               Go To    ${components}dropdown--multi-selection    AND
...               Wait Until Element Is Enabled    ${dropdown}
Suite Teardown    Close Browser
Force Tags        smoke     keyboard


*** Test Cases ***
drop options when dropdown is focused and is pressed ENTER after an ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${options}
    Press Keys                           None           ESCAPE
    Wait Until Element Is not Visible    ${options}
    Press Keys                           None           ENTER
    Wait Until Element Is Visible        ${options}

close dropdown when is pressed ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${options}
    Press Keys                           None           ESCAPE
    Wait Until Element Is not Visible    ${options}

cancel dropdown selection when is pressed ESCAPE
    Click Element                        ${dropdown}
    Click Element                        ${option1}
    Element Attribute Value Should Be    ${option1}     aria-selected    true
    set focus and press keys             ${dropdown}    ESCAPE
    Click Element                        ${dropdown}
    Element Attribute Value Should Be    ${option1}     aria-selected    false

move focus to apply button when focus is on last option and is pressed TAB
    Click Element                    ${dropdown}
    Wait Until Element Is Visible    ${option4}
    set focus and press keys         ${option4}        TAB
    Element Should Be Focused        ${buttonApply}

move focus to cancel button when focus is on apply button and is pressed TAB
    Click Element                    ${dropdown}
    Wait Until Element Is Visible    ${option4}
    set focus and press keys         ${buttonApply}     TAB
    Element Should Be Focused        ${buttonCancel}
