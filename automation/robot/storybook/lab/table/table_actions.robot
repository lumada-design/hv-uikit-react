*** Setting ***
Resource      _table.resource
Test Setup    open table sample    ${lab}    kitchen-sink-sample


*** Test Cases ***
enable actions when any row is selected
    Wait Until Page Contains Element    ${bulkAction} button
    Wait Until Element Is Enabled       ${row}(2) ${checkBox}
    Element Should Be Disabled          ${bulkAction} button
    Select Checkbox                     ${row}(2) ${checkBox}
    Element Should Be Enabled           ${bulkAction} button

disable actions when all selections are removed
    Wait Until Page Contains Element    ${bulkAction} button
    Wait Until Element Is Enabled       ${row}(2) ${checkBox}
    Select Checkbox                     ${row}(2) ${checkBox}
    Unselect Checkbox                   ${bulkAction} ${checkBox}
    Element Should Be Disabled          ${bulkAction} button

