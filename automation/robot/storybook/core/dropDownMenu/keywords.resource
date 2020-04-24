*** Setting ***
Resource     ../../_resources/storybook_keywords.robot
Variables    ../../_resources/storybook_variables.yaml
Library      SeleniumLibrary
Variables    variables.yaml


*** Keywords ***
item should be focused
    [Arguments]                               ${item}
    Element Should Be Focused                 ${item}
    element attribute value should contain    ${item}       class       focused
    Element Attribute Value Should Be         ${item}       tabindex    0

wait until is focused
    [Arguments]                               ${locator}
    Wait Until Keyword Succeeds               5             1s          Element Should Be Focused    ${locator}

drop menu when is focused and is pressed keyboard
    [Arguments]    ${keyboard}
    Go To                               ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element    ${dropDownMenu}    10s
    set focus and press keys            ${dropDownMenu}    ${keyboard}
    Wait Until Element Is Visible       ${item1}           5s
    Element Should Be Focused           ${dropDownMenu}

close menu when is focused and is pressed keyboard
    [Arguments]    ${keyboard}
    Go To                                ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element     ${dropDownMenu}    10s
    Click Element                        ${dropDownMenu}
    Wait Until Element Is Visible        ${item1}           5s
    Element Should Be Focused            ${dropDownMenu}
    Press Keys                           NONE               ${keyboard}
    Wait Until Element Is Not Visible    ${item1}           5s

activates item and close menu when item is focused and is pressed keyboard
    [Arguments]    ${keyboard}
    Go To                                ${STORYBOOK_URL}/${sampleKeepOpenedFalse}
    Wait Until Page Contains Element     ${dropDownMenu}    10s
    Click Element                        ${dropDownMenu}
    Wait Until Element Is Visible        ${item1}           5s
    Press Keys                           NONE               TAB
    Element Should Be Focused            ${item1}
    Press Keys                           NONE               ${keyboard}
    Wait Until Element Is Not Visible    ${item1}           5s    

move focus from item to other is pressed keyboard
    [Arguments]    ${itemA}    ${keyboard}    ${itemB}    
    Go To                               ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element    ${dropDownMenu}    10s
    Click Element                       ${dropDownMenu}
    Wait Until Element Is Visible       ${itemA}           5s
    Click Element                       ${itemA}
    Press Keys                          NONE               ${keyboard}
    Element Should Be Focused           ${itemB}    
    
verify dropped dropdownmenu has attributes
    [Arguments]    ${locator}    ${attribute}    ${expected}
    Go To                                ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element     ${dropDownMenu}    10s
    Click Element                        ${dropDownMenu}
    Wait Until Page Contains Element     ${droppedMenu}
    Element Attribute Value Should Be    ${locator}         ${attribute}    ${expected}