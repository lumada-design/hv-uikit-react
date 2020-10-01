*** Setting ***
Resource         ../_datePicker.resource
Test Setup       Open DatePicker sample    range-with-values
Documentation    Use Cases:
...              - Date picker header should display the date selected or the range,
...                even if it is still being picked
Force Tags       v3


*** Test Cases ***
pick just initial date and left end date empty
    [Setup]   Open DatePicker sample    range-mode
    ${dd}    Get Text                   ${day}\[7]
    Click Element                       ${day}\[7]
    ${date}    Get Element Attribute    ${calendarLeft} input    value
    Click Button                        Apply
    Element Text Should Be              ${datePickerHeader}    ${dd} - ${date}

pick initial on left and end date on right calendar
    Click Element                   ${day}\[3]
    Click Element                   ${day}\[55]
    wait until element has value    ${calendarLeft} input    2 Jul 2019
    wait until element has value    ${calendarRight} input    9 Aug 2019
    Element Text Should Be          ${datePickerHeader}    2 Jul 2019 - 9 Aug 2019

pick both dates on left calendar
    Click Element                   ${day}\[3]
    Click Element                   ${day}\[8]
    wait until element has value    ${calendarLeft} input    2 Jul 2019
    wait until element has value    ${calendarRight} input    7 Jul 2019
    Element Text Should Be          ${datePickerHeader}    2 - 7 Jul 2019

pick initial on right and end date on left calendar
    Click Element                   ${day}\[50]
    Click Element                   ${day}\[13]
    wait until element has value    ${calendarLeft} input     4 Aug 2019
    wait until element has value    ${calendarRight} input    9 Aug 2019
    Element Text Should Be          ${datePickerHeader}    4 - 9 Aug 2019

pick dates out current month on left calendar
    [Documentation]    Use Cases:
    ...                - When selecting a date of the following or previous month,
    ...                  the month is accordingly selected
    Click Element                   ${day}\[1]
    Click Element                   ${day}\[39]
    wait until element has value    ${calendarLeft} input    30 Jun 2019
    wait until element has value    ${calendarRight} input    3 Jul 2019
    Element Text Should Be          ${datePickerHeader}    30 Jun 2019 - 3 Jul 2019

pick dates out current month on right calendar
    [Documentation]    Use Cases:
    ...                - When selecting a date of the following or previous month,
    ...                  the month is accordingly selected
    Click Element                   ${day}\[44]
    Click Element                   ${day}\[80]
    wait until element has value    ${calendarLeft} input    29 Jul 2019
    wait until element has value    ${calendarRight} input    3 Sep 2019
    Element Text Should Be          ${datePickerHeader}    29 Jul 2019 - 3 Sep 2019

pick same day of month on both calendars
    Click Element                   ${day}\[32]
    Click Element                   ${day}\[46]
    wait until element has value    ${calendarLeft} input    31 Jul 2019
    wait until element has value    ${calendarRight} input    31 Jul 2019
    Element Text Should Be          ${datePickerHeader}    31 - 31 Jul 2019

just apply default values
    [Documentation]    does not select any date, just apply the default selection
    ${date}    Get Text       ${datePickerHeader}
    Click Button              Apply
    Element Text Should Be    ${datePickerHeader}    ${date}

apply empty values
    [Documentation]    Uses Cases:
    ...                 - it can be empty
    [Setup]    Open DatePicker sample    range-mode
    Click Button              Apply
    Element Text Should Be    ${datePickerHeader}    Select a range
