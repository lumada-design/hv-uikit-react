*** Setting ***
Resource         ../_datePicker.resource
Test Template    verify date when it is inserted distinct formats
Documentation    Use Cases:
...              - Date input can be typed without special characters
...              - Dates can be typed and if valid applied to the calendar


*** Test Cases ***         INPUT
format m d yy              7 5 12
format m dd yy             7 05 12
format mm d yyyy           07 5 2012
format mm dd yyyy          07 05 2012
format mmddyy              070512
format mm-dd-yy            07-05-12
format dots on mm dd yy    07.05.12
format mm\\dd\\yy          07\\05\\12
format mm/dd/yy            07/05/12

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
    Element Attribute Value Should Be    ${input}    value    5 Jul 2012
