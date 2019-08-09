*** Setting ***
Library           SeleniumLibrary
Resource          _resources/button_keywords.robot
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between default-focus
Default Tags      smoke

*** Keywords ***
Test button state transition between default-focus
    [Arguments]        ${button_locator}             ${theme}
    [Documentation]
    ...                verify no css property change with press/click on disable button
    ...
    apply storybook theme          ${theme}
    Click Button                   ${button_locator}
    Alert Should Not Be Present
    Element Should Be Disabled     ${button_locator}
    verify element is not focused         ${button_locator}

*** Test Cases ***                                                           button_locator     	     theme
state transition disabled-focus on disabled default button                   disabledPrimary             default
state transition disabled-focus on disabled secondary button                 disabledSecondary           default
state transition disabled-focus on disabled ghost button                     disabledGhost               default
state transition disabled-focus on disabled ghost Secondary button           disabledGhostSecondary      default
state transition disabled-focus on dark disabled default button              disabledPrimary             dark
state transition disabled-focus on dark disabled secondary button            disabledSecondary           dark
state transition disabled-focus on dark disabled ghost button                disabledGhost               dark
state transition disabled-focus on dark disabled ghost Secondary button      disabledGhostSecondary      dark
