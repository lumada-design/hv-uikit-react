*** Setting ***
Resource     ../../_resources/keywords.resource


*** Variables ***
${bulkAction_buttons}           css:[class*=HvBulkActions-actions] button
${bulkAction_checkbox}          css:input[id*=select-all]
${button_expand}                css:[aria-label='row expander button']
${cells}                        css:[role=table] [role=row] [role=cell]
${header_1}                     css:[role=columnheader]:nth-child(1)
${header_2}                     css:[role=columnheader]:nth-child(2)
${header_3}                     css:[role=columnheader]:nth-child(3)
${header_7}                     css:[role=columnheader]:nth-child(7)
${header_8}                     css:[role=columnheader]:nth-child(8)
${headers}                      css:[role=table] [role=row] [scope=col]
${pagination_count_of_pages}    css:[id$=pagination-totalPages]
${pagination_first_page}        css:button[aria-label='First Page']
${pagination_input}             css:input[aria-label*='page input']
${pagination_last_page}         css:button[aria-label='Last Page']
${pagination_next_page}         css:button[aria-label='Next Page']
${pagination_previous_page}     css:button[aria-label='Previous Page']
${row_1_checkbox}               xpath:(//div[@role='row'][@aria-rowindex])[1]//input
${row_1}                        xpath:(//div[@role='row'][@aria-rowindex])[1]
${row_10_checkbox}              xpath:(//div[@role='row'][@aria-rowindex])[10]//input
${row_2_checkbox}               xpath:(//div[@role='row'][@aria-rowindex])[2]//input
${row_3_checkbox}               xpath:(//div[@role='row'][@aria-rowindex])[3]//input
${row_4_checkbox}               xpath:(//div[@role='row'][@aria-rowindex])[4]//input
${row_5_checkbox}               xpath:(//div[@role='row'][@aria-rowindex])[5]//input
${rows_counted}                 css:[role=rowgroup] [role=row]
${rows_empty}                   css:[role=[role=rowgroup] [role=row]:not([aria-rowindex])
${rows_per_page}                css:select[aria-label='Select how many to display']
${rows_populated}               css:[role=rowgroup] [aria-rowindex]
${rows_selected}                css:[role=row][aria-selected=true]
${table}                        css:[caption][role=table]
