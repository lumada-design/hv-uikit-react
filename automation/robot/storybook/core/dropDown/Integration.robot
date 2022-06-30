*** Setting ***
Resource     _dropDown.resource


*** Test Cases ***
move focus between dropdown's
    [Documentation]     https://insightgroup.atlassian.net/browse/HVUIKIT-5533
    [Setup]    Go To    ${inputs}dropdown--different-size-and-placements
    Wait Until Element Is Enabled       dropdown1
    Click Element                       dropdown1
    Wait Until Element Is Visible       dropdown1-values-actions
    Click Element                       dropdown2
    Wait Until Element Is Visible       dropdown2-values-actions
    Element Should Not Be Visible       dropdown1-values-actions
    Element Should Be Focused           ${searchInput}
