*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test there is no state transition on click a disabled button
Default Tags      smoke

*** Keywords ***
Test there is no state transition on click a disabled button
    [Arguments]        ${button_locator}             ${theme}
    [Documentation]
    ...                verify a disabled button don't change when is clicked
    ...
    apply storybook theme            ${theme}
    Click Button                     ${button_locator}
    Alert Should Not Be Present
    Element Should Be Disabled       ${button_locator}
    verify element is not focused    ${button_locator}

*** Test Cases ***                                 button_locator     	       theme
click on disabled default button                   disabledPrimary             default
click on disabled secondary button                 disabledSecondary           default
click on disabled ghost button                     disabledGhost               default
click on disabled ghost Secondary button           disabledGhostSecondary      default
click on disabled dark default button              disabledPrimary             dark
click on disabled dark secondary button            disabledSecondary           dark
click on disabled dark ghost button                disabledGhost               dark
click on disabled dark ghost Secondary button      disabledGhostSecondary      dark
