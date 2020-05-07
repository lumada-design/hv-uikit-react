*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Variables         variables.yaml
Suite Setup       open storybook     ${STORYBOOK_URL}/iframe.html?id=components-modal--text-and-semantic
Test Setup        Run Keywords       Reload Page
...               AND                Wait Until Element Is Enabled    ${buttonWarning}    10s
Suite Teardown    Close Browser
Force Tags        smoke    keyboard


*** Test Cases ***
navigate to next component element when TAB is pressed
    Click Button                     Warning
    Wait Until Element Is Visible    ${dialog}               5s
    Press Keys                       None                    TAB
    Element Should Be Focused        ${buttonApply}
    Press Keys                       None                    TAB
    Element Should Be Focused        ${buttonCancel}
    Press Keys                       None                    TAB
    Element Should Be Focused        ${dialogCloseButton}

close modal when ESCAPE is pressed
    Click Button                                Warning
    Wait Until Element Is Visible               ${dialog}    5s
    Press Keys                                  None         ESCAPE
    Wait Until Page Does Not Contain Element    ${dialog}    5s
