*** Setting ***
Resource      ../_datePicker.resource
Test Setup    Open DatePicker sample    range-mode


*** Test Cases ***
change both calendar years when is clicked previous year
    [Documentation]   when dates are empty
    ${yearL}    Get Time            year
    ${yearR}    Get Text            ${calendarRight} ${year}
    Element Text Should Be          ${calendarleft} ${year}    ${yearL}
    Click Element                   ${calendarleft} ${year-}
    ${yearL}   Convert To String    ${${yearL}-1}
    ${yearR}   Convert To String    ${${yearR}-1}
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
    ${yearL}   Get Time             year
    Element Text Should Be          ${calendarleft} ${year}    ${yearL}
    ${yearL}   Convert To String    ${${yearL}-1}
    Click Element                   ${calendarRight} ${year-}
    Element Text Should Be          ${calendarRight} ${year}    ${yearL}
    Click Element                   ${calendarRight} ${year+}
    ${yearL}   Convert To String    ${${yearL}+1}
    Element Text Should Be          ${calendarRight} ${year}    ${yearL}


*** Variables ***
${month+}   [id$=month-right]
${year-}    [id*=year-left]
${year+}    [id*=year-right]
${year}     [id*=year][role]
