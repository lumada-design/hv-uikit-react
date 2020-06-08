*** Setting ***
Resource          ../table.resource
Suite Setup       open storybook
Test Setup        Run Keywords
...               Go To    ${visualizations}table--with-checkbox
...               AND    Wait Until Element Is Visible    ${table}
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
checkboxes are selected when checkbox all is selected
    [Documentation]    unselected - selected
    Select From List By Value      ${rows_per_page}    20
    Click Element                  ${bulkAction_checkbox}
    Wait Until Page Contains       13 of 13 items    timeout=3s
    Page Should Contain Element    ${rows_selected}    limit=13
    checkbox Should Be Selected    ${bulkAction_checkbox}

parent checkbox are indeterminate when any checkbox is selected
    [Documentation]    unselected - indeterminate
    Element Attribute Value Should Be    ${bulkAction_checkbox}    data-indeterminate    false
    Select Checkbox                      ${row_1_checkbox}
    Wait Until Page Contains             1 of 13 items    timeout=3s
    Page Should Contain Element          ${rows_selected}    limit=1
    Element Attribute Value Should Be    ${bulkAction_checkbox}    data-indeterminate    true

checkboxes are selected when select all button is clicked
    [Documentation]    unselected - indeterminate - selected
    Select Checkbox                ${row_1_checkbox}
    Wait Until Page Contains       Select all  timeout=3s
    Click Button                   Select all 13 items across all pages
    Wait Until Page Contains       13 of 13 items    timeout=3s
    Page Should Contain Element    ${rows_selected}    limit=10
    checkbox Should Be Selected    ${bulkAction_checkbox}

checkboxes are selected when they are selected one by one
    [Documentation]    unselected - indeterminate - selected
    Click Element                  ${bulkAction_checkbox}
    Click Button                   ${pagination_next_page}
    Select Checkbox                ${row_1_checkbox}
    Select Checkbox                ${row_2_checkbox}
    Select Checkbox                ${row_3_checkbox}
    Wait Until Page Contains       13 of 13 items    timeout=3s
    Page Should Contain Element    ${rows_selected}    limit=3
    checkbox Should Be Selected    ${bulkAction_checkbox}