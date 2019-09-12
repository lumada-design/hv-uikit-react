*** Setting ***
Variables          ../../_resources/storybook_variables.yaml
Resource           _resources/button_keywords.robot
Library            SeleniumLibrary
Suite Setup        open storybook button page
Suite Teardown     Close Browser
Test Template      Test there is no state transition on mouse hover disabled button
Default Tags       smoke

*** Keywords ***
Test there is no state transition on mouse hover disabled button
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify button don't change with mouse hover it
    ...
    apply storybook theme            ${theme}
    Wait Until Element Is Visible    ${button_locator}
    verify CSS properties do not changes with mouse hover    ${button_locator}

*** Test Cases ***                                       button_locator              theme
mouse hover on disabled default button                   disabledPrimary             default
mouse hover on disabled secondary button                 disabledSecondary           default
mouse hover on disabled ghost button                     disabledGhost               default
mouse hover on disabled ghost Secondary button           disabledGhostSecondary      default
mouse hover on disabled dark default button              disabledPrimary             dark
mouse hover on disabled dark secondary button            disabledSecondary           dark
mouse hover on disabled dark ghost button                disabledGhost               dark
mouse hover on disabled dark ghost Secondary button      disabledGhostSecondary      dark
