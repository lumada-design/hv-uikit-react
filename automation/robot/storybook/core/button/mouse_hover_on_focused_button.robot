*** Setting ***
Variables          ../../_resources/storybook_variables.yaml
Resource           _resources/button_keywords.robot
Library            SeleniumLibrary
Library            RobotEyes                           ${TOLERANCE}
Suite Setup        open storybook button page
Suite Teardown     Close Browser
Test Setup         setup RobotEyes
Test Template      Test button state transition between focus-hover-focus
Default Tags       smoke      bug-edge-webdriver

*** Comments ***
bug-edge-webdriver  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test button state transition between focus-hover-focus
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify just the button background-color change with mouse over on focused button
    ...
    apply storybook theme       ${theme}
    Click Button                ${button_locator}
    Alert Should Be Present
    verify button background-color change with mouse over    ${button_locator}
    capture image of            id=${button_locator}
    remove mouse over button
    capture image of            id=${button_locator}
    Compare Images

*** Test Cases ***                                      button_locator      theme
mouse hover on focused default button                   default             default
mouse hover on focused secondary button                 secondary           default
mouse hover on focused ghost button                     ghost               default
mouse hover on focused ghost Secondary button           ghostSecondary      default
mouse hover on focused dark default button              default             dark
mouse hover on focused dark secondary button            secondary           dark
mouse hover on focused dark ghost button                ghost               dark
mouse hover on focused dark ghost Secondary button      ghostSecondary      dark
