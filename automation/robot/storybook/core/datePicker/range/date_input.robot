*** Setting ***
Resource         ../_datePicker.resource
Test Setup       Open DatePicker sample     range-mode
Documentation    Use Cases:
...              - Date picker header should display the date selected or the range,
...                even if it is still being picked


*** Test Cases ***
input both dates
    Force input                   ${calendarLeft} input    12 07 1982
    Press Keys                    NONE    TAB
    Force input                   ${calendarRight} input   01 01 2000
    Press Keys                    NONE    TAB
    wait until input has value    ${calendarLeft} input    7 Dec 1982
    wait until input has value    ${calendarRight} input    1 Jan 2000
    Element Should Contain        ${datePickerHeader}      7 Dec 1982 - 1 Jan 2000

just start date
    Force input                   ${calendarLeft} input    12 07 1982
    Press Keys                    NONE    TAB
    wait until input has value    ${calendarLeft} input    7 Dec 1982
    Element Should Contain        ${datePickerHeader}      7 Dec 1982

just end date
    [Setup]    Open DatePicker sample     range-mode-with-no-values
    Force input                   ${calendarRight} input    01 01 2000
    Press Keys                    NONE    TAB
    wait until input has value    ${calendarRight} input    1 Jan 2000
    wait until input has value    ${calendarLeft} input     1 Jan 2000
    Element Should Contain        ${datePickerHeader}       1 Jan 2000

end is previous than start
    Force input                   ${calendarLeft} input     01 01 2000
    Press Keys                    NONE    TAB
    Force input                   ${calendarRight} input    12 07 1982
    Press Keys                    NONE    TAB
    wait until input has value    ${calendarLeft} input     1 Jan 2000
    wait until input has value    ${calendarRight} input    1 Jan 2000
    Element Should Contain        ${datePickerHeader}       1 - 1 Jan 2000

start is forward than end
    Force input                   ${calendarLeft} input     01 01 1980
    Press Keys                    NONE    TAB
    Force input                   ${calendarRight} input    12 07 1982
    Press Keys                    NONE    TAB
    Force input                   ${calendarLeft} input     01 01 2000
    Press Keys                    NONE    TAB
    wait until input has value    ${calendarLeft} input     7 Dec 1982
    wait until input has value    ${calendarRight} input    7 Dec 1982
    Element Should Contain        ${datePickerHeader}       7 - 7 Dec 1982

input start date and pick end date
    [Documentation]    Was assumed picked date will be considered as new start date
    Force input                   ${calendarLeft} input     12 07 1982
    Press Keys                    NONE  ENTER
    Click Element                 ${xcalendar2Day}\[3]
    wait until input has value    ${calendarRight} input    3 Mar 2020
    wait until input has value    ${calendarLeft} input     3 Mar 2020
    Element Should Contain        ${datePickerHeader}       3 Mar 2020


*** Variables ***
${xcalendar2Day}    xpath:((//div[@class='HvSingleCalendar-calendarGrid'])[2]${xday})
${xday}             //button[@data-in-month='true']
