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
    [Arguments]        ${button_locator}
    [Documentation]
    ...                verify button don't change with mouse hover it
    ...
    Wait Until Element Is Visible    ${button_locator}
    verify CSS properties do not changes with mouse hover    ${button_locator}

*** Test Cases ***                                       button_locator         
mouse hover on disabled default button                   disabledPrimary        
mouse hover on disabled secondary button                 disabledSecondary      
mouse hover on disabled ghost button                     disabledGhost          
mouse hover on disabled ghost Secondary button           disabledGhostSecondary 
