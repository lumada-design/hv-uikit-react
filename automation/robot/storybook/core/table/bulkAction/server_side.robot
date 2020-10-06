*** Setting ***
Resource          ../table.resource
Test Setup        Run Keywords
...               Go To    ${visualizations}table--server-side-pagination
...               AND    Wait Until Element Is Visible    ${table}
Test Template     Run Keyword

*** Test Cases ***
enable actions when any row is selected
    Wait Until Page Contains Element    ${bulkAction_buttons}
    Wait Until Element Is Enabled       ${row_2_checkbox}
    Element Should Be Disabled          ${bulkAction_buttons}
    Select Checkbox                     ${row_2_checkbox}
    Element Should Be Enabled           ${bulkAction_buttons}

disable actions when is removed all selections
    Wait Until Page Contains Element    ${bulkAction_buttons}
    Wait Until Element Is Enabled       ${row_2_checkbox}
    Select Checkbox                     ${row_2_checkbox}
    Unselect Checkbox                   ${bulkAction_checkbox}
    Element Should Be Disabled          ${bulkAction_buttons}

show previous page when it is deleted all rows of last page
    Wait Until Element Is Enabled       ${pagination_last_page}
    Click Button                        ${pagination_last_page}
    Wait Until Page Contains Element    ${rows_populated}    timeout=5s    limit=3
    select Checkbox                     ${bulkAction_checkbox}
    Wait Until Page Contains            3 / 553
    Click Button                        Delete
    Wait Until Page Contains Element    ${rows_populated}    timeout=5s    limit=10
    select Checkbox                     ${bulkAction_checkbox}
    Wait Until Page Contains            10 / 550
    Textfield Value Should Be           ${pagination_input}    55
