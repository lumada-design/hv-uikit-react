*** Setting ***
Resource         _dropDownMenu.resource
Suite Setup      open dropdownmenu sample    ${inputs}    disabled-items
Test Template    Element Attribute Value Should Be
Force Tags       wai-aria-practices
Documentation    https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties-13


*** Test Cases ***  locator            atribute         value
aria-haspopup       ${dropDownMenu}    aria-haspopup    menu
aria-expanded       ${dropDownMenu}    aria-expanded    true
aria-label          ${dropDownMenu}    aria-label       dropdownMenu-DisabledItems
role menu           ${menuList}     role             menu
aria-disabled       ${item2}           aria-disabled    true


*** Variable ***
${dropDownMenu}    css:div[id='dpmDisabledItems']
