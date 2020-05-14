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
focus first element (close button) when modal is opened
    Click Button                                ${buttonWarning}
    Wait Until Element Is Visible               ${dialog}               5s
    Element Should Be Focused                   ${dialogCloseButton}
    verify element is not focused               ${buttonApply}

close modal when dialog close button is pressed
    Click Button                                ${buttonWarning}
    Wait Until Element Is Visible               ${dialog}               5s
    Click Button                                ${dialogCloseButton}
    Wait Until Page Does Not Contain Element    ${dialog}               5s
