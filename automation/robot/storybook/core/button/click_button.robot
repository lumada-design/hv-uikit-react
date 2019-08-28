*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Library           RobotEyes                           ${TOLERANCE}
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Setup        setup RobotEyes
Test Template     Test button state transition between default-focus
Default Tags      smoke    bug-edge-webdriver    ie-discrepancy

*** Comments ***
bug-edge-webdriver:  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/
ie-discrepancy: with ie11 the button border don't change after click on button 

*** Keywords ***
Test button state transition between default-focus
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify button is focused when a button is clicked
    ...
    apply storybook theme        ${theme}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}
    capture image of             id=${button_locator}
    Compare Images

*** Test Cases ***                        button              theme
click on default button                   default             default
click on secondary button                 secondary           default
click on ghost button                     ghost               default
click on ghost Secondary button           ghostSecondary      default
click on dark default button              default             dark
click on dark secondary button            secondary           dark
click on dark ghost button                ghost               dark
click on dark ghost Secondary button      ghostSecondary      dark
