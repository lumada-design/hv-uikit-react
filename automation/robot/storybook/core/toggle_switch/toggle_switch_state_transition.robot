*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/toggle_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook toggle page
Suite Teardown    Close Browser
Test Template     Test toggle switch property check state transition
Force Tags        smoke   issue
Documentation
...    TC fails just when executed via jenkins, otherwise run test manually or via locally they always pass. (This problems are being mitigate)

*** Keywords ***
Test toggle switch property check state transition
    [Arguments]        ${locator}    ${state}
    [Documentation]
    ...
    ...    verify initial check status and then verify the change of CSS property and checked status when toggle is pressed
    ...    test states [ initial - changed - initial ]
    ...
    @{list}                                   Set Variable                 color         left
    &{dict}                                   get toggle css properties    ${locator}    ${list}
    Verify toggle check state                 ${locator}                   ${state}
    Click Element                             ${locator}
    verify different toggle css properties    ${locator}                   ${dict}
    Verify different toggle check state       ${locator}                   ${state}
    Click Element                             ${locator}
    verify toogle properties                  ${locator}                   ${dict}
    Verify toggle check state                 ${locator}                   ${state}

*** Test Cases ***                                                   toggle               checked
click on dawn toggle switch with labels                              defaultLabels        true
click on dawn toggle switch without labels                           noLabels             true
click on dawn toggle switch with custom labels                       customLabels         true
click on dawn toggle switch with Auxiliary Checkmark                 checkmark            true
click on dawn unchecked toggle switch with labels                    defaultLabelsUnc     ${None}
click on dawn unchecked toggle switch without labels                 noLabelsUnc          ${None}
click on dawn unchecked toggle switch with custom labels             customLabelsUnc      ${None}
click on dawn unchecked toggle switch with Auxiliary Checkmark       checkmarkUnc         ${None}
