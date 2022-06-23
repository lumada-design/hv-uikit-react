*** Setting ***
Resource         ../_datePicker.resource
Test Setup       Open DatePicker sample    with-actions
Documentation    Use Cases:
...              - Can be focused and opened
Force Tags       keyboard


*** Test Cases ***
open and focus inside calendar when is focused and is pressed SPACE
    [Setup]    NONE
    Go To                             ${inputs}date-picker--main
    Wait Until Element Is Visible     ${datePickerHeader}
    Press Keys                        ${datePickerHeader}    SPACE
    Wait Until Element Is Visible     ${calendar}

open and focus inside calendar when press ENTER
    [Setup]    NONE
    Go To                             ${inputs}date-picker--with-actions
    Wait Until Element Is Visible     ${datePickerHeader}
    Press Keys                        ${datePickerHeader}    ENTER
    Wait Until Element Is Visible     ${calendar}

close when calendar is focused and is pressed ESCAPE
    Press Keys                           NONE    ESCAPE
    Wait Until Element Is Not Visible    ${calendar}

TAB sequence
    Repeat Keyword                      9 times
    ...    Press Keys                   NONE    TAB
    Wait Until Page Contains Element    ${cancel}:focus

TAB sequence when is pressed selector button
    set focus and press keys           ${year+}    ENTER
    Repeat Keyword                     3 times
    ...    Press Keys                  NONE    TAB
    Wait Until Page Contains Element   ${cancel}:focus

SHIFT-TAB sequence from Cancel to Apply
    [Tags]    bug-ie-webdriver
    # bug-ie-webdriver focus goes to unknown div
    # <div tabindex="0" class="focus-visible" data-focus-visible-added=""></div>
    set focus and press keys            ${apply}    TAB
    Wait Until Page Contains Element    ${cancel}:focus
    Press keys                          NONE    SHIFT+TAB
    Wait Until Page Contains Element    ${apply}:focus
