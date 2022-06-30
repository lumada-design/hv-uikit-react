*** Setting ***
Resource      _dropDownMenu.resource
Test Setup    open dropdownmenu sample    ${inputs}    disabled-items


*** Test Cases ***
open dropdown menu when click dropdown button
    [Setup]    NONE
    Go To                               ${inputs}dropdown-menu--disabled-items
    Wait Until Element Is Enabled       ${dropDownMenu}
    Click Element                       ${dropDownMenu}
    Wait Until Page Contains Element    ${menuList}

close dropdown when click dropdown button
    Click Element                        ${dropDownMenu}
    Wait Until Element Is Not Visible    ${menuList}

close dropdow menu when is pressed right click out of list
    Click Element                        css:body
    Wait Until Element Is Not Visible    ${menuList}

close dropdown menu when item is selected
    [Setup]    open dropdownmenu sample    ${inputs}    controlled
    Click Element                        ${item1}
    Wait Until Element Is Not Visible    ${menuList}

focus activate an item
    Element Text Should Be               ${menuList}    Label 1\nLabel 2\nLabel 3
    Click Element                        ${item3}
    Wait Until Page Contains Element     ${item3}:focus
    Element Attribute Value Should Be    ${item3}    tabindex    0

unable select a disabled item
    Element Attribute Value Should Be    ${item2}    aria-disabled    true
    Click Element                        ${item2}
    Element Attribute Value Should Be    ${item2}    tabindex     0
    Element Attribute Value Should Be    ${item2}    aria-selected    ${None}
