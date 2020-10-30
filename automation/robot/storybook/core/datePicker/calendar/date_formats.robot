*** Setting ***
Resource         ../_datePicker.resource
Test Template    verify date when it is inserted distinct formats
Library          String
Documentation    Use Cases:
...              - Date input can be typed without special characters
...              - Dates can be typed and if valid applied to the calendar


*** Test Cases ***           INPUT
#format m d yy               7 5 12        not supported by ie
#format m dd yy              7 05 12       not supported by ie
#format mm d yyyy            07 5 2012     not supported by ie
#format mm dd yy             07 05 12      not supported by ie
format mm dd yyyy            07 05 2012
#format mm-dd-yy             07-05-12      not supported by firefox
#format dots on mm dd yy     07.05.12      not supported by firefox
#format slash mm dd yy       07/05/12      not supported by ie
format slash mm dd yyyy      07/05/2012


*** Keywords ***
verify date when it is inserted distinct formats
    [Documentation]   verify if focus moves ${from} an element ${to} other element
    ...               when is pressed TAB
    [Arguments]    ${format}
    Go To                            ${tests}calendar--single-date
    Wait Until Element Is Enabled    ${input}
    force input                      ${input}    ${format}
    Press Keys                       NONE    ENTER
    wait until input has value       ${input}    5 Jul 2012
