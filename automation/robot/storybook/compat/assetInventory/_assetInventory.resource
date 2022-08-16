*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
filter cards and reduce Window size
    Set Window Size                  1200    800
    open assetInventory sample       configurations
    Select Dropdown Value            ${pageSize}    6

focus assertion by Browser
    [Arguments]    ${locator}
    Run Keyword If                            '${BROWSER.lower()}'!='ie'
    ...   Element Should Be Focused           ${locator}
    ...   ELSE
    ...   Wait Until Page Contains Element    ${locator}\[class*=focused]

open assetInventory sample
    [Arguments]    ${sample}
    Go To     ${compatibility}asset-inventory--${sample}
    Wait Until Element Is Enabled    ${assetInventory}


*** Variables ***
${assetInventory}       css:.HvAssetInventory-root
${buttonCardView}       css:#card-button
${buttonClearText}      css:button[aria-label='Clear the text']
${buttonListView}       css:#list-button
${card}                 ${cards}:nth-child
${cards}                ${cardView}>div>div
${cardView}             css:.HvCardView-elements
${checkBox}             xpath:(//input[@type='checkbox'])
${dropSortBy}           css:#hv-assetinventory-sort-dropdown>div
${dropSortTitleDesc}    css:#hv-assetinventory-sort-values-list-item-1
${pageCurrent}          xpath:(//input[@type='number'])
${pageInTotal}          css:.HvPagination-pageInfo>:nth-child(3)
${pageLast}             css:#hv-assetinventory-pagination-lastPage-button
${pageNavigator}        css:div[class=HvPagination-pageNavigator]
${pageNext}             css:#hv-assetinventory-pagination-nextPage-button
${pagePrevious}         css:#hv-assetinventory-pagination-previousPage-button
${pageSize}             css:#hv-assetinventory-pagination-pageSize
${pageTotal}            css:#hv-assetinventory-pagination-totalPages
${row}                  css:#listView ul>li:nth-child
${rows}                 css:#listView ul>li
${searchBox}            css:input[type=search]
