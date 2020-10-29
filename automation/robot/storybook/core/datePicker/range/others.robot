*** Setting ***
Library       DateTime
Test Setup    Open DatePicker sample    range-mode
Resource      ../_datePicker.resource


*** Test Cases ***
current date as default value when it is empty
    [Setup]    Open DatePicker sample   range-mode-with-no-values
    ${yyyy}    Get Time                 year
    ${day}   Get Current Date           result_format=%e
    ${day}                              Evaluate  '${day}'.replace(' ','')
    ${monthName}    Get Current Date    result_format=%B
    Element Text Should Be              ${calendarLeft} ${month}    ${monthName}
    Element Text Should Be              ${calendarLeft} ${year}    ${yyyy}
    Element Text Should Be              ${calendarLeft} ${daySelected}    ${day}

shows calendar month when input date
    [Tags]    run-any-way
    [Documentation]    Bug  https://insightgroup.atlassian.net/browse/HVUIKIT-5605
    Force input                     ${calendarLeft} input    03 01 2000
    Force input                     ${calendarRight} input    07 30 2000
    Press Keys                      NONE    ENTER
    Element Text Should Be          ${calendarLeft} ${month}    March
    Run Keyword And Expect Error    *
    ...   Element Text Should Be    ${calendarRight} ${month}    July

shows calendar month when reopen edited calendar
    [Tags]    run-any-way
    [Documentation]    Bug  https://insightgroup.atlassian.net/browse/HVUIKIT-5605
    Force input                       ${calendarLeft} input    03 01 2000
    Force input                       ${calendarRight} input    07 30 2000
    Press Keys                        NONE    ENTER
    Click Button                      Apply
    Click Element                     ${datePickerHeader}
    Wait Until Element Is Visible     ${calendar}
    Element Text Should Be            ${calendarLeft} ${month}    March
    Run Keyword And Expect Error      *
    ...   Element Text Should Be      ${calendarRight} ${month}    July


*** Variables ***
${month}          [id$=month]
${year}           [id*=year][role]
${daySelected}    button .HvTypography-highlightText
