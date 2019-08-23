*** Setting ***
Library           SeleniumLibrary
Resource          _resources/button_keywords.robot
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between focus-focus
Default Tags      smoke     bug-edge-webdriver

*** Comments ***
bug-edge-webdriver  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test button state transition between focus-focus
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify no css property change with press/click on already pressed/focus button
    ...
    apply storybook theme        ${theme}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}

*** Test Cases ***                                               button              theme
state transition focus-focus on default button                   default             default
state transition focus-focus on secondary button                 secondary           default
state transition focus-focus on ghost button                     ghost               default
state transition focus-focus on ghost Secondary button           ghostSecondary      default
state transition focus-focus on dark default button              default             dark
state transition focus-focus on dark secondary button            secondary           dark
state transition focus-focus on dark ghost button                ghost               dark
state transition focus-focus on dark ghost Secondary button      ghostSecondary      dark
