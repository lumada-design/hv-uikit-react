*** Setting ***
Resource                                                                      ../../_resources/storybook_keywords.robot
Resource                                                                      keywords.robot
Library                                                                       SeleniumLibrary
Variables                                                                     ../../_resources/storybook_variables.yaml
Variables                                                                     variables.yaml
Suite Setup                                                                   open storybook
Suite Teardown                                                                Close Browser
Force Tags                                                                    smoke                                        keyboard


*** Test Cases ***
enter: opens the menu and places focus on the first menu item
    Go To                                        ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    set focus and press keys                     ${dropDownMenu}                              ENTER
    Wait Until Element Is Visible                ${item1}                                     5s
    item should be focused                       ${item1}

enter: activates the item and closes the menu
    Go To                                        ${STORYBOOK_URL}/${sampleKeepOpenedFalse}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    set focus and press keys                     ${dropDownMenu}                              ENTER
    Wait Until Element Is Visible                ${item3}                                     5s
    set focus and press keys                     ${item3}                                     ENTER
    Wait Until Element Is not Visible            ${item3}                                     5s
    get css property value                       ${dropDownMenu}                              :focus

space: opens the menu and places focus on the first menu item
    Go To                                        ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    set focus and press keys                     ${dropDownMenu}                              SPACE
    Wait Until Element Is Visible                ${item1}                                     5s
    item should be focused                       ${item1}

down arrow: when focus is in a menu, moves focus to the next item
    Go To                                        ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    set focus and press keys                     ${dropDownMenu}                              ARROW_DOWN
    Wait Until Element Is Visible                ${item1}                                     5s
    Element Should Be Focused                    ${item1}
    Press Keys                                   ${None}                                      ARROW_DOWN
    item should be focused                       ${item2}
    Press Keys                                   ${None}                                      ARROW_DOWN
    item should be focused                       ${item3}

up arrow: when focus is in a menu, moves focus to the previous item
    Go To                                        ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    Click Element                                ${dropDownMenu}
    Wait Until Element Is Visible                ${item3}                                     5s
    set focus and press keys                     ${item3}                                     ARROW_UP
    item should be focused                       ${item2}
    Press Keys                                   ${None}                                      ARROW_UP
    item should be focused                       ${item1}

home: moves focus to the first item in the current menu or menubar
    Go To                                        ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    Click Element                                ${dropDownMenu}
    Wait Until Element Is Visible                ${item3}                                     5s
    set focus and press keys                     ${item3}                                     HOME
    item should be focused                       ${item1}

end: moves focus to the last item in the current menu or menubar
    Go To                                        ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    Click Element                                ${dropDownMenu}
    Wait Until Element Is Visible                ${item1}                                     5s
    set focus and press keys                     ${item1}                                     END
    item should be focused                       ${item3}

escape: close the menu that contains focus and return focus to the element
    Go To                                        ${STORYBOOK_URL}/${sampleKeepOpenedFalse}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    Click Element                                ${dropDownMenu}
    Wait Until Element Is Visible                ${item3}                                     5s
    set focus and press keys                     ${item3}                                     ESCAPE
    Wait Until Element Is not Visible            ${item3}                                     5s
    Element Should Be Focused                    ${dropDownMenu}

tab: moves focus to the next element in the tab sequence
    Go To                                        ${STORYBOOK_URL}/${sampleTabs}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    Click Element                                ${dropDownMenu}
    Wait Until Element Is Visible                ${item3}                                     5s
    set focus and press keys                     ${item3}                                     TAB
    Wait Until Element Is not Visible            ${item3}                                     5s
    Wait until is focused                        button2

shift + tab: moves focus to the previous element in the tab sequence
    [Tags]                                       bug-ie-webdriver
    Go To                                        ${STORYBOOK_URL}/${sampleTabs}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    Click Element                                ${dropDownMenu}
    Wait Until Element Is Visible                ${item3}                                     5s
    Press Keys                                   root                                         SHIFT+TAB
    Wait until is focused                        button1

Disabled menu items are focusable but cannot be activated
    Go To                                        ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element             ${dropDownMenu}                              10s
    Click Element                                ${dropDownMenu}
    Wait Until Element Is Visible                ${item1}                                     5s
    Press Keys                                   ${None}                                      ARROW_DOWN
    Element Should Be Focused                    ${item2}
    Press Keys                                   ${None}                                      ENTER
    Element Should Be Focused                    ${item2}


