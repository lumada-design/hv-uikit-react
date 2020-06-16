*** Setting ***
Resource          _resources.resource
Test Template     verify dropped dropdownmenu has attributes
Force Tags        wai-aria-practices


*** Test Cases ***
aria-haspopup    ${dropDownMenu}    aria-haspopup    true
aria-expanded    ${dropDownMenu}    aria-expanded    true
aria-label       ${dropDownMenu}    aria-label       dropdownMenu-DisabledItems
role menu        ${droppedMenu}     role             menu
aria-disabled    ${item2}           aria-disabled    true


*** Keywords ***
verify dropped dropdownmenu has attributes
    [Arguments]    ${locator}    ${attribute}    ${expected}
    Go To                                ${components}dropdown-menu--disabled-items
    Wait Until Page Contains Element     ${dropDownMenu}
    Click Element                        ${dropDownMenu}
    Wait Until Page Contains Element     ${droppedMenu}
    Element Attribute Value Should Be    ${locator}    ${attribute}    ${expected}
