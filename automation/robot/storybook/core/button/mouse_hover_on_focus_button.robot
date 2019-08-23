*** Setting ***
Library             SeleniumLibrary
Resource            _resources/button_keywords.robot
Suite Setup         open storybook button page
Suite Teardown      Close Browser
Test Template       Test button state transition between focus-hover-focus
Default Tags        smoke    unknow-ie     bug-edge-webdriver

*** Comments ***
bug-edge-webdriver  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test button state transition between focus-hover-focus
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify just the button background-color change with mouse over on pressed/focus button
    ...
    apply storybook theme           ${theme}
    Click Button                    ${button_locator}
    Alert Should Be Present
    verify button background-color change with mouse over    ${button_locator}
    remove mouse over button

*** Test Cases ***                                                     button_locator      theme
state transition focus-hover-focus on default button                   default             default
state transition focus-hover-focus on secondary button                 secondary           default
state transition focus-hover-focus on ghost button                     ghost               default
state transition focus-hover-focus on ghost Secondary button           ghostSecondary      default
state transition focus-hover-focus on dark default button              default             dark
state transition focus-hover-focus on dark secondary button            secondary           dark
state transition focus-hover-focus on dark ghost button                ghost               dark
state transition focus-hover-focus on dark ghost Secondary button      ghostSecondary      dark
