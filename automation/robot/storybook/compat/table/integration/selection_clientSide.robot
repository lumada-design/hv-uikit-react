*** Setting ***
Resource      ../_table.resource
Test Setup    open table sample    ${compatibility}    with-checkbox
Force Tags    bug-infrastructure-ie


*** Test Cases ***
keep selection when pagination is moved to next page
    [Documentation]    selection vs pagination
    Select Checkbox                    ${row}(10) ${checkBox}
    Select Dropdown Value              ${rows_per_page}    5
    Click Element                      ${nav_next_page}
    Checkbox Should Be Selected        ${row}(5) ${checkBox}

keep selection when pagination is moved to previous page
    [Documentation]    selection vs pagination
    Select Checkbox                    ${row}(1) ${checkBox}
    Click Element                      ${nav_next_page}
    Click Element                      ${nav_previous_page}
    Checkbox Should Be Selected        ${row}(1) ${checkBox}

keep selection when number of rows per table is changed
    [Documentation]    selection vs page size
    Select Checkbox                ${row}(1) ${checkBox}
    Select Checkbox                ${row}(10) ${checkBox}
    Select Dropdown Value          ${rows_per_page}   20
    Checkbox Should Be Selected    ${row}(1) ${checkBox}
    Checkbox Should Be Selected    ${row}(10) ${checkBox}

keep selection when column is sorted by
    [Documentation]    selection vs sort by
    Select Checkbox                ${row}(10) ${checkBox}
    Click Element                  ${header}(2)
    Checkbox Should Be Selected    ${row}(4) ${checkBox}
