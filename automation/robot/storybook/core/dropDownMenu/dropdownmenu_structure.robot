*** Setting ***
Library           SeleniumLibrary
Resource          _resources.resource
Suite Setup       open storybook
Test Setup        Run Keywords
...               Go To    ${STORYBOOK_URL}/${sampledDisabledItems}
...               AND      Wait Until Keyword Succeeds    3x    5s
...               open dropDownMenu
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
close dropdown when click dropdown button
    Click Element                        ${dropDownMenu}
    Wait Until Element Is Not Visible    ${droppedMenu}     3s

close dropdown menu when is pressed right click out of list
    Click Element                        css:body
    Wait Until Element Is Not Visible    ${droppedMenu}     3s

close dropdown menu when item is selected
    [Setup]    NONE
    Go To                                ${STORYBOOK_URL}/${sampleKeepOpenedFalse}
    open dropDownMenu
    Click Element                        ${item1}
    Wait Until Element Is Not Visible    ${droppedMenu}     3s

select an item
    Element Text Should Be               ${droppedMenu}     Label 1\nLabel 2\nLabel 3
    Click Element                        ${item3}
    Element Attribute Value Should Be    ${item3}           tabindex    0

unable select a disabled item
    Element Attribute Value Should Be    ${item2}           aria-disabled    true
    Click Element                        ${item2}
    Element Attribute Value Should Be    ${item2}           tabindex         0
    Element Attribute Value Should Be    ${item2}           aria-selected    ${None}


*** Keywords ***
open dropDownMenu
    Wait Until Element Is Enabled    ${dropDownMenu}    10s
    Click Element                    ${dropDownMenu}
    Wait Until Element Is Visible    ${droppedMenu}     3s