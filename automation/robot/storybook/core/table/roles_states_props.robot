*** Setting ***
Resource         _table.resource
Test Setup       open table sample    ${components}    with-checkbox
Force Tags       wai-aria-practices
Documentation    https://www.w3.org/TR/wai-aria-practices/#table


*** Test Cases ***
only 1 role as table on correct tag when table is rendered
    Element Attribute Value Should Be    ${table}    role    table
    Page Should Contain Element          css:[role=table]    limit=1

only 1 caption as string on correct tag when table is rendered
    Element Attribute Value Should Be    ${table}    caption    Table Caption
    Page Should Contain Element          css:[aria-rowcount]    limit=1

role as columnheader on correct tags when table is rendered
    Element Attribute Value Should Be    ${headers}    role    columnheader
    Page Should Contain Element          css:[role=columnheader]    limit=9

aria-rowcount as total number of table rows on correct tag when a paginated table is rendered
    Element Attribute Value Should Be    ${table}    aria-rowcount    13
    Page Should Contain Element          css:[aria-rowcount]    limit=1
    Select Dropdown Value                ${rows_per_page}    5
    Element Attribute Value Should Be    ${table}    aria-rowcount    13

role as row on correct tags when a paginated table is rendered
    Element Attribute Value Should Be    ${rows_populated}    role    row
    Page Should Contain Element          ${rows_populated}    limit=10
    Click Button                         ${nav_next_page}
    Page Should Contain Element          ${rows_populated}    limit=3

role as cell on correct DOM tags when a paginated table is rendered
    Element Attribute Value Should Be    ${cells}    role    cell
    Page Should Contain Element          css:[role=cell]    limit=90
    Click Button                         ${nav_next_page}
    Page Should Contain Element          css:[role=cell]    limit=90
    Select Dropdown Value                ${rows_per_page}    5
    Page Should Contain Element          css:[role=cell]    limit=45

aria-sort ascending or descending when a column is order by
    Element Attribute Value Should Be    ${header}(8)    aria-sort    ${None}
    Click Element                        ${header}(8)
    Element Attribute Value Should Be    ${header}(8)    aria-sort    ascending
    Click Element                        ${header}(8)
    Element Attribute Value Should Be    ${header}(8)    aria-sort    descending
    Click Element                        ${header}(2)
    Element Attribute Value Should Be    ${header}(8)    aria-sort    ${None}

aria-selected as boolean when a row is selected and unselected
    [Setup]    open table sample    ${components}    with-checkbox
    Page Should Contain Element          ${rows} [aria-selected=false]    limit=10
    Page Should Contain Element          ${rows} [aria-selected=true]    limit=0
    Select Checkbox                      ${row}(1) ${checkBox}
    Wait Until Page Contains Element     ${row}(1) [aria-selected=true]
    Unselect Checkbox                    ${row}(1) ${checkBox}
    Wait Until Page Contains Element     ${row}(1) [aria-selected=false]

aria-expanded as boolean when a row is expanded and shrink
    [Setup]    open table sample    ${components}    with-expander-and-custom-content
    Page Should Not Contain Element           ${rows} [aria-expanded=true]
    Click Element                             ${button_expand}
    Wait Until Page Contains Element          ${row}(1) [aria-expanded=true]
    Click Element                             ${button_expand}
    Wait Until Page Does Not Contain Element  ${row}(1) [aria-expanded=true]
    Page Should Not Contain Element           ${rows} [aria-expanded=true]
