*** Setting ***
Resource         _assetInventory.resource
Test Setup       open assetInventory sample    configurations
Test Template    focus moves from to
Force Tags       keyboard
Documentation    https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html

*** Test Cases ***                          from                    to
search to sort                              ${searchBox}            ${dropSortBy}
sort to card view                           ${dropSortBy}           ${buttonCardView}
card view to list view                      ${buttonCardView}       ${buttonListView}
list view to card                           ${buttonListView}       ${card}(1)>div
card div to card checkbox                   ${card}(1)>div          ${card}(1) input
card checkbox to card button                ${card}(1) input        ${card}(1) ${button}
card button to card dropdownmenu            ${card}(1) ${button}    ${card}(1) ${drop}
card dropdownmenu to other card checkbox    ${card}(1) ${drop}      ${card}(2) input
last card dropdownmenu to page size         ${card}(4) ${drop}      ${pageSize}>div
page size to pagination                     ${pageSize}>div         ${pageCurrent}


*** Keywords ***
focus moves from to
    [Arguments]    ${from}    ${to}
    Set Focus To Element             ${from}
    Press Keys                       NONE    TAB
    ${val}    Execute Javascript     return document.activeElement.outerHTML
    Element Should Be Focused        ${to}


*** Variables ***
${button}    button[id*=post]
${drop}      [class*=HvDropDownMenu-root]>div>button
