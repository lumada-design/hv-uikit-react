*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/toggle_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook toggle page
Suite Teardown    Close Browser
Test Template     Test toggle state transition pressing labels
Force Tags        smoke    bug-jenkins
Documentation
...               bug-jenkins label:
...               TC fails just when executed via jenkins, otherwise run test manually or via locally they always pass.

*** Keywords ***
Test toggle state transition pressing labels
    [Arguments]    ${state}    ${firstLabel}    ${secondLabel}    ${toggle}
    [Documentation]
    ...
    ...    verify initial check status and then verify the change of CSS property and checked status when toggle labels are pressed
    ...    test states [ initial - changed - initial ]
    ...
    @{list}                                   Set Variable                 color        left
    &{dict}                                   get toggle css properties    ${toggle}    ${list}
    Verify toggle check state                 ${toggle}                    ${state}
    Click Element                             ${firstLabel}
    verify different toggle css properties    ${toggle}                    ${dict}
    Verify different toggle check state       ${toggle}                    ${state}
    Click Element                             ${secondLabel}
    verify toogle properties                  ${toggle}                    ${dict}
    Verify toggle check state                 ${toggle}                    ${state}

*** Test Cases ***                                           checked    firstLabel                      secondLabel                    toggle
click on default labels of dawn toggle switch                true       defaultLabels_leftButton        defaultLabels_rightButton      defaultLabels
click on custom labels of dawn toggle switch                 true       customLabels_leftButton         customLabels_rightButton       customLabels
click on default labels of dawn unchecked toggle switch      ${None}    defaultLabelsUnc_rightButton    defaultLabelsUnc_leftButton    defaultLabelsUnc
click on custom labels of dawn unchecked toggle switch       ${None}    customLabelsUnc_rightButton     customLabelsUnc_leftButton     customLabelsUnc
