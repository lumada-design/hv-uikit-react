*** Setting ***
Resource          ../table.resource
Suite Setup       open storybook
Test Setup        Run Keywords
...               Go To    ${visualizations}table--server-side-pagination
...               AND    Wait Until Element Is Visible    ${table}
Test Template     Run Keyword
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
enable actions when any row is selected
    Wait Until Page Contains Element    ${bulkAction_buttons}    timeout=10s
    Wait Until Element Is Enabled       ${row_2_checkbox}    timeout=10s
    Element Should Be Disabled          ${bulkAction_buttons}
    Select Checkbox                     ${row_2_checkbox}
    Element Should Be Enabled           ${bulkAction_buttons}

disable actions when is removed all selections
    Wait Until Page Contains Element    ${bulkAction_buttons}    timeout=10s
    Wait Until Element Is Enabled       ${row_2_checkbox}    timeout=10s
    Select Checkbox                     ${row_2_checkbox}
    Unselect Checkbox                   ${bulkAction_checkbox}
    Element Should Be Disabled          ${bulkAction_buttons}

show previous page when it is deleted all rows of last page
    Wait Until Element Is Enabled       ${pagination_last_page}    timeout=10s
    Click Button                        ${pagination_last_page}
    wait until page contains elements   ${rows_populated}    3
    select Checkbox                     ${bulkAction_checkbox}
    Wait Until Page Contains            3 of 553 items    timeout=10s
    Click Button                        Delete
    wait until page contains elements   ${rows_populated}    10
    select Checkbox                     ${bulkAction_checkbox}
    Wait Until Page Contains            10 of 550 items    timeout=10s
    Textfield Value Should Be           ${pagination_input}    55