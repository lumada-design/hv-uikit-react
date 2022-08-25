*** Setting ***
Resource      ../_table.resource
Test Setup    open table sample    ${display}    with-checkbox
Force Tags    bug-infrastructure-ie


*** Test Cases ***
checkboxes are selected when checkbox all is selected
    [Documentation]    unselected - selected
    Select Dropdown Value          ${rows_per_page}    20
    Click Element                  ${bulkAction} ${checkBox}
    Wait Until Page Contains       13 / 13
    Page Should Contain Element    ${rows_selected}    limit=13
    checkbox Should Be Selected    ${bulkAction} ${checkBox}

parent checkbox are indeterminate when any checkbox is selected
    [Documentation]    unselected - indeterminate
    Element Attribute Value Should Be    ${bulkAction} ${checkBox}    data-indeterminate    false
    Select Checkbox                      ${row}(1) ${checkBox}
    Wait Until Page Contains             1 / 13
    Page Should Contain Element          ${rows_selected}    limit=1
    Element Attribute Value Should Be    ${bulkAction} ${checkBox}    data-indeterminate    true

checkboxes are selected when select all button is clicked
    [Documentation]    unselected - indeterminate - selected
    Select Checkbox                ${row}(1) ${checkBox}
    Wait Until Page Contains       Select all
    Click Button                   Select all 13 items
    Wait Until Page Contains       13 / 13
    Page Should Contain Element    ${rows_selected}    limit=10
    checkbox Should Be Selected    ${bulkAction} ${checkBox}

checkboxes are selected when they are selected one by one
    [Documentation]    unselected - indeterminate - selected
    Click Element                  ${bulkAction} ${checkBox}
    Click Button                   ${nav_next_page}
    Select Checkbox                ${row}(1) ${checkBox}
    Select Checkbox                ${row}(2) ${checkBox}
    Select Checkbox                ${row}(3) ${checkBox}
    Wait Until Page Contains       13 / 13
    Page Should Contain Element    ${rows_selected}    limit=3
    checkbox Should Be Selected    ${bulkAction} ${checkBox}
