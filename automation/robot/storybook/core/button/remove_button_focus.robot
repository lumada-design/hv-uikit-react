*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between focus-default
Force Tags        smoke    bug-edge-webdriver

*** Comments ***
bug-edge-webdriver  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test button state transition between focus-default
    [Arguments]        ${button_locator}
    [Documentation]
    ...                verify button lost the focus state when is clicked other element
    ...
    Click Button                     ${button_locator}
    Alert Should Be Present
    Element Should Be Focused        ${button_locator}
    remove focus
    Element Should Be Enabled        ${button_locator}
    verify element is not focused    ${button_locator}

*** Test Cases ***                               button_locator
remove focus on default button                   default
remove focus on secondary button                 secondary
remove focus on ghost button                     ghost
remove focus on ghost Secondary button           ghostSecondary
remove focus on semantic button                  semantic
