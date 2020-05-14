*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Template     Verify selectable card behavior
Variables         variables.yaml
Force Tags        smoke    keyboard


*** Keywords ***
Verify card is selected
    Element Attribute Value Should Be    ${aboveFooter}    aria-checked    true
    Checkbox Should Be Selected          ${Checkbox}

Verify card is not selected
    Element Attribute Value Should Be    ${aboveFooter}    aria-checked    false
    Checkbox Should Not Be Selected      ${Checkbox}

Verify selectable card behavior
    [Arguments]    ${locator}    ${keyBoards}    ${selected}
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-card--selectable
    Wait Until Element Is Enabled    ${locator}               10s
    set focus and press keys         ${locator}               ${keyBoards}
    Run Keyword If                   '${selected}'=='true'    Verify card is selected
    ...                              ELSE                     Verify card is not selected
    set focus and press keys         ${locator}               ${keyBoards}
    Verify card is not selected


*** Test Cases ***                                    locator           keyBoards     selected
select card with keys ALT+ENTER on content/header     ${aboveFooter}    ALT+RETURN    true
do not select card with keys ALT+ENTER on footer      ${footer}         ALT+RETURN    |
do not select card with keys ALT+ENTER on checkbox    ${checkbox}       ALT+RETURN    |
select card with keys SPACE on checkbox               ${checkbox}       SPACE         true
focus checkbox with keys TAB on content/header
    [Template]                                   NONE
    Go To                                        ${STORYBOOK_URL}/iframe.html?id=components-card--selectable
    Wait Until Element Is Enabled                ${aboveFooter}                                          10s
    set focus and press keys                     ${aboveFooter}                                          TAB
    Element Should Be Focused                    ${Checkbox}
