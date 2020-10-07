*** Setting ***
Resource         ../_datePicker.resource
Test Template    verify month keyboard tab sequence
Documentation    Use Cases:
...              - Clicking in the month should open a month selector,
...              which via click navigates to the desired month
Force Tags       keyboard    v3


*** Test Cases ***      TABS    TO
None to January         1       ${jan}
March to April          4       ${apr}
January to December     12      ${dec}


*** Keywords ***
verify month keyboard tab sequence
    [Documentation]   verify if focus moves to an element ${to} other element
    ...               when is pressed TAB x times
    [Arguments]    ${repeat}    ${to}
    Go To                            ${components}calendar--single-date
    Wait Until Element Is Enabled    ${month}
    Click Element                    ${month}
    Wait Until Element Is Visible    ${monthGrid}
    Set Focus To Element             ${input}
    Repeat Keyword	                 ${repeat} times
    ...   Press keys                 NONE    TAB
    Element Should Be Focused        ${to}


*** Variables ***
${jan}    css:.HvMonthSelector-calendarMonthlyGrid>div:nth-child(1)
${apr}    css:.HvMonthSelector-calendarMonthlyGrid>div:nth-child(4)
${dec}    css:.HvMonthSelector-calendarMonthlyGrid>div:nth-child(12)
