*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke    keyboard    bug-infrastructure-ie
Documentation     https://www.w3.org/TR/wai-aria-practices/#Listbox


*** Test Cases ***
focus next option when pressing DOWN on option
    [Tags]    bug-ie-webdriver
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=components-list--multi-selection-with-select-all
    Wait Until Element Is Visible               ${list}       10s
    set focus and press keys                    ${option1}    DOWN
    element attribute value should contain      ${option2}    class    focused
    Press Keys                                  ${None}       DOWN
    element attribute value should contain      ${option3}    class    focused
    wait until element attribute not contain    ${option2}    class    focused

focus the previous option when pressing UP on option
    [Tags]    bug-ie-webdriver
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=components-list--multi-selection-with-select-all
    Wait Until Element Is Visible               ${list}       10s
    set focus and press keys                    ${option5}    UP
    element attribute value should contain      ${option4}    class    focused
    Press Keys                                  ${None}       UP
    element attribute value should contain      ${option3}    class    focused
    wait until element attribute not contain    ${option4}    class    focused

focus the first option when pressing DOWN on last option
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=components-list--multi-selection-with-select-all
    Wait Until Element Is Visible             ${list}       10s
    set focus and press keys                  ${option5}    DOWN
    element attribute value should contain    ${option1}    class    focused

focus the last option when pressing UP on first option
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=components-list--multi-selection-with-select-all
    Wait Until Element Is Visible             ${list}       10s
    set focus and press keys                  ${option1}    UP
    element attribute value should contain    ${option5}    class    focused

exit focus from list when pressing TAB on option
    [Tags]    bug-ie-webdriver
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=components-list--multi-selection-with-select-all
    Wait Until Element Is Visible               ${list}       10s
    set focus and press keys                    ${option1}    TAB
    wait until element attribute not contain    ${option1}    class    focused
    wait until element attribute not contain    ${option2}    class    focused

focus first option when a list (no default options selected) is focused
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=components-list--test-list-not-selected
    Wait Until Element Is Visible             ${list}         10s
    Element Should Be Visible                 anchorButton
    set focus and press keys                  anchorButton    TAB
    Element Attribute Value Should Be         ${option1}      aria-selected    ${None}
    element attribute value should contain    ${option1}      class            focused

focus selected option when a list (default options selected) is focused
    [Documentation]  
    ...    If one or more options are selected before the listbox receives focus, focus is set on the first option in the list that is selected.
    ...    
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=components-list--test-list-focusable-selection
    Wait Until Element Is Visible             ${list}         10s
    Element Should Be Visible                 anchorButton
    set focus and press keys                  anchorButton    TAB
    element attribute value should contain    ${option3}      class            focused
    Element Attribute Value Should Be         ${option3}      aria-selected    true

focus disabled option when is a list menu 
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=components-list--test-list-selectable-disabled
    Wait Until Element Is Visible             ${menubar}      10s
    Element Should Be Visible                 anchorButton
    set focus and press keys                  anchorButton    TAB
    element attribute value should contain    ${option1}      class    focused
    element attribute value should contain    ${option1}      class    disabled

jump focus to next enable option when is a simple/pure list 
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=components-list--multi-selection-with-selectors
    Wait Until Element Is Visible             ${list}       10s
    Set Focus and press keys                  ${option3}    DOWN
    element attribute value should contain    ${option5}    class            focused
