*** Setting ***
Resource      ../_table.resource
Test Setup    open table sample    ${compatibility}    server-side-pagination


*** Test Cases ***
enable actions when any row is selected
    Wait Until Page Contains Element    ${bulkAction} button
    Wait Until Element Is Enabled       ${row}(2) ${checkBox}
    Element Should Be Disabled          ${bulkAction} button
    Select Checkbox                     ${row}(2) ${checkBox}
    Element Should Be Enabled           ${bulkAction} button

disable actions when is removed all selections
    Wait Until Page Contains Element    ${bulkAction} button
    Wait Until Element Is Enabled       ${row}(2) ${checkBox}
    Select Checkbox                     ${row}(2) ${checkBox}
    Unselect Checkbox                   ${bulkAction} ${checkBox}
    Element Should Be Disabled          ${bulkAction} button

show previous page when it is deleted all rows of last page
    Wait Until Element Is Enabled       ${nav_last_page}
    Click Button                        ${nav_last_page}
    Wait Until Page Contains Element    ${rows_populated}    timeout=5s    limit=3
    select Checkbox                     ${bulkAction} ${checkBox}
    Wait Until Page Contains            3 / 553
    Click Button                        Delete
    Wait Until Page Contains Element    ${rows_populated}    timeout=5s    limit=10
    select Checkbox                     ${bulkAction} ${checkBox}
    Wait Until Page Contains            10 / 550
    Textfield Value Should Be           ${nav_input}    55
