*** Setting ***
Resource      _resources.resource
Force Tags    v3    bug-ie    bug-chrome


*** Test Cases ***
move focus between dropdown's
    Go To                               ${patterns}dropdown--different-size-and-placements
    Wait Until Element Is Enabled       dropdown1
    Click Element                       dropdown1
    Wait Until Element Is Visible       dropdown1-values-actions
    Click Element                       dropdown2
    Wait Until Element Is Visible       dropdown2-values-actions
    Element Should Not Be Visible       dropdown1-values-actions
    Element Should Be Focused           ${searchInput}
