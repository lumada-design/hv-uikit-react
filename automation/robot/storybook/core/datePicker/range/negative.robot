*** Setting ***
Resource      ../_datePicker.resource
Test Setup    Open DatePicker sample    range-with-values


*** Test Cases ***
input end date previous of start date
    [Documentation]    restore previous date
    wait until input has value    ${calendarLeft} input    5 Jul 2019
    Force input                   ${calendarRight} input    12 07 1982
    Press Keys                    NONE    TAB
    wait until input has value    ${calendarLeft} input    5 Jul 2019
    wait until input has value    ${calendarRight} input   5 Jul 2019
    Element Should Contain        ${datePickerHeader}    5 - 5 Jul 2019

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

not possible pick days of other month
    [Tags]    bug-ie-webdriver
    input value should be    ${calendarLeft} input    5 Jul 2019
    input value should be    ${calendarRight} input    10 Jul 2019
    Click Element            ${xcalendar1DayOut}\[1]
    Click Element            ${xcalendar1DayOut}\[7]
    Click Element            ${xcalendar2DayOut}\[1]
    Click Element            ${xcalendar2DayOut}\[7]
    input value should be    ${calendarLeft} input    5 Jul 2019
    input value should be    ${calendarRight} input    10 Jul 2019


*** Variables ***
${xcalendar1DayOut}    xpath:((//div[@class='HvSingleCalendar-calendarGrid'])[1]${xdayOut})
${xcalendar2DayOut}    xpath:((//div[@class='HvSingleCalendar-calendarGrid'])[2]${xdayOut})
${xdayOut}          //button[@data-in-month='false']
