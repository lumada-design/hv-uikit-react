*** Setting ***
Resource         ../_datePicker.resource
Test Setup       Open DatePicker sample    range-with-values
Documentation    Use Cases:
...              - Date picker header should display the date selected or the range,
...                even if it is still being picked


*** Test Cases ***
pick just initial date and left end date empty
    [Tags]    bug-ie-webdriver
    [Setup]   Open DatePicker sample    range-mode-with-no-values
    ${dd}    Get Text                   ${xcalendar1Day}\[1]
    Click Element                       ${xcalendar1Day}\[1]
    Wait Until Element Is Enabled       ${calendarLeft} input
    ${date}    Get Element Attribute    ${calendarLeft} input    value
    Click Button                        Apply
    Element Should Contain              ${datePickerHeader}    ${dd}
    Element Should Contain              ${datePickerHeader}    ${date}

pick initial on left and end date on right calendar
    [Tags]    bug-ie-webdriver
    Click Element                    ${xcalendar1Day}\[3]
    wait until input has value       ${calendarLeft} input    3 Jul 2019
    wait Until Element Is Enabled    ${xcalendar2Day}\[7]
    Click Element                    ${xcalendar2Day}\[7]
    wait until input has value       ${calendarRight} input    7 Aug 2019
    Element Should Contain           ${datePickerHeader}    3 Jul 2019 - 7 Aug 2019

pick both dates on left calendar
    [Tags]    bug-ie-webdriver
    Click Element                    ${xcalendar1Day}\[2]
    wait Until Element Is Enabled    ${xcalendar2Day}\[7]
    Click Element                    ${xcalendar2Day}\[7]
    wait until input has value       ${calendarLeft} input    2 Jul 2019
    wait until input has value       ${calendarRight} input    7 Aug 2019
    Element Should Contain           ${datePickerHeader}    2 Jul 2019 - 7 Aug 2019

just apply default values
    [Documentation]    does not select any date, just apply the default selection
    ${date}    Get Text       ${datePickerHeader}
    Click Button              Apply
    Element Should Contain    ${datePickerHeader}    ${date}

apply empty values
    [Documentation]    Uses Cases:
    ...                 - it can be empty
    [Setup]    Open DatePicker sample    range-mode-with-no-values
    Click Button              Apply
    Element Should Contain    ${datePickerHeader}    Select a range


*** Variables ***
${xcalendar1Day}    xpath:((//div[@class='HvSingleCalendar-calendarGrid'])[1]${xday})
${xcalendar2Day}    xpath:((//div[@class='HvSingleCalendar-calendarGrid'])[2]${xday})
${xday}             //button[@data-in-month='true']
