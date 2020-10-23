*** Setting ***
Resource         _list.resource
Test Setup       open list sample    multi-selection-with-select-all
Documentation    options selections just for lists with multiple selection


*** Test Cases ***
unable to select a disabled option when click on it
    [Setup]    open list sample    multi-selection-with-selectors
    Page Should Contain Element    ${selectedItems}    limit=1
    Click Element                  ${option}(4)
    Page Should Contain Element    ${selectedItems}    limit=1

select all options when clicking in header option all
    Page Should Contain Element    ${selectedItems}    limit=1
    Click Element                  ${allOption}
    Page Should Contain Element    ${selectedItems}    limit=0
    Click Element                  ${allOption}
    Page Should Contain Element    ${selectedItems}    limit=5
    Element Text Should Be         ${allOption} label    5 / 5

show all in header option when is selected all options one by one
    Page Should Contain Element    ${selectedItems}    limit=1
    Click Element                  ${option}(1)
    Click Element                  ${option}(2)
    Click Element                  ${option}(4)
    Click Element                  ${option}(5)
    Page Should Contain Element    ${selectedItems}    limit=5
    Element Text Should Be         ${allOption} label    5 / 5

remove list indeterminate state when click in header option all
    Page Should Contain Element        ${selectedItems}    limit=1
    Click Element                      ${allOption}
    Page Should Not Contain Element    ${selectedItems}
    Element Text Should Be             ${allOption} label    Select All (5)

remove list indeterminate state when unselect the unique selected option
    Element Attribute Value Should Be    ${allOption}-input    data-indeterminate    true
    Page Should Contain Element          ${selectedItems}    limit=1
    Click Element                        ${option}(3)
    Page Should Not Contain Element      ${selectedItems}
    Element Text Should Be               ${allOption} label    Select All (5)
    Element Attribute Value Should Be    ${allOption}-input    data-indeterminate    false

verify list indeterminate state when one option is selected
    Page Should Contain Element          ${selectedItems}    limit=1
    Element Attribute Value Should Be    ${allOption}-input    data-indeterminate    true
