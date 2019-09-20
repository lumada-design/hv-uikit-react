*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/toggle_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook toggle page
Suite Teardown    Close Browser
Test Template     Test toggle state transition pressing labels
Default Tags      smoke    issue-ie    issue-chrome    issue-firefox
Metadata        
...    | issue                     | browsers   |
...    | ------------------------- | ---------- |
...    | hv-uikit-react/issues/564 | ie, chrome | 
...    | hv-uikit-react/issues/547 | ie         |

*** Keywords ***
Test toggle state transition pressing labels
    [Arguments]    ${state}    ${firstLabel}    ${secondLabel}    ${toggle}    ${theme}
    [Documentation]    
    ...        
    ...    verify initial check status and then verify the change of CSS property and checked status when toggle labels are pressed 
    ...    test states [ initial - changed - initial ]
    ...    
    apply storybook theme                     ${theme}
    @{list}                                   Set Variable                 color        left
    &{dict}                                   get toggle css properties    ${toggle}    ${list}
    Verify toggle check state                 ${toggle}                    ${state}
    Click Element                             ${firstLabel}
    verify different toggle css properties    ${toggle}                    ${dict}
    Verify different toggle check state       ${toggle}                    ${state}
    Click Element                             ${secondLabel}
    verify toogle properties                  ${toggle}                    ${dict}
    Verify toggle check state                 ${toggle}                    ${state}

*** Test Cases ***                                           checked    firstLabel                      secondLabel                    toggle              theme    
click on default labels of dawn toggle switch                true       defaultLabels_leftButton        defaultLabels_rightButton      defaultLabels       dawn      
click on custom labels of dawn toggle switch                 true       customLabels_leftButton         customLabels_rightButton       customLabels        dawn     
click on default labels of dawn unchecked toggle switch      ${None}    defaultLabelsUnc_rightButton    defaultLabelsUnc_leftButton    defaultLabelsUnc    dawn     
click on custom labels of dawn unchecked toggle switch       ${None}    customLabelsUnc_rightButton     customLabelsUnc_leftButton     customLabelsUnc     dawn     
click on default labels of wicked toggle switch              true       defaultLabels_leftButton        defaultLabels_rightButton      defaultLabels       wicked   
click on custom labels of wicked toggle switch               true       customLabels_leftButton         customLabels_rightButton       customLabels        wicked   
click on default labels of wicked unchecked toggle switch    ${None}    defaultLabelsUnc_rightButton    defaultLabelsUnc_leftButton    defaultLabelsUnc    wicked   
click on custom labels of wicked unchecked toggle switch     ${None}    customLabelsUnc_rightButton     customLabelsUnc_leftButton     customLabelsUnc     wicked   
