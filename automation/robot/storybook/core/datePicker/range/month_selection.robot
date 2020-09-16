*** Setting ***
Resource      ../_datePicker.resource
Test Setup    Open DatePicker sample    range-mode
Force Tags    v3


*** Test Cases ***
select month on left calendar
    Click Element                    ${calendarLeft} ${month}
    Wait Until Element Is Enabled    ${monthGrid}
    Click Element                    ${monthGrid}:nth-child(1)
    Element Text Should Be           ${calendarLeft} ${month}   January
    Element Text Should Be           ${calendarRight} ${month}    February

select month on right calendar
    [Setup]    Open DatePicker sample    range-with-values
    Click Element                    ${calendarRight} ${month}
    Wait Until Element Is Enabled    ${monthGrid}
    Click Element                    ${monthGrid}:nth-child(12)
    Element Text Should Be           ${calendarLeft} ${month}   December
    Element Text Should Be           ${calendarRight} ${month}    January
    Element Text Should Be           ${calendarLeft} ${year}    2019
    Element Text Should Be           ${calendarRight} ${year}    2020

TAB sequence
    [Tags]    keyboard
    Click Element                    ${calendarRight} ${month}
    Wait Until Element Is Enabled    ${monthGrid}
    Repeat Keyword                   12 times
    ...    Press Keys                NONE    TAB
    Element Should Be Focused        ${monthGrid}:nth-child(12)

select month when pressed ENTER on focus month on grid
    [Tags]    keyboard
    Click Element                    ${calendarRight} ${month}
    Wait Until Element Is Enabled    ${monthGrid}
    Press Keys                       ${monthGrid}:nth-child(7)    ENTER
    Element Text Should Be           ${calendarLeft} ${month}   July
    Element Text Should Be           ${calendarRight} ${month}    August


*** Variables ***
${month}        [id$=month]
${year}         [id*=year][role]
${monthGrid}    css:[role=button]
