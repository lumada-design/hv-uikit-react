*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Test Template   verify toggle switch accessibility as standard
Default Tags    smoke    pa11y

*** Keywords ***
verify toggle switch accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    ${ignore_option}=    Set Variable    --ignore WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2 --ignore html-has-lang;landmark-one-main;region
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coretoggle--${sample}    ${standard}    ${optional} ${ignore_option}

*** Test Cases ***                                                           #sample    #options
usual toggle switch scenarios against accessibility standard WCAG2AA         smoke
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/604
