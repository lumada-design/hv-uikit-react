*** Setting ***
Resource      _keywords.resource
Test Setup    Run Keywords
...           Go To    ${visualizations}table--main
...           AND    Wait Until Element Is Visible    ${table}
Force Tags    bug-infrastructure-ie v3

*** Test Cases ***
sort column by ascending when column is not sorted and her header is clicked
    Click Element                            ${header}
    column should be sorted by ascending     ${column}
    Element Attribute Value Should Be        ${header}  aria-sort  ascending

sort column by descending when column is sorted by ascending and her header is clicked
    Click Element                            ${header}
    column should be sorted by ascending     ${column}
    Click Element                            ${header}
    column should be sorted by descending    ${column}
    Element Attribute Value Should Be        ${header}  aria-sort  descending

do not sort a column when column is not sortable
    ${before}          get column values    ${severity column}
    Click Element      ${severity header}
    ${after}           get column values    ${severity column}
    Should Be Equal    ${before}    ${after}
