*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Test Template   verify breadcrumb accessibility as standard
Default Tags    smoke    pa11y

*** Keywords ***
verify breadcrumb accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    ${ignore_option}=    Set Variable    --ignore WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2 --ignore WCAG2AA.Principle4.Guideline4_1.4_1_1.F77 --ignore html-has-lang;landmark-one-main;region
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=corebreadcrumb--${sample}    ${standard}    ${optional} ${ignore_option}      

*** Test Cases ***                                  #sample        #options
storybook sample breadcrumb1 against standard       breadcrumb1
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/688
storybook sample breadcrumb2 against standard       breadcrumb2
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/678
storybook sample breadcrumb3 against standard       breadcrumb3
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/678
storybook sample breadcrumb4 against standard       breadcrumb4
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/688
storybook sample breadcrumb5 against standard       breadcrumb5
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/678
