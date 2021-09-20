*** Setting ***
Library       DateTime
Test Setup    Open DatePicker sample    range-mode
Resource      ../_datePicker.resource


*** Test Cases ***
show placeholder when dates are empty
    [Setup]    Open DatePicker sample   range-mode-with-no-values
    Element Text Should Be         ${calendarLeft} input   ${empty}
    Element Text Should Be         ${calendarRight} input   ${empty}
    Page Should Contain Element    ${calendarLeft} input\[placeholder='MM/DD/YYYY']
    Page Should Contain Element    ${calendarRight} input\[placeholder='MM/DD/YYYY']

shows calendar month when input date
    Force input                     ${calendarLeft} input    03 01 2000
    Force input                     ${calendarRight} input    07 30 2000
    Press Keys                      NONE    ENTER
    Element Text Should Be          ${calendarLeft} ${month}    March
    Element Text Should Be          ${calendarRight} ${month}    July

shows calendar month when reopen edited calendar
    Force input                       ${calendarLeft} input    03 01 2000
    Force input                       ${calendarRight} input    07 30 2000
    Press Keys                        NONE    ENTER
    Click Button                      Apply
    Click Element                     ${datePickerHeader}
    Wait Until Element Is Visible     ${calendar}
    Element Text Should Be            ${calendarLeft} ${month}    March
    Element Text Should Be            ${calendarRight} ${month}    July


*** Variables ***
${month}          [id$=month]
${year}           [id*=year][role]
${daySelected}    button .HvTypography-highlightText
