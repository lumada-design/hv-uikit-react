*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Test Template   verify snackbar accessibility as standard
Default Tags    smoke    pa11y

*** Keywords ***
verify snackbar accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    ${ignore_option}=    Set Variable    --ignore WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2 --ignore html-has-lang;landmark-one-main;region
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coresnackbar--${sample}    ${standard}    ${optional} ${ignore_option}

*** Test Cases ***                                #sample      #options
storybook sample snackbar5 against standard       snackbar5    --ignore WCAG2AA.Principle4.Guideline4_1.4_1_1.F77
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/681
