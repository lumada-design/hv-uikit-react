*** Setting ***
Resource      ../_datePicker.resource
Test Setup    Open DatePicker sample    range-with-values


*** Test Cases ***
pick end date previous of start date
    [Documentation]    override start date
    Click Element                 ${day}\[32]
    wait until input has value    ${calendarLeft} input    31 Jul 2019
    Click Element                 ${day}\[44]
    wait until input has value    ${calendarLeft} input   29 Jul 2019
    wait until input has value    ${calendarRight} input   29 Jul 2019
    Element Text Should Be        ${datePickerHeader}    29 Jul 2019

Apply an empty date
    [Setup]    Open DatePicker sample    range-mode
    Click Button              Apply
    Element Text Should Be    ${datePickerHeader}    Select a range

input end date previous of start date
    [Documentation]    restore previous date
    wait until input has value    ${calendarLeft} input    5 Jul 2019
    Force input                   ${calendarRight} input    12 07 1982
    Press Keys                    NONE    TAB
    wait until input has value    ${calendarLeft} input    5 Jul 2019
    wait until input has value    ${calendarRight} input   5 Jul 2019
    Element Text Should Be        ${datePickerHeader}    5 - 5 Jul 2019

replace date in wrong format
    [Documentation]    restore previous date
    wait until input has value    ${calendarLeft} input     5 Jul 2019
    wait until input has value    ${calendarRight} input    10 Jul 2019
    Force input                   ${calendarLeft} input     02/22/2020
    Press Keys                    NONE    TAB
    wait until input has value    ${calendarLeft} input     10 Jul 2019
    wait until input has value    ${calendarRight} input    10 Jul 2019

try clean input date
    [Documentation]    restore previous date
    wait until input has value    ${calendarLeft} input    5 Jul 2019
    wait until input has value    ${calendarRight} input    10 Jul 2019
    Force input                   ${calendarRight} input    ${empty}
    Press Keys                    NONE    TAB
    wait until input has value    ${calendarLeft} input    5 Jul 2019
    wait until input has value    ${calendarRight} input    10 Jul 2019
