*** Setting ***
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke    wai-aria-practices


*** Keywords ***
verify dropdownmenu has attributes
    [Arguments]                                   ${sample}                                   ${attribute}       ${expected}
    Go To                                         ${STORYBOOK_URL}/${sample}
    Wait Until Page Contains Element              ${dropDownMenu}                             10s
    Element Attribute Value Should Be             ${dropDownMenu}                             ${attribute}       ${expected}

verify dropped dropdownmenu has attributes
    [Arguments]                                   ${sample}                                   ${locator}         ${attribute}     ${expected}
    Go To                                         ${STORYBOOK_URL}/${sample}
    Wait Until Page Contains Element              ${dropDownMenu}                             10s
    Click Element                                 ${dropDownMenu}
    Wait Until Page Contains Element              ${droppedMenu}
    Element Attribute Value Should Be             ${locator}                                  ${attribute}       ${expected}


*** Test Cases ***
aria-haspopup: element with role button
    verify dropdownmenu has attributes            ${sampledDisabledItems}                     aria-haspopup      true

aria-expanded: when the menu is displayed
    verify dropped dropdownmenu has attributes    ${sampledDisabledItems}                     ${dropDownMenu}    aria-expanded    true

role menu: element that contains the menu items
    verify dropped dropdownmenu has attributes    ${sampledDisabledItems}                     ${droppedMenu}     role             menu

role menu aria-label: value that refers display
    verify dropped dropdownmenu has attributes    ${sampledDisabledItems}                     ${dropDownMenu}    aria-label       dropdownMenu-DisabledItems

aria-disabled: true when a menu item is disabled
    Go To                                         ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element              ${dropDownMenu}                             10s
    Click Element                                 ${dropDownMenu}
    Wait Until Element Is Visible                 ${item2}
    Element Attribute Value Should Be             ${item2}                                    aria-disabled      true

