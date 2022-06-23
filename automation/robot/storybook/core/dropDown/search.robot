*** Setting ***
Resource         _dropDown.resource
Test Setup       open dropdown sample    ${inputs}     multi-selection
Documentation    A search can be used to filter the available options


*** Test Cases ***
filter options for multi selection
    Page Should Contain Element    ${options}    limit=4
    Input Text                     ${searchInput}    2
    Page Should Contain Element    ${options}    limit=1

filter options for single selection
    [Setup]    open dropdown sample    ${inputs}     single-selection-with-search    
    Page Should Contain Element      ${options}    limit=4
    Input Text                       ${searchInput}    2
    Page Should Contain Element      ${options}    limit=1
    Click Element                    ${option}(1)
    Element Text Should Be           ${dropdownHeader}    Select...    ignore_case=True

return empty list
    Page Should Contain Element    ${options}    limit=4
    Input Text                     ${searchInput}    123
    Page Should Contain Element    ${options}    limit=0

select option not returned by filter
    Page Should Contain Element          ${aria-selected}    limit=1
    Click Element                        ${option}(1)
    Input Text                           ${searchInput}    3
    Click Button                         Apply
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    2 / 4

select option returned by filter
    Page Should Contain Element          ${aria-selected}    limit=1
    Input Text                           ${searchInput}    2
    Click Element                        ${option}(1)
    Click Button                         Apply
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    0 / 4
