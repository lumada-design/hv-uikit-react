*** Setting ***
Library           SeleniumLibrary
Resource          _resources/button_keywords.robot
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between disable-hover-disable
Default Tags      smoke

*** Keywords ***
Test button state transition between disable-hover-disable
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify no css property change with mouse hover on disable button
    ...
    apply storybook theme           ${theme}
    verify CSS properties do not changes with mouse over    ${button_locator}
    remove mouse over button

*** Test Cases ***                                                                    button_locator              theme
state transition disabled-hover-disabled on disabled default button                   disabledPrimary             default
state transition disabled-hover-disabled on disabled secondary button                 disabledSecondary           default
state transition disabled-hover-disabled on disabled ghost button                     disabledGhost               default
state transition disabled-hover-disabled on disabled ghost Secondary button           disabledGhostSecondary      default
state transition disabled-hover-disabled on dark disabled default button              disabledPrimary             dark
state transition disabled-hover-disabled on dark disabled secondary button            disabledSecondary           dark
state transition disabled-hover-disabled on dark disabled ghost button                disabledGhost               dark
state transition disabled-hover-disabled on dark disabled ghost Secondary button      disabledGhostSecondary      dark
