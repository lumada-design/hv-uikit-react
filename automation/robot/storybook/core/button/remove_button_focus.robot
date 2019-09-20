*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between focus-default
Default Tags      smoke    bug-edge-webdriver

*** Comments ***
bug-edge-webdriver  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test button state transition between focus-default
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify button lost the focus state when is clicked other element
    ...
    apply storybook theme            ${theme}
    Click Button                     ${button_locator}
    Alert Should Be Present
    Element Should Be Focused        ${button_locator}
    remove focus
    Element Should Be Enabled        ${button_locator}
    verify element is not focused    ${button_locator}

*** Test Cases ***                               button_locator      theme
remove focus on default button                   default             default
remove focus on secondary button                 secondary           default
remove focus on ghost button                     ghost               default
remove focus on ghost Secondary button           ghostSecondary      default
remove focus on dark default button              default             dark
remove focus on dark secondary button            secondary           dark
remove focus on dark ghost button                ghost               dark
remove focus on dark ghost Secondary button      ghostSecondary      dark
