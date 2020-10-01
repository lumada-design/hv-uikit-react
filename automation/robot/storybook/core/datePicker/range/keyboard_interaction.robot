*** Setting ***
Resource         ../_datePicker.resource
Test Setup       open datePicker sample    range-mode
Documentation    Use Cases:
...              - Can be focused and opened
Force Tags       v3    keyboard


*** Test Cases ***
open and focus inside calendar when is focused and is pressed SPACE
    [setup]   NONE
    Go To                             ${forms}date-picker--range-mode
    Wait Until Element Is Visible     ${datePickerHeader}
    Press Keys                        ${datePickerHeader}    SPACE
    Wait Until Element Is Visible     ${calendar}

open and focus inside calendar when press ENTER
    [setup]   NONE
    Go To                             ${forms}date-picker--range-mode
    Wait Until Element Is Visible     ${datePickerHeader}
    Press Keys                        ${datePickerHeader}    ENTER
    Wait Until Element Is Visible     ${calendar}

close when calendar is focused and is pressed ESCAPE
    Press Keys                           NONE    ESCAPE
    Wait Until Element Is Not Visible    ${calendar}

TAB sequence
    Repeat Keyword               16 times
    ...    Press Keys            NONE    TAB
    Element Should Be Focused    ${cancel}

SHIFT-TAB sequence from Cancel to Apply
    set focus and press keys     ${cancel}    SHIFT+TAB
    Element Should Be Focused    ${apply}
