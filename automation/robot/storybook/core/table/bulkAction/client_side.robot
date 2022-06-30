*** Setting ***
Resource      ../_table.resource
Test Setup    open table sample    ${display}    with-checkbox


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
    Wait Until Element Is Enabled               ${rows_per_page}
    Select Dropdown Value                       ${rows_per_page}    5
    Click Button                                ${nav_last_page}
    select Checkbox                             ${bulkAction} ${checkBox}
    Wait Until Page Contains                    3 / 13
    Textfield Value Should Be                   ${nav_input}    3
    Click Button                                Delete
    Wait Until Page Does Not Contain Element    ${rows_selected}
    select Checkbox                             ${bulkAction} ${checkBox}
    Wait Until Page Contains                    5 / 10
    Textfield Value Should Be                   ${nav_input}    2

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
    Click Button                       Select all 13 items across all pages
    Click Button                       Delete
    wait until Page Contains           No data to display.
    Page Should Not Contain Element    ${rows_populated}
    Checkbox Should Not Be Selected    ${bulkAction} ${checkBox}
