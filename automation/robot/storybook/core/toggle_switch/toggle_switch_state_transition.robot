*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/toggle_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook toggle page
Suite Teardown    Close Browser
Test Template     Test toggle switch property check state transition
Default Tags      smoke    issue-ie    issue-chrome    issue-firefox
Metadata
...         | issue                     | browsers    |
...         | ------------------------- | ----------  |
...         | hv-uikit-react/issues/564 | ie, chrome  |
...         | hv-uikit-react/issues/547 | ie          |


*** Keywords ***
Test toggle switch property check state transition
    [Arguments]        ${locator}    ${state}    ${theme}
    [Documentation]
    ...        
    ...    verify initial check status and then verify the change of CSS property and checked status when toggle is pressed 
    ...    test states [ initial - changed - initial ]
    ...    
    apply storybook theme                     ${theme}
    @{list}                                   Set Variable                 color         left
    &{dict}                                   get toggle css properties    ${locator}    ${list}
    Verify toggle check state                 ${locator}                   ${state}
    Click Element                             ${locator}
    verify different toggle css properties    ${locator}                   ${dict}
    Verify different toggle check state       ${locator}                   ${state}
    Click Element                             ${locator}
    verify toogle properties                  ${locator}                   ${dict}
    Verify toggle check state                 ${locator}                   ${state}
    
*** Test Cases ***                                                   toggle               checked     theme   
click on dawn toggle switch with labels                              defaultLabels        true        dawn   
click on dawn toggle switch without labels                           noLabels             true        dawn   
click on dawn toggle switch with custom labels                       customLabels         true        dawn   
click on dawn toggle switch with Auxiliary Checkmark                 checkmark            true        dawn   
click on dawn unchecked toggle switch with labels                    defaultLabelsUnc     ${None}     dawn   
click on dawn unchecked toggle switch without labels                 noLabelsUnc          ${None}     dawn   
click on dawn unchecked toggle switch with custom labels             customLabelsUnc      ${None}     dawn   
click on dawn unchecked toggle switch with Auxiliary Checkmark       checkmarkUnc         ${None}     dawn   
click on wicked toggle switch with labels                            defaultLabels        true        wicked 
click on wicked toggle switch without labels                         noLabels             true        wicked 
click on wicked toggle switch with custom labels                     customLabels         true        wicked 
click on wicked toggle switch with Auxiliary Checkmark               checkmark            true        wicked 
click on wicked unchecked toggle switch with labels                  defaultLabelsUnc     ${None}     wicked 
click on wicked unchecked toggle switch without labels               noLabelsUnc          ${None}     wicked 
click on wicked unchecked toggle switch with custom labels           customLabelsUnc      ${None}     wicked 
click on wicked unchecked toggle switch with Auxiliary Checkmark     checkmarkUnc         ${None}     wicked 