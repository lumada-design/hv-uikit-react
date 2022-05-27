*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
open bulk action sample
    [Arguments]    ${sample}
    Go To    ${components}structure-bulk-actions--${sample}
    Wait Until Page Contains Element    ${parentCheckbox}


*** Variables ***
${actionAdd}            css:#add
${actionDelete}         css:#delete
${actionMore}           css:#bulkActions-actions-menu-icon-button
${actionsButtons}       css:div[class*=actionContainer] button
${actionsDropped}       css:ul[id*=bulkActions-actions-menu-list]>li
${actionsDroppedList}   css:#bulkActions-actions-menu-list
${checkbox}             xpath:(//input[@type="checkbox"])
${checkboxs}            css:#bulkActions ~ div input
${parentCheckbox}       css:#bulkActions-select-input
