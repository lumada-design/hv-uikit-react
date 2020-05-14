*** Setting ***
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Suite Setup       open storybook
Test Setup        Go To URL And Wait Until Element Is Visible    ${STORYBOOK_URL}/iframe.html?id=components-dropdown--multi-selection    ${dropdown}    10s
Suite Teardown    Close Browser
Force Tags        smoke     keyboard


*** Test Cases ***
enter: drop options when dropdown is focused and is pressed ENTER after an ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${options}     2s
    Press Keys                           None           ESCAPE
    Wait Until Element Is not Visible    ${options}     2s
    Press Keys                           None           ENTER
    Wait Until Element Is Visible        ${options}     2s

escape: close dropdown when is pressed ESCAPE
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${options}     2s
    Press Keys                           None           ESCAPE
    Wait Until Element Is not Visible    ${options}     2s

escape: cancel dropdown selection when is pressed ESCAPE
    Click Element                        ${dropdown}
    Click Element                        ${option1}
    Element Attribute Value Should Be    ${option1}     aria-selected    true
    set focus and press keys             ${dropdown}    ESCAPE
    Click Element                        ${dropdown}
    Element Attribute Value Should Be    ${option1}     aria-selected    false

tab: move focus to apply button when focus is on last option and is pressed TAB
    Click Element                    ${dropdown}
    Wait Until Element Is Visible    ${option4}        2s
    set focus and press keys         ${option4}        TAB
    Element Should Be Focused        ${buttonApply}

tab: move focus to cancel button when focus is on apply button and is pressed TAB
    Click Element                    ${dropdown}
    Wait Until Element Is Visible    ${option4}         2s
    set focus and press keys         ${buttonApply}     TAB
    Element Should Be Focused        ${buttonCancel}
