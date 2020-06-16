*** Setting ***
Resource      _bulkActions.resource
Test Setup    Run Keywords
...           Go To    ${components}bulk-actions--controlled-with-actions    AND
...           Wait Until Page Contains Element    ${parentCheckbox}


*** Test Cases ***
collect all values when all items are selected
    Select Checkbox                      ${parentCheckbox}
    Click Element                        ${actionDelete}
    Wait Until Element Is Not Visible    ${checkboxs}

collect specific values when some items are selected
    Select Checkbox                      ${checkbox0}
    Select Checkbox                      ${checkbox7}
    Click Element                        ${actionDelete}
    Wait Until Element Is Not Visible    ${checkbox0}
    Wait Until Element Is Not Visible    ${checkbox7}
    Page Should Contain Element          ${checkboxs}    limit=6

bulk actions are disable when no item is selected
    Unselect Checkbox             ${parentCheckbox}
    Element Should Be Disabled    ${actionsButtons}

enable bulk action when checkbox is indeterminate
    Unselect Checkbox                    ${parentCheckbox}
    Element Should Be Disabled           ${actionsButtons}
    Select Checkbox                      ${checkbox7}
    Element Attribute Value Should Be    ${parentCheckbox}    data-indeterminate    true
    Element Should Be Enabled            ${actionsButtons}

enable bulk action when all items are selected
    Unselect Checkbox             ${parentCheckbox}
    Element Should Be Disabled    ${actionsButtons}
    Select Checkbox               ${parentCheckbox}
    Element Should Be Enabled     ${actionsButtons}

disable bulk actions when unselect all checkbox
    Select Checkbox               ${parentCheckbox}
    Element Should Be Enabled     ${actionsButtons}
    Unselect Checkbox             ${parentCheckbox}
    Element Should Be Disabled    ${actionsButtons}

disable bulk actions when unselect the unique selected item
    Unselect Checkbox             ${parentCheckbox}
    Select Checkbox               ${checkbox1}
    Element Should Be Enabled     ${actionsButtons}
    Unselect Checkbox             ${checkbox1}
    Element Should Be Disabled    ${actionsButtons}

filter max actions visible when maxVisibleActions is defined
    [Documentation]    api property maxVisibleActions
    ...                the other action should be in dropdown
    Page Should Contain Element      ${actionsButtons}    limit=3
    Select Checkbox                  ${parentCheckbox}
    Click Element                    ${actionMore}
    Wait Until Element Is Visible    ${actionsDroppedList}
    Page Should Contain Element      ${actionsDropped}    limit=2