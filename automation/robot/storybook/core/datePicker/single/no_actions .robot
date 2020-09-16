*** Setting ***
Resource         ../_datePicker.resource
Test Setup       Open DatePicker sample    default-value
Documentation    Use Cases:
...              1. If there are no actions
...              - Click outside closes and apply selection (note: spec has bug and need update)
...              - Selecting a date, closes the date picker and selects the chosen date
...              2. Allows selection of a single date
...              3. If no buttons are used, the onChange should be triggered on date click
Force Tags       v3


*** Test Cases ***
close and apply selection when mouse pick a day
    [Setup]    Open DatePicker sample    with-value-change
    Click Element                        ${day}\[8]
    Wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    4 Jan 2020

close and apply selection selection when input date and click outside
    Force input                          ${input}    12/07/1982
    Click Element                        css:body
    Wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    7 Dec 1982

close and apply selection when pressed ENTER
    [Tags]    keyboard
    Force input                          ${input}    01/09/1970
    Press Keys                           NONE    ENTER
    Wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    9 Jan 1970

close and apply selection when header is clicked
    Force input                          ${input}    12/07/1982
    Click Element                        ${datePickerHeader}
    Element Text Should Be               ${datePickerHeader}    7 Dec 1982

close and apply selection when mouse pick selected date
    Click Element                        ${daySelected}
    Wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    10 Oct 2020

Close and ignore selection when pressed ESCAPE
    [Tags]    keyboard
    ${date}    Get Text                  ${datePickerHeader}
    Force input                          ${input}    07/12/1982
    Press Keys                           ${input}    ESCAPE
    Wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    ${date}
