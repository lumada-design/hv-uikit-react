*** Setting ***
Resource      _table.resource
Test Setup    open table sample    ${lab}    kitchen-sink-sample


*** Test Cases ***

deselect all elements with multiple pages selected
    Wait Until Page Contains Element    ${bulkAction} ${checkBox}
    Select Checkbox                     ${bulkAction} ${checkBox}
    Select Dropdown Value               ${rows_per_page}    5
    Click Element                       ${bulkAction} ${checkBox}
    Checkbox Should Not Be Selected     ${bulkAction} ${checkBox}
    Page Should Contain                 All

delete all rows when all rows are selected and is clicked delete bulk action
    Select Checkbox                    ${row}(1) ${checkBox}
    Wait Until Page Contains           Select all
    Click Button                       Select all 64 items across all pages
    Click Button                       Delete
    wait until Page Contains           No data to display
    Page Should Not Contain Element    ${rows_populated}
    Checkbox Should Not Be Selected    ${bulkAction} ${checkBox}

keep selection when paging to next page
    Select Checkbox                    ${row}(10) ${checkBox}
    Select Dropdown Value              ${rows_per_page}    5
    Click Element                      ${nav_next_page}
    Checkbox Should Be Selected        ${row}(5) ${checkBox}

keep selection when paging to previous page
    Select Checkbox                    ${row}(1) ${checkBox}
    Click Element                      ${nav_next_page}
    Click Element                      ${nav_previous_page}
    Checkbox Should Be Selected        ${row}(1) ${checkBox}

retain selections when number of rows per table is changed
    Select Checkbox                ${row}(1) ${checkBox}
    Select Checkbox                ${row}(10) ${checkBox}
    Select Dropdown Value          ${rows_per_page}   20
    Checkbox Should Be Selected    ${row}(1) ${checkBox}
    Checkbox Should Be Selected    ${row}(10) ${checkBox}

keep selection when column is sorted by
    Select Checkbox                ${row}(10) ${checkBox}
    Click Element                  ${header}(3)
    Click Element                  ${header}(3)
    Checkbox Should Be Selected    ${row}(3) ${checkBox}

select all checkbox is in indeterminate state when any checkbox is selected
    Element Attribute Value Should Be    ${bulkAction} ${checkBox}    data-indeterminate    false
    Select Checkbox                      ${row}(1) ${checkBox}
    Wait Until Page Contains             1 / 64
    Page Should Contain Element          ${rows_selected}    limit=1
    Element Attribute Value Should Be    ${bulkAction} ${checkBox}    data-indeterminate    true

checkboxes are selected when select all button is clicked
    Select Checkbox                ${row}(1) ${checkBox}
    Wait Until Page Contains       Select all
    Click Button                   Select all 64 items across all pages
    Wait Until Page Contains       64 / 64
    Page Should Contain Element    ${rows_selected}    limit=10
    checkbox Should Be Selected    ${bulkAction} ${checkBox}
