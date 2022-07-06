*** Setting ***
Resource      ../_table.resource
Test Setup    open table sample    ${display}    server-side-pagination


*** Test Cases ***
remove selection when pagination is moved to next page
    [Documentation]    selection vs pagination
    Wait Until Element Is Enabled               ${row}(10) ${checkBox}
    Select Checkbox                             ${row}(10) ${checkBox}
    Select Dropdown Value                       ${rows_per_page}    5
    Wait Until Page Contains Element            ${rows_populated}
    Wait Until Element Is Enabled               ${nav_next_page}
    Click Element                               ${nav_next_page}
    Wait Until Page Contains                    All
    wait Until Page Does Not Contain Element    ${rows_selected}
    Checkbox Should Not Be Selected             ${bulkAction} ${checkBox}

remove selection when pagination is moved to previous page
    [Tags]    bug-ie-webdriver
    [Documentation]     https://github.com/lumada-design/hv-uikit-react/issues/1708
    ...                 selection vs pagination
    Wait Until Element Is Enabled               ${row}(1) ${checkBox}
    Select Checkbox                             ${row}(1) ${checkBox}
    Click Element                               ${nav_next_page}
    Wait Until Element Is Enabled               ${nav_previous_page}
    Click Element                               ${nav_previous_page}
    Wait Until Page Contains                    All
    wait Until Page Does Not Contain Element    ${rows_selected}
    Checkbox Should Not Be Selected             ${bulkAction} ${checkBox}

remove selection when a selected row goes to next page
    [Documentation]    selection vs page size
    Wait Until Element Is Enabled       ${row}(1) ${checkBox}
    Select Checkbox                     ${row}(1) ${checkBox}
    Select Checkbox                     ${row}(10) ${checkBox}
    Select Dropdown Value               ${rows_per_page}   5
    Wait Until Page Contains            1 / 553
    Page Should Contain Element         ${rows_selected}    limit=1

keep selection when number of rows per table is increased
    [Documentation]    selection vs page size
    Wait Until Element Is Enabled       ${row}(1) ${checkBox}
    Select Checkbox                     ${row}(1) ${checkBox}
    Select Checkbox                     ${row}(10) ${checkBox}
    Select Dropdown Value               ${rows_per_page}     20
    Wait Until Page Contains Element    ${rows_populated}    timeout=5s    limit=20
    Checkbox Should Be Selected         ${row}(1) ${checkBox}
    Checkbox Should Be Selected         ${row}(10) ${checkBox}

remove selection when column is sorted by
    [Documentation]    selection vs sort by
    Wait Until Element Is Enabled               ${header}(2)
    Click Element                               ${header}(2)
    Wait Until Element Is Enabled               ${row}(1) ${checkBox}
    Select Checkbox                             ${row}(1) ${checkBox}
    Click Element                               ${header}(2)
    Click Element                               ${header}(2)
    Wait Until Page Contains                    All
    wait Until Page Does Not Contain Element    ${rows_selected}
