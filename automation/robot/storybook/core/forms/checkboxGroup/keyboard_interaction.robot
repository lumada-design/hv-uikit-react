*** Setting ***
Resource        _checkboxgroup.resource
Force Tags      keyboard    v3


*** Test Cases ***
iteratable by tab when is readonly
    open checkbox group sample    read-only
    Press Keys                    ${label}    TAB
    Element Should Be Focused     ${all} input
    Press Keys                    NONE    TAB
    Element Should Be Focused     ${checkbox2} input
    Press Keys                    NONE    TAB
    Element Should Be Focused     ${checkbox3} input
    Press Keys                    NONE    TAB
    Element Should Be Focused     ${checkbox4} input

select and unselect all when press SPACE
    open checkbox group sample         main
    Press Keys                         ${label}    TAB    SPACE
    Checkbox Should Be Selected        ${all} input
    Press Keys                         NONE    SPACE
    Checkbox Should Not Be Selected    ${all} input

select and unselect checkbox when press SPACE
    open checkbox group sample          main
    Press Keys                         ${label}    TAB    TAB    SPACE
    Checkbox Should Be Selected        ${checkbox2} input
    Press Keys                         NONE    SPACE
    Checkbox Should Not Be Selected    ${checkbox2} input
