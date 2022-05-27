*** Setting ***
Resource     ../_keywords.resource


*** Keywords ***
open table sample
    [Arguments]    ${dir}    ${sample}
    go to                            ${dir}display-table--${sample}
    Wait Until Element Is Enabled    ${table}


*** Variables ***
${bulkAction}             css:.HvBulkActions-root
${button_expand}          css:[aria-label='row expander button']
${cells}                  css:[role=table] [role=row] [role=cell]
${checkBox}               [type="checkbox"]
${column}                 ${rows}>div>div:nth-child
${header}                 ${headers}:nth-child
${headers}                css:[role=columnheader]
${nav_count_of_pages}     css:[id$=pagination-totalPages]
${nav_first_page}         css:button[aria-label='First Page']
${nav_input}              css:input[aria-label='Current page']
${nav_last_page}          css:button[aria-label='Last Page']
${nav_next_page}          css:button[aria-label='Next Page']
${nav_previous_page}      css:button[aria-label='Previous Page']
${row}                    ${rows}:nth-child
${rows_empty}             ${rows} [role=row]:not([aria-rowindex])
${rows_per_page}          css:div[class*='HvPagination-pageSizeOptionsSelect']
${rows_populated}         ${rows} [aria-rowindex]
${rows_selected}          ${rows} [aria-selected=true]
${rows}                   css:div[role=rowgroup]>div
${table}                  css:[caption][role=table]
