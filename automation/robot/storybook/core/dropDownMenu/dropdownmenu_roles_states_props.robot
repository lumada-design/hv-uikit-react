*** Setting ***
Library           SeleniumLibrary
Resource          _resources.resource
Suite Setup       open storybook
Test Template     verify dropped dropdownmenu has attributes
Suite Teardown    Close Browser
Force Tags        smoke    wai-aria-practices


*** Test Cases ***
aria-haspopup    ${dropDownMenu}    aria-haspopup    true
aria-expanded    ${dropDownMenu}    aria-expanded    true
aria-label       ${dropDownMenu}    aria-label       dropdownMenu-DisabledItems
role menu        ${droppedMenu}     role             menu
aria-disabled    ${item2}           aria-disabled    true


*** Keywords ***
verify dropped dropdownmenu has attributes
    [Arguments]    ${locator}    ${attribute}    ${expected}
    Go To                                ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element     ${dropDownMenu}    10s
    Click Element                        ${dropDownMenu}
    Wait Until Page Contains Element     ${droppedMenu}    5s
    Element Attribute Value Should Be    ${locator}    ${attribute}    ${expected}
