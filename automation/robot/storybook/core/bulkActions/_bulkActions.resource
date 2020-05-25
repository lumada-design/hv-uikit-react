*** Setting ***
Library           SeleniumLibrary
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot


*** Variables ***
${actionAdd}            id:add
${actionDelete}         id:delete
${actionMore}           bulkActions-actions-menu-icon-button
${actionsDroppedList}   bulkActions-actions-menu-list
${actionsDropped}       css:ul[id*=bulkActions-actions-menu-list]>li
${actionsButtons}       css:div[class*=actionContainer] button
${checkbox0}            id:0-input
${checkbox1}            id:1-input
${checkbox2}            id:2-input
${checkbox3}            id:3-input
${checkbox4}            id:4-input
${checkbox5}            id:5-input
${checkbox6}            id:6-input
${checkbox7}            id:7-input
${checkboxs}            css:#bulkActions ~ div input
${iframeBulkActions}    ${STORYBOOK_URL}/iframe.html?id=components-bulk-actions--controlled-with-actions
${parentCheckbox}       id:bulkActions-select-input
