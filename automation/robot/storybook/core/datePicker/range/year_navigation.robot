*** Setting ***
Resource      ../_datePicker.resource
Test Setup    Open DatePicker sample    range-mode-with-no-values


*** Test Cases ***
Does not change both calendar years when is clicked previous year
    [Documentation]   when dates are empty
    ${yearL}    Get Time            year
    ${yearR}    Get Text            ${calendarRight} ${year}
    Element Text Should Be          ${calendarleft} ${year}    ${yearL}
    Click Element                   ${calendarleft} ${year-}
    ${yearL}   Convert To String    ${${yearL}-1}
    Element Text Should Be          ${calendarleft} ${year}    ${yearL}
    Element Text Should Be          ${calendarRight} ${year}    ${yearR}

navigate to next year by months and then click next year on left calendar
    [setup]    Open DatePicker sample     range-with-values
    Repeat Keyword            5 times
    ...    Click Element      ${calendarleft} ${month+}
    Element Text Should Be    ${calendarleft} ${year}    2019
    Element Text Should Be    ${calendarRight} ${year}    2020
    Click Element             ${calendarleft} ${year+}
    Element Text Should Be    ${calendarleft} ${year}    2020
    Element Text Should Be    ${calendarRight} ${year}    2021

click previous and next year on right calendar
    [Documentation]   when dates are empty
    ${currentYear}   Get Time             year
    ${previousYear}   Convert To String    ${${currentYear}-1}
    ${currentRightCalendarYear}    get elements text    ${calendarRight} ${year}
    ${previousRightCalendarYear}   Convert To String    ${${currentRightCalendarYear}-1}
    ${nextRightCalendarYear}       Convert To String    ${${currentRightCalendarYear}+1}
    Element Text Should Be          ${calendarleft} ${year}    ${currentYear}
    Click Element                   ${calendarRight} ${year-}
    Element Text Should Be          ${calendarleft} ${year}    ${previousYear}
    Element Text Should Be          ${calendarRight} ${year}    ${previousRightCalendarYear}
    Click Element                   ${calendarRight} ${year+}
    Element Text Should Be          ${calendarRight} ${year}    ${currentRightCalendarYear}
    Element Text Should Be          ${calendarleft} ${year}    ${previousYear}
    Click Element                   ${calendarRight} ${year+}
    Element Text Should Be          ${calendarRight} ${year}    ${nextRightCalendarYear}
    Element Text Should Be          ${calendarleft} ${year}    ${previousYear}


*** Variables ***
${month+}   [id$=month-right]
${year-}    [id*=year-left]
${year+}    [id*=year-right]
${year}     [id*=year][role]
