*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/toggle_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook toggle page
Suite Teardown    Close Browser
Test Template     Test no toggle state transition when disabled
Force Tags        smoke

*** Keywords ***
Test no toggle state transition when disabled
    [Arguments]    ${locator}    ${clickOn}    ${state}    ${theme}
    apply storybook theme         ${theme}
    @{list}                       Set Variable                 color         left
    &{dict}                       get toggle css properties    ${locator}    ${list}
    Element Should Be Disabled    ${locator}
    Verify toggle check state     ${locator}                   ${state}
    Run Keyword And Ignore Error  Click Element                ${clickOn}
    Verify toggle check state     ${locator}                   ${state}
    verify toogle properties      ${locator}                   ${dict}

*** Test Cases ***                                                 toggle             clickOn                        checked    theme    
click on checked disabled toggle switch                            defaultLabelsDC    defaultLabelsDC                true       dawn     
click on left label of checked disabled toggle switch              defaultLabelsDC    defaultLabelsDC_leftButton     true       dawn     
click on unchecked disabled toggle switch                          customLabelsDis    customLabelsDis                ${None}    dawn     
click on right label of unchecked disabled toggle switch           customLabelsDis    customLabelsDis_rightButton    ${None}    dawn     
click on wicked checked disabled toggle switch                     defaultLabelsDC    defaultLabelsDC                true       wicked    
click on wicked left label of checked disabled toggle switch       defaultLabelsDC    defaultLabelsDC_leftButton     true       wicked   
click on wicked unchecked disabled toggle switch                   customLabelsDis    customLabelsDis                ${None}    wicked   
click on wicked right label of unchecked disabled toggle switch    customLabelsDis    customLabelsDis_rightButton    ${None}    wicked   