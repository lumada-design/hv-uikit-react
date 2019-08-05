*** Setting ***
Library           SeleniumLibrary
Resource          _resources/button_keywords.robot
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between default-focus
Default Tags      smoke

*** Keywords ***
Test button state transition between default-focus
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify button is focused when a button is pressed/clicked
    ...
    apply storybook theme        ${theme}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}

*** Test Cases ***                                                 button              theme
state transition default-focus on default button                   default             default
state transition default-focus on secondary button                 secondary           default
state transition default-focus on ghost button                     ghost               default
state transition default-focus on ghost Secondary button           ghostSecondary      default
state transition default-focus on dark default button              default             dark
state transition default-focus on dark secondary button            secondary           dark
state transition default-focus on dark ghost button                ghost               dark
state transition default-focus on dark ghost Secondary button      ghostSecondary      dark
