*** Variables ***
${card1}              css:#id_0-grid>div
${card2}              css:#id_1-grid>div
${card3}              css:#id_2-grid>div
${card4}              css:#id_3-grid>div
${card6}              css:#id_5-grid>div
${cards}              css:#cardView>div
${cardViewButton}     id:card-button
${checkBox1}          xpath:(//input[@type='checkbox'])[1]
${checkBox2}          xpath:(//input[@type='checkbox'])[2]
${checkBox3}          xpath:(//input[@type='checkbox'])[3]
${checkBox4}          xpath:(//input[@type='checkbox'])[4]
${clearText}          css:button[aria-label='clear button']
${dropdownHeader}     id:hv-assetinventory-sort
${firstCardHeader}    xpath:(//span[contains(@class,'title')])[1]
${firstCheckbox}      css:input[value='id_0']
${listViewButton}     id:list-button
${pageCurrent}        id:hv-assetinventory-pagination-currentPage-input
${pageLast}           id:hv-assetinventory-pagination-lastPage-button
${pageNavigator}      css:div[class=HvPagination-pageNavigator]
${pageNext}           id:hv-assetinventory-pagination-nextPage-button
${pagePrevious}       id:hv-assetinventory-pagination-previousPage-button
${pageSize}           css:select[id|='hv-assetinventory-pagination-pageSize']
${pageTotal}          id:hv-assetinventory-pagination-totalPages
${row1}               css:#listView ul>li:nth-child(1)
${row2}               css:#listView ul>li:nth-child(2)
${row3}               css:#listView ul>li:nth-child(3)
${row4}               css:#listView ul>li:nth-child(4)
${row5}               css:#listView ul>li:nth-child(5)
${row6}               css:#listView ul>li:nth-child(6)
${rows}               css:#listView ul>li
${searchBox}          css:input[type='text']
${secondCheckbox}     css:input[value='id_1']
${sortTitleDesc}      id:hv-assetinventory-sort-values-list-item-1
