*** Setting ***
Resource      ../_table.resource
Test Setup    open table sample    ${visualizations}    with-checkbox


*** Test Cases ***
indeterminate state on parent checkbox when she is unselected and is clicked
    [Documentation]    unselected - indeterminate
    Select Dropdown Value                ${rows_per_page}    5
    Click Element                        ${bulkAction_checkbox}
    Wait Until Page Contains             5 / 13
    Page Should Contain Element          ${rows_selected}    limit=5
    Element Attribute Value Should Be    ${bulkAction_checkbox}    data-indeterminate    true

unselected state on parent checkbox when all checkboxes are unselected
    [Documentation]    unselected - indeterminate - unselected
    Select Checkbox                      ${row_1_checkbox}
    Element Attribute Value Should Be    ${bulkAction_checkbox}    data-indeterminate    true
    Unselect Checkbox                    ${row_1_checkbox}
    Wait Until Page Contains             All
    Page Should Not Contain Element      ${rows_selected}
    Checkbox Should Not Be Selected      ${bulkAction_checkbox}
    Element Attribute Value Should Be    ${bulkAction_checkbox}    data-indeterminate    false

unselected state on parent checkbox when she is indeterminate and is clicked
    [Documentation]    unselected - indeterminate - unselected
    Select Checkbox                      ${row_1_checkbox}
    Element Attribute Value Should Be    ${bulkAction_checkbox}    data-indeterminate    true
    Click Element                        ${bulkAction_checkbox}
    Wait Until Page Contains             All
    Page Should Not Contain Element      ${rows_selected}
    Checkbox Should Not Be Selected      ${bulkAction_checkbox}
    Element Attribute Value Should Be    ${bulkAction_checkbox}    data-indeterminate    false

unselected state on parent checkbox when she is checked and is clicked
    [Documentation]    unselected - indeterminate - selected - unselected
    Select Checkbox                      ${row_1_checkbox}
    Wait Until Page Contains             Select all
    Click Button                         Select all 13 items across all pages
    Unselect Checkbox                    ${bulkAction_checkbox}
    Wait Until Page Contains             All
    Page Should Not Contain Element      ${rows_selected}
    Checkbox Should Not Be Selected      ${bulkAction_checkbox}
    Element Attribute Value Should Be    ${bulkAction_checkbox}    data-indeterminate    false

indeterminate state on parent checkbox when one of all selected checkboxes is unselected
    [Documentation]    unselected - indeterminate - selected - indeterminate
    Select Checkbox                      ${row_1_checkbox}
    Wait Until Page Contains             Select all
    Click Button                         Select all 13 items across all pages
    Unselect Checkbox                    ${row_1_checkbox}
    Wait Until Page Contains             12 / 13
    Page Should Contain Element          ${rows_selected}    limit=9
    Element Attribute Value Should Be    ${bulkAction_checkbox}    data-indeterminate    true

select and unselect multiple rows when checkboxes are clicked
    [Documentation]    unselected - indeterminate - indeterminate
    Click Element                        ${row_1_checkbox}
    Click Element                        ${row_5_checkbox}
    Click Element                        ${row_10_checkbox}
    Click Element                        ${row_5_checkbox}
    Wait Until Page Contains             2 / 13
    Page Should Contain Element          ${rows_selected}    limit=2
    Element Attribute Value Should Be    ${bulkAction_checkbox}  data-indeterminate  true
