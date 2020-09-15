*** Setting ***
Resource      ../table.resource
Test Setup    Run Keywords
...           Go To    ${visualizations}table--server-side-pagination
...           AND    Wait Until Element Is Visible    ${table}
Force Tags    v3

*** Test Cases ***
remove selection when pagination is moved to next page
    [Documentation]    selection vs pagination
    Wait Until Element Is Enabled               ${row_10_checkbox}
    Select Checkbox                             ${row_10_checkbox}
    Select Dropdown Value                       ${rows_per_page}    5
    Wait Until Page Contains Element            ${rows_populated}
    Wait Until Element Is Enabled               ${pagination_next_page}
    Click Element                               ${pagination_next_page}
    Wait Until Page Contains                    All
    wait Until Page Does Not Contain Element    ${rows_selected}
    Checkbox Should Not Be Selected             ${bulkAction_checkbox}

remove selection when pagination is moved to previous page
    [Tags]    bug-ie-webdriver
    [Documentation]     https://github.com/lumada-design/hv-uikit-react/issues/1708
    ...                 selection vs pagination
    Wait Until Element Is Enabled               ${row_1_checkbox}
    Select Checkbox                             ${row_1_checkbox}
    Click Element                               ${pagination_next_page}
    Wait Until Element Is Enabled               ${pagination_previous_page}
    Click Element                               ${pagination_previous_page}
    Wait Until Page Contains                    All
    wait Until Page Does Not Contain Element    ${rows_selected}
    Checkbox Should Not Be Selected             ${bulkAction_checkbox}

remove selection when a selected row goes to next page
    [Documentation]    selection vs page size
    Wait Until Element Is Enabled       ${row_1_checkbox}
    Select Checkbox                     ${row_1_checkbox}
    Select Checkbox                     ${row_10_checkbox}
    Select Dropdown Value               ${rows_per_page}   5
    Wait Until Page Contains            1 / 553
    Page Should Contain Element         ${rows_selected}    limit=1

keep selection when number of rows per table is increased
    [Documentation]    selection vs page size
    Wait Until Element Is Enabled       ${row_1_checkbox}
    Select Checkbox                     ${row_1_checkbox}
    Select Checkbox                     ${row_10_checkbox}
    Select Dropdown Value               ${rows_per_page}     20
    Wait Until Page Contains Element    ${rows_populated}    timeout=5s    limit=20
    Checkbox Should Be Selected         ${row_1_checkbox}
    Checkbox Should Be Selected         ${row_10_checkbox}

remove selection when column is sorted by
    [Documentation]    selection vs sort by
    Wait Until Element Is Enabled               ${header_2}
    Click Element                               ${header_2}
    Wait Until Element Is Enabled               ${row_1_checkbox}
    Select Checkbox                             ${row_1_checkbox}
    Click Element                               ${header_2}
    Click Element                               ${header_2}
    Wait Until Page Contains                    All
    wait Until Page Does Not Contain Element    ${rows_selected}
