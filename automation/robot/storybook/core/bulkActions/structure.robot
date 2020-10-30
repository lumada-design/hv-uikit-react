*** Setting ***
Resource      _bulkActions.resource
Test Setup    open bulk action sample    with-actions


*** Test Cases ***
collect all values when all items are selected
    Select Checkbox                      ${parentCheckbox}
    Click Element                        ${actionDelete}
    Wait Until Element Is Not Visible    ${checkboxs}

collect specific values when some items are selected
    Select Checkbox                      ${checkbox}\[2]
    Select Checkbox                      ${checkbox}\[9]
    Click Element                        ${actionDelete}
    Wait Until Element Is Not Visible    ${checkbox}\[2]
    Wait Until Element Is Not Visible    ${checkbox}\[9]
    Page Should Contain Element          ${checkboxs}    limit=6

bulk actions are disable when no item is selected
    Unselect Checkbox             ${parentCheckbox}
    Element Should Be Disabled    ${actionsButtons}

enable bulk action when checkbox is indeterminate
    Unselect Checkbox                    ${parentCheckbox}
    Element Should Be Disabled           ${actionsButtons}
    Select Checkbox                      ${checkbox}\[9]
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
    Select Checkbox               ${checkbox}\[3]
    Element Should Be Enabled     ${actionsButtons}
    Unselect Checkbox             ${checkbox}\[3]
    Element Should Be Disabled    ${actionsButtons}

filter max actions visible when maxVisibleActions is defined
    [Documentation]    api property maxVisibleActions
    ...                the other action should be in dropdown
    Page Should Contain Element      ${actionsButtons}    limit=3
    Select Checkbox                  ${parentCheckbox}
    Click Element                    ${actionMore}
    Wait Until Element Is Visible    ${actionsDroppedList}
    Page Should Contain Element      ${actionsDropped}    limit=2
