*** Setting ***
Resource     ../_keywords.resource


*** Keywords ***
open dropdownmenu sample
    [Arguments]    ${dir}    ${sample}
    Go To                               ${dir}inputs-dropdown-menu--${sample}
    Wait Until Element Is Enabled       ${dropDownMenu}
    Click Element                       ${dropDownMenu}
    Wait Until Page Contains Element    ${menuList}


*** Variables ***
${dropDownMenu}    css:button[class*='HvDropDownMenu']
${item1}           css:li[id*='item-0']
${item2}           css:li[id*='item-1']
${item3}           css:li[id*='item-2']
${menuList}        css:ul[role=menu]
