*** Setting ***
Resource          ../table.resource
Suite Setup       open storybook
Test Setup        Run Keywords
...               Go To    ${visualizations}table--with-checkbox
...               AND    Wait Until Element Is Visible    ${table}
Test Template     Run Keyword
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
enable actions when any row is selected
    Wait Until Page Contains Element    ${bulkAction_buttons}    timeout=10s
    Wait Until Element Is Enabled       ${row_2_checkbox}    timeout=5s
    Element Should Be Disabled          ${bulkAction_buttons}
    Select Checkbox                     ${row_2_checkbox}
    Element Should Be Enabled           ${bulkAction_buttons}

disable actions when is removed all selections
    Wait Until Page Contains Element    ${bulkAction_buttons}    timeout=10s
    Wait Until Element Is Enabled       ${row_2_checkbox}    timeout=5s
    Select Checkbox                     ${row_2_checkbox}
    Unselect Checkbox                   ${bulkAction_checkbox}
    Element Should Be Disabled          ${bulkAction_buttons}

show previous page when it is deleted all rows of last page
    Wait Until Element Is Enabled               ${rows_per_page}    timeout=10s
    Select From List By Value                   ${rows_per_page}    5
    Click Button                                ${pagination_last_page}
    select Checkbox                             ${bulkAction_checkbox}
    Wait Until Page Contains                    3 of 13 items    timeout=10s
    Textfield Value Should Be                   ${pagination_input}    3
    Click Button                                Delete
    Wait Until Page Does Not Contain Element    ${rows_selected}    timeout=10s
    select Checkbox                             ${bulkAction_checkbox}
    Wait Until Page Contains                    5 of 10 items    timeout=10s
    Textfield Value Should Be                   ${pagination_input}    2

delete all rows when all rows are selected and is clicked delete bulk action
    Select Checkbox                    ${row_1_checkbox}
    Wait Until Page Contains           Select all    timeout=10s
    Click Button                       Select all 13 items across all pages
    Click Button                       Delete
    wait until Page Contains           No data to display.    timeout=10s
    Page Should Not Contain Element    ${rows_populated}
    Checkbox Should Not Be Selected    ${bulkAction_checkbox}