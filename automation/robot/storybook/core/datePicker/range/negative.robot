*** Setting ***
Resource      ../_datePicker.resource
Test Setup    Open DatePicker sample    range-with-values


*** Test Cases ***
pick end date previous of start date
    [Documentation]    override start date
    Click Element                   ${day}\[32]
    wait until element has value    ${calendarLeft} input    31 Jul 2019
    Click Element                   ${day}\[44]
    wait until element has value    ${calendarLeft} input   29 Jul 2019
    wait until element has value    ${calendarRight} input   29 Jul 2019
    Element Text Should Be          ${datePickerHeader}    29 Jul 2019

Apply an empty date
    [Setup]    Open DatePicker sample    range-mode
    Click Button              Apply
    Element Text Should Be    ${datePickerHeader}    Select a range

input end date previous of start date
    [Documentation]    restore previous date
    wait until element has value    ${calendarLeft} input    5 Jul 2019
    Force input                     ${calendarRight} input    12 07 1982
    Press Keys                      NONE    TAB
    wait until element has value    ${calendarLeft} input    5 Jul 2019
    wait until element has value    ${calendarRight} input   5 Jul 2019
    Element Text Should Be          ${datePickerHeader}    5 - 5 Jul 2019

replace date in wrong format
    [Documentation]    restore previous date
    wait until element has value    ${calendarLeft} input    5 Jul 2019
    wait until element has value    ${calendarRight} input    10 Jul 2019
    Force input                     ${calendarRight} input    22 02 2020
    Press Keys                      NONE    TAB
    wait until element has value    ${calendarLeft} input    5 Jul 2019
    wait until element has value    ${calendarRight} input    10 Jul 2019

input invalid format
    [Documentation]
    ...    - does not convert or save the inserted value, just keep it on input
    ...    - complementary tests at datePicker\calendar\date_formats.robot
    [Setup]    Open DatePicker sample    range-mode
    Force input                     ${calendarLeft} input    22 02 2020
    Force input                     ${calendarRight} input    22 02 2020
    wait until element has value    ${calendarLeft} input    22 02 2020
    wait until element has value    ${calendarRight} input    22 02 2020
    Element Text Should Be          ${datePickerHeader}    Select a range
    Click Button                    Apply
    Element Text Should Be          ${datePickerHeader}    Select a range

try clean input date
    [Documentation]    restore previous date
    wait until element has value    ${calendarLeft} input    5 Jul 2019
    wait until element has value    ${calendarRight} input    10 Jul 2019
    Force input                     ${calendarRight} input    ${empty}
    Press Keys                      NONE    TAB
    wait until element has value    ${calendarLeft} input    5 Jul 2019
    wait until element has value    ${calendarRight} input    10 Jul 2019
