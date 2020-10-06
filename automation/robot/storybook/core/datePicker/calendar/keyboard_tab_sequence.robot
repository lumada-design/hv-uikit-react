*** Setting ***
Resource         ../_datePicker.resource
Test Template    verify keyboard tab sequence
Documentation    Use Cases:
...              - Clicking in the month should open a month selector,
...              which via click navigates to the desired month
Force Tags       keyboard


*** Test Cases ***                 FROM            TO
label to input                     single-label    ${input}
input to previous month            ${input}        ${month-}
previous month to current month    ${month-}       ${month}
current month to next month        ${month}        ${month+}
next month to previous year        ${month+}       ${year-}
previous year to next year         ${year-}        ${year+}
next year to first day             ${year+}        ${day}\[1]


*** Keywords ***
verify keyboard tab sequence
    [Documentation]    verify if focus moves ${from} an element ${to} other element
    ...                when is pressed TAB
    [Arguments]    ${from}    ${to}
    Go To                            ${components}calendar--single-date
    Wait Until Element Is Enabled    ${from}
    set focus and press keys         ${from}    TAB
    Element Should Be Focused        ${to}
