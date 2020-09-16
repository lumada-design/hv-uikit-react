*** Setting ***
Resource         ../_datePicker.resource
Test Template    verify month keyboard tab sequence
Documentation    Use Cases:
...              - Clicking in the month should open a month selector,
...              which via click navigates to the desired month
Force Tags       keyboard    v3


*** Test Cases ***      TABS    TO
None to January         1       ${monthGrid}\[.="Jan"]
March to April          4       ${monthGrid}\[.="Apr"]
January to December     12      ${monthGrid}\[.="Dec"]


*** Keywords ***
verify month keyboard tab sequence
    [Documentation]   verify if focus moves to an element ${to} other element
    ...               when is pressed TAB x times
    [Arguments]    ${repeat}    ${to}
    Go To                            ${components}calendar--single-date
    Wait Until Element Is Enabled    ${month}
    Click Element                    ${month}
    Wait Until Element Is Visible    ${monthGrid}
    Repeat Keyword	                 ${repeat} times
    ...   Press keys                 NONE    TAB
    Element Should Be Focused        ${to}
