*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test there is no state transition on click a disabled button
Force Tags        smoke

*** Keywords ***
Test there is no state transition on click a disabled button
    [Arguments]        ${button_locator}
    [Documentation]
    ...                verify a disabled button don't change when is clicked
    ...
    Click Button                     ${button_locator}
    Alert Should Not Be Present
    Element Should Be Disabled       ${button_locator}
    verify element is not focused    ${button_locator}

*** Test Cases ***                                 button_locator
click on disabled default button                   disabledPrimary
click on disabled secondary button                 disabledSecondary
click on disabled ghost button                     disabledGhost
click on disabled ghost Secondary button           disabledGhostSecondary
click on disabled semantic button                  disabledSemantic
