*** Setting ***
Library           SeleniumLibrary
Resource          keywords.resource
Variables         variables.yaml
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