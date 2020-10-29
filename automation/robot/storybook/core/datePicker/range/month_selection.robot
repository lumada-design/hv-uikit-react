*** Setting ***
Resource      ../_datePicker.resource
Test Setup    Open DatePicker sample    range-mode


*** Test Cases ***
select month on left calendar
    Click Element                    ${calendarLeft} ${month}
    Wait Until Element Is Enabled    ${monthGrid}
    Click Element                    ${monthGrid}:nth-child(1)
    Element Text Should Be           ${calendarLeft} ${month}   January
    Element Text Should Be           ${calendarRight} ${month}    March

select month on right calendar
    [Setup]    Open DatePicker sample    range-with-values
    Click Element                    ${calendarRight} ${month}
    Wait Until Element Is Enabled    ${monthGrid}
    Click Element                    ${monthGrid}:nth-child(12)
    Element Text Should Be           ${calendarLeft} ${month}    July
    Element Text Should Be           ${calendarRight} ${month}    December
    Element Text Should Be           ${calendarLeft} ${year}    2019
    Element Text Should Be           ${calendarRight} ${year}    2019

TAB sequence
    [Tags]    keyboard
    Click Element                    ${calendarRight} ${month}
    Wait Until Element Is Enabled    ${monthGrid}
    Set Focus To Element             ${calendarRight} input
    Repeat Keyword                   12 times
    ...    Press Keys                NONE    TAB
    Element Should Be Focused        ${monthGrid}:nth-child(12)

select month when pressed ENTER on focused month of grid
    [Tags]    keyboard
    Click Element                    ${calendarLeft} ${month}
    Wait Until Element Is Enabled    ${monthGrid}
    Press Keys                       ${monthGrid}:nth-child(7)    ENTER
    Element Text Should Be           ${calendarLeft} ${month}   July
    Element Text Should Be           ${calendarRight} ${month}    August


*** Variables ***
${month}        [id$=month]
${year}         [id*=year][role]
${monthGrid}    css:[role=button]
