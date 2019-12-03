*** Setting ***
Variables          ../../_resources/storybook_variables.yaml
Resource           _resources/button_keywords.robot
Library            SeleniumLibrary
Suite Setup        open storybook button page
Suite Teardown     Close Browser
Test Template      Test button state transition between focus-hover-focus
Default Tags       smoke      bug-edge-webdriver

*** Comments ***
bug-edge-webdriver  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test button state transition between focus-hover-focus
    [Arguments]        ${button_locator}
    [Documentation]
    ...                verify just the button background-color change with mouse over on focused button
    ...
    Click Button                ${button_locator}
    Alert Should Be Present
    Element Should Be Focused   ${button_locator}
    verify button background-color change on and removing mouse hover    ${button_locator}

*** Test Cases ***                                      button_locator
mouse hover on focused default button                   default
mouse hover on focused secondary button                 secondary
mouse hover on focused ghost button                     ghost
mouse hover on focused ghost Secondary button           ghostSecondary
mouse hover on focused semantic button                  semantic
