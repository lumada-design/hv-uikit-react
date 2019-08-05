*** Setting ***
Library           SeleniumLibrary
Resource          _resources/button_keywords.robot
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between focus-default
Default Tags      smoke

*** Keywords ***
Test button state transition between focus-default
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify button is lost the focus when is pressed/clicked other element
    ...
    apply storybook theme        ${theme}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}
    remove focus
    Element Should Be Enabled    ${button_locator}
    verify element is not focused       ${button_locator}

*** Test Cases ***                                                 button_locator      theme
state transition focus-default on default button                   default             default
state transition focus-default on secondary button                 secondary           default
state transition focus-default on ghost button                     ghost               default
state transition focus-default on ghost Secondary button           ghostSecondary      default
state transition focus-default on dark default button              default             dark
state transition focus-default on dark secondary button            secondary           dark
state transition focus-default on dark ghost button                ghost               dark
state transition focus-default on dark ghost Secondary button      ghostSecondary      dark
