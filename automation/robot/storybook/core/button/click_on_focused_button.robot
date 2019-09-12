*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test there is no state transition on click a focused button
Default Tags      smoke    bug-edge-webdriver

*** Comments ***
bug-edge-webdriver  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test there is no state transition on click a focused button
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify a focused button don't change when is clicked
    ...
    apply storybook theme        ${theme}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}

*** Test Cases ***                              button              theme
click on focus default button                   default             default
click on focus secondary button                 secondary           default
click on focus ghost button                     ghost               default
click on focus ghost Secondary button           ghostSecondary      default
click on focus dark default button              default             dark
click on focus dark secondary button            secondary           dark
click on focus dark ghost button                ghost               dark
click on focus dark ghost Secondary button      ghostSecondary      dark
