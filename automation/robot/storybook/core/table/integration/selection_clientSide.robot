*** Setting ***
Resource      ../table.resource
Test Setup    Run Keywords
...           Go To    ${visualizations}table--with-checkbox
...           AND    Wait Until Element Is Visible    ${table}


*** Test Cases ***
keep selection when pagination is moved to next page
    [Documentation]    selection vs pagination
    Select Checkbox                    ${row_10_checkbox}
    Select From List By Value          ${rows_per_page}    5
    Click Element                      ${pagination_next_page}
    Checkbox Should Be Selected        ${row_5_checkbox}

keep selection when pagination is moved to previous page
    [Documentation]    selection vs pagination
    Select Checkbox                    ${row_1_checkbox}
    Click Element                      ${pagination_next_page}
    Click Element                      ${pagination_previous_page}
    Checkbox Should Be Selected        ${row_1_checkbox}

keep selection when number of rows per table is changed
    [Documentation]    selection vs page size
    Select Checkbox                ${row_1_checkbox}
    Select Checkbox                ${row_10_checkbox}
    Select From List By Value      ${rows_per_page}   20
    Checkbox Should Be Selected    ${row_1_checkbox}
    Checkbox Should Be Selected    ${row_10_checkbox}

keep selection when column is sorted by
    [Documentation]    selection vs sort by
    Select Checkbox                ${row_10_checkbox}
    Click Element                  ${header_2}
    Checkbox Should Be Selected    ${row_4_checkbox}
