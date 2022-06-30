*** Setting ***
Resource         _dropDown.resource
Test Setup       open dropdown sample    ${inputs}    multi-selection
Force Tags       keyboard
Documentation    https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-6


*** Test Cases ***
drop options when dropdown is focused and is pressed ENTER after an ESCAPE
    Press Keys                           None    ESCAPE
    Wait Until Element Is not Visible    ${options}
    Press Keys                           None    ENTER
    Wait Until Element Is Visible        ${options}

close dropdown when is pressed ESCAPE
    Press Keys                           None    ESCAPE
    Wait Until Element Is not Visible    ${options}

cancel dropdown selection when is pressed ESCAPE
    Click Element                        ${option}(1)
    Element Attribute Value Should Be    ${option}(1)    aria-selected    true
    Press Keys                           None     ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${options}
    Element Attribute Value Should Be    ${option}(1)    aria-selected    false

move focus through component using TAB
    Press Keys                       None     TAB    TAB    TAB
    Element Should Be Focused        ${buttonApply}

move focus to cancel button when focus is on apply button and is pressed TAB
    set focus and press keys         ${buttonApply}     TAB
    Element Should Be Focused        ${buttonCancel}
