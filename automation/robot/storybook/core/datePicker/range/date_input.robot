*** Setting ***
Resource         ../_datePicker.resource
Test Setup       Open DatePicker sample     range-mode
Documentation    Use Cases:
...              - Date picker header should display the date selected or the range,
...                even if it is still being picked


*** Test Cases ***
input both dates
    Force input                          ${calendarLeft} input    12 07 1982
    Press Keys                           NONE    TAB
    Force input                          ${calendarRight} input   01 01 2000
    Press Keys                           NONE    TAB
    Element Attribute Value Should Be    ${calendarLeft} input    value    7 Dec 1982
    Element Attribute Value Should Be    ${calendarRight} input   value    1 Jan 2000
    Element Should Contain               ${datePickerHeader}      7 Dec 1982 - 1 Jan 2000

just start date
    Force input                          ${calendarLeft} input    12 07 1982
    Press Keys                           NONE    TAB
    Element Attribute Value Should Be    ${calendarLeft} input    value    7 Dec 1982
    Element Should Contain               ${datePickerHeader}      7 Dec 1982

just end date
    Force input                          ${calendarRight} input    01 01 2000
    Press Keys                           NONE    TAB
    Element Attribute Value Should Be    ${calendarRight} input    value    1 Jan 2000
    Element Attribute Value Should Be    ${calendarLeft} input     value    ${empty}
    Element Should Contain               ${datePickerHeader}       Select a range

end is previous than start
    Force input                          ${calendarLeft} input     01 01 2000
    Press Keys                           NONE    TAB
    Force input                          ${calendarRight} input    12 07 1982
    Press Keys                           NONE    TAB
    Element Attribute Value Should Be    ${calendarLeft} input     value    1 Jan 2000
    Element Attribute Value Should Be    ${calendarRight} input    value    1 Jan 2000
    Element Text Should Be               ${datePickerHeader}       1 - 1 Jan 2000

start is forward than end
    Force input                          ${calendarLeft} input     01 01 1980
    Press Keys                           NONE    TAB
    Force input                          ${calendarRight} input    12 07 1982
    Press Keys                           NONE    TAB
    Force input                          ${calendarLeft} input     01 01 2000
    Press Keys                           NONE    TAB
    Element Attribute Value Should Be    ${calendarLeft} input     value    7 Dec 1982
    Element Attribute Value Should Be    ${calendarRight} input    value    7 Dec 1982
    Element Text Should Be               ${datePickerHeader}       7 - 7 Dec 1982

input start date and pick end date
    Force input                          ${calendarLeft} input     12 07 1982
    Press Keys                           NONE  ENTER
    Click Element                        ${day}\[50]
    Element Attribute Value Should Be    ${calendarRight} input    value    2 Jan 1983
    Element Text Should Be               ${datePickerHeader}       7 Dec 1982 - 2 Jan 1983
