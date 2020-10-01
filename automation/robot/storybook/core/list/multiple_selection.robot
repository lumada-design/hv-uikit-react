*** Setting ***
Variables        variables.yaml
Resource         ../_keywords.resource
Test Setup       Run Keywords
...              Go To                                                        ${components}list--multi-selection-with-select-all
...              AND                                                          Wait Until Element Is Visible                       ${list}
Documentation    options selections just for lists with multiple selection
Force Tags    v3


*** Test Cases ***
unable to select a disabled option when click on it
    Go To                                  ${components}list--multi-selection-with-selectors
    Wait Until Element Is Visible          ${option4}
    Page Should Contain Element            ${selectedItems}                                   limit=1
    Page Should Contain Element            ${iconChecked}                                     limit=1
    Run Keyword And Continue On Failure    Click Element                                      ${option4}
    Page Should Contain Element            ${selectedItems}                                   limit=1
    Page Should Contain Element            ${iconChecked}                                     limit=1

select all options when clicking in header option 'all'
    Page Should Contain Element    ${selectedItems}      limit=1
    Page Should Contain Element    ${iconChecked}        limit=1
    Click Element                  ${headerItem}         # deselect exist one
    Click Element                  ${headerItem}         # select all
    Page Should Contain Element    ${selectedItems}      limit=5
    Page Should Contain Element    ${iconChecked}        limit=6
    Element Text Should Be         ${headerItemLabel}    5 / 5

show 'all' in header option when is selected all options one by one
    Page Should Contain Element    ${selectedItems}      limit=1
    Page Should Contain Element    ${iconChecked}        limit=1
    Click Element                  ${option1}
    Click Element                  ${option2}
    Click Element                  ${option4}
    Click Element                  ${option5}
    Page Should Contain Element    ${selectedItems}      limit=5
    Page Should Contain Element    ${iconChecked}        limit=6
    Element Text Should Be         ${headerItemLabel}    5 / 5

remove list indeterminate state when click in header option all and list is in indeterminate state
    Page Should Contain Element        ${selectedItems}      limit=1
    Click Element                      ${headerItem}         # deselect exist one
    Page Should Not Contain Element    ${selectedItems}
    Page Should Not Contain Element    ${iconChecked}
    Element Text Should Be             ${headerItemLabel}    Select All (5)

remove list indeterminate state when unselect the unique selected option
    Page Should Contain Element          ${selectedItems}      limit=1
    Click Element                        ${option3}
    Page Should Not Contain Element      ${selectedItems}
    Page Should Not Contain Element      ${iconChecked}
    Element Text Should Be               ${headerItemLabel}    Select All (5)
    Element Attribute Value Should Be    ${headerItem}         data-indeterminate    ${None}

verify list indeterminate state when one option is selected
    Page Should Contain Element          ${selectedItems}              limit=1
    Element Attribute Value Should Be    ${headerItem}-input    data-indeterminate    true
