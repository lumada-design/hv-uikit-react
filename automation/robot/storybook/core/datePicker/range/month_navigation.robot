*** Setting ***
Library          DateTime
Resource         ../_datePicker.resource
Test Setup       Open DatePicker sample    range-with-values
Force Tags       v3


*** Test Cases ***
click previous month on left calendar when date is empty
    [Documentation]    verify both calendar rewind one month
    Element Text Should Be    ${calendarLeft} ${month}    July
    Element Text Should Be    ${calendarRight} ${month}    August
    Click Element             ${calendarLeft} ${month-}
    Element Text Should Be    ${calendarLeft} ${month}    June
    Element Text Should Be    ${calendarRight} ${month}    July

click next month on left calendar when date is empty
    [Documentation]    verify both calendars forward one month
    Element Text Should Be    ${calendarLeft} ${month}    July
    Element Text Should Be    ${calendarRight} ${month}    August
    Click Element             ${calendarLeft} ${month+}
    Element Text Should Be    ${calendarLeft} ${month}    August
    Element Text Should Be    ${calendarRight} ${month}    September

click previous month on right calendar
    [Documentation]    verify both calendar rewind one month
    Element Text Should Be    ${calendarLeft} ${month}    July
    Element Text Should Be    ${calendarRight} ${month}    August
    Click Element             ${calendarRight} ${month-}
    Element Text Should Be    ${calendarLeft} ${month}    June
    Element Text Should Be    ${calendarRight} ${month}    July

click next month on right calendar
    [Documentation]    verify both calendars forward one month
    Element Text Should Be    ${calendarLeft} ${month}    July
    Element Text Should Be    ${calendarRight} ${month}    August
    Click Element             ${calendarRight} ${month+}
    Element Text Should Be    ${calendarLeft} ${month}    August
    Element Text Should Be    ${calendarRight} ${month}    September

click next month until next January
    [Documentation]    verify change to forward year
    Element Text Should Be    ${calendarLeft} ${month}    July
    Element Text Should Be    ${calendarRight} ${month}    August
    Repeat Keyword            5 times
    ...    Click Element      ${calendarLeft} ${month+}
    Element Text Should Be    ${calendarLeft} ${month}    December
    Element Text Should Be    ${calendarLeft} ${year}    2019
    Element Text Should Be    ${calendarRight} ${year}    2020

click previous month until previous December
    [Documentation]    verify change to previous year
    Element Text Should Be    ${calendarLeft} ${month}    July
    Element Text Should Be    ${calendarRight} ${month}    August
    Repeat Keyword            7 times
    ...    Click Element      ${calendarLeft} ${month-}
    Element Text Should Be    ${calendarLeft} ${month}    December
    Element Text Should Be    ${calendarRight} ${month}    January
    Element Text Should Be    ${calendarLeft} ${year}    2018
    Element Text Should Be    ${calendarRight} ${year}    2019

click next month 12 times
    [Documentation]    verify forward year and same month
    Element Text Should Be    ${calendarLeft} ${month}    July
    Element Text Should Be    ${calendarRight} ${month}    August
    Repeat Keyword            12 times
    ...    Click Element      ${calendarLeft} ${month+}
    Element Text Should Be    ${calendarLeft} ${month}    July
    Element Text Should Be    ${calendarRight} ${month}    August


*** Variables ***
${month+}     [id$=month-right]
${month-}     [id$=month-left]
${month}      [id$=month]
${year}       [id*=year][role]
