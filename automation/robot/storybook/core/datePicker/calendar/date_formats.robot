*** Setting ***
Resource         ../_datePicker.resource
Test Template    verify date when it is inserted distinct formats
Documentation    Use Cases:
...              - Date input can be typed without special characters
...              - Dates can be typed and if valid applied to the calendar
Force Tags       v3


*** Test Cases ***      INPUT
format m d yy           8 5 20
format m dd yy          8 05 20
format mm d yyyy        08 5 2020
format mm dd yyyy       08 05 2020
format mmddyy           080520
format mm-dd-yy         08-05-20
format mm.dd.yy         08.05.20
format mm\\dd\\yy       08\\05\\20
format mm/dd/yy         08/05/20

invalid format
    [Template]    NONE
    [Documentation]    shows "Invalid Date"
    Go To                                ${components}calendar--single-date
    Wait Until Element Is Enabled        ${input}
    force input                          ${input}    999999
    Press Keys                           NONE    ENTER
    Element Attribute Value Should Be    ${input}    value    Invalid Date


*** Keywords ***
verify date when it is inserted distinct formats
    [Documentation]   verify if focus moves ${from} an element ${to} other element
    ...               when is pressed TAB
    [Arguments]    ${format}
    Go To                                ${components}calendar--single-date
    Wait Until Element Is Enabled        ${input}
    force input                          ${input}    ${format}
    Press Keys                           NONE    ENTER
    Element Attribute Value Should Be    ${input}    value    5 Aug 2020
