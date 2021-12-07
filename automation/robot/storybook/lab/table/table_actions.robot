*** Setting ***
Resource      _table.resource
Test Setup    open table sample    ${lab}    kitchen-sink


*** Test Cases ***
enable actions when any row is selected
    Wait Until Page Contains Element    ${bulkAction} button
    Element Should Be Enabled           ${bulkAction} button
    Page Should Contain                 1 / 64

select all available when no rows selected
    Wait Until Page Contains Element    ${bulkAction} button
    Select Checkbox                     ${row}(3) ${checkBox}
    Page Should Contain                 All

delete all unlocked rows 
    Select Checkbox                    ${row}(1) ${checkBox}
    Wait Until Page Contains           Select all
    Click Button                       Select all 64 items across all pages
    Click Button                       Delete
    Page Should Contain                All (2)