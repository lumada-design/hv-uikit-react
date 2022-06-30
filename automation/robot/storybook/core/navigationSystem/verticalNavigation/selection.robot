*** Setting ***
Resource          _verticalNavigation.resource
Test Setup        open vertical navigation sample    ${structure}    collapsable
Documentation     Test Cases based on Design System Version 1.2.0


*** Test Cases ***
should be selected the default item when vertical navigation menu is opened
    vertical navigation item should be selected    ${item2.3.2}

save previous selection when vertical navigation menu is closed and then opened
    vertical navigation item should not be selected    ${item2.3.1}
    Click Element                                      ${item2.3.1}
    vertical navigation item should be selected        ${item2.3.1}
    Click Element                                      ${burger}
    Wait Until Element Is Not Visible                  ${expanded}
    Click Element                                      ${burger}
    Wait Until Element Is Visible                      ${expanded}
    vertical navigation item should be selected        ${item2.3.1}

select a parent item when item is clicked 1 level
    vertical navigation item should not be selected    ${item2}
    Click Element                                      ${item2}>div
    vertical navigation item should be selected        ${item2}

select a parent item when item is clicked 2 level
    vertical navigation item should not be selected    ${item2.2}
    Click Element                                      ${item2.2}>div
    vertical navigation item should be selected        ${item2.2}

select a end item when item is clicked 3 level
    vertical navigation item should not be selected    ${item2.3.1}
    Click Element                                      ${item2.3.1}>div
    vertical navigation item should be selected        ${item2.3.1}

does not select an item when the item is focused
    set focus and press keys                           ${expanded}     TAB
    Element Should Be Focused                          ${item1}>div
    vertical navigation item should not be selected    ${item1}

does not unselect an item when the selected item is clicked
    vertical navigation item should be selected    ${item2.3.2}
    Click Element                                  ${item2.3.2}
    vertical navigation item should be selected    ${item2.3.2}
