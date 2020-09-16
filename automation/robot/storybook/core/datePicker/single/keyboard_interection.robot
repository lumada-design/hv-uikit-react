*** Setting ***
Resource         ../_datePicker.resource
Test Setup       Open DatePicker sample    with-actions
Documentation    Use Cases:
...              - Can be focused and opened
Force Tags       v3     keyboard


*** Test Cases ***
open and focus inside calendar when is focused and is pressed SPACE
    [Setup]    NONE
    Go To                             ${patterns}date-picker--main
    Wait Until Element Is Visible     ${datePickerHeader}
    Press Keys                        ${datePickerHeader}    SPACE
    Wait Until Element Is Visible     ${calendar}

open and focus inside calendar when press ENTER
    [Setup]    NONE
    Go To                             ${patterns}date-picker--with-actions
    Wait Until Element Is Visible     ${datePickerHeader}
    Press Keys                        ${datePickerHeader}    ENTER
    Wait Until Element Is Visible     ${calendar}

close when calendar is focused and is pressed ESCAPE
    Press Keys                           NONE    ESCAPE
    Wait Until Element Is Not Visible    ${calendar}

TAB sequence
    Repeat Keyword               49 times
    ...    Press Keys            NONE    TAB
    Element Should Be Focused    ${cancel}

TAB sequence when is pressed selector button
    set focus and press keys     ${year+}    ENTER
    Repeat Keyword               49 times
    ...    Press Keys            NONE    TAB
    Element Should Be Focused    ${cancel}

SHIFT-TAB sequence from Cancel to Apply
    set focus and press keys     ${cancel}    SHIFT+TAB
    Element Should Be Focused    ${apply}
