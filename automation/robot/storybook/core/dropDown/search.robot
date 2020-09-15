*** Setting ***
Resource         _resources.resource
Test Setup       Run Keywords
...              Go To    ${patterns}dropdown--multi-selection
...              AND    Wait Until Element Is Enabled    ${dropdown}
...              AND    Click Element                    ${dropdownHeader}
...              AND    Wait Until Element Is Visible    ${listBox}
Documentation    A search can be used to filter the available options
Force Tags       v3


*** Test Cases ***
filter options for multi selection
    Page Should Contain Element    ${options}    limit=4
    Input Text                     ${searchInput}    2
    Page Should Contain Element    ${options}    limit=1

return empty list
    Page Should Contain Element    ${options}    limit=4
    Input Text                     ${searchInput}    123
    Page Should Contain Element    ${options}    limit=0

select option not returned by filter
    Page Should Contain Element          ${aria-selected}    limit=1
    Click Element                        ${option1}
    Input Text                           ${searchInput}    3
    Click Button                         Apply
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    2 / 4

select option returned by filter
    Page Should Contain Element          ${aria-selected}    limit=1
    Input Text                           ${searchInput}    2
    Click Element                        ${option1}
    Click Button                         Apply
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    0 / 4

filter options for single selection
    Go To                            ${patterns}dropdown--single-selection-with-search
    Wait Until Element Is Enabled    ${dropdown}
    Click Element                    ${dropdownHeader}
    Wait Until Element Is Visible    ${listBox}
    Page Should Contain Element      ${options}    limit=4
    Input Text                       ${searchInput}    2
    Page Should Contain Element      ${options}    limit=1
    Click Element                    ${option1}
    Element Text Should Be           ${dropdownHeader}    Select...    ignore_case=True
