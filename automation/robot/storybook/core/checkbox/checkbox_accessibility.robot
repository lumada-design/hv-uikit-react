*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Test Template   verify checkbox accessibility as standard
Default Tags    smoke    pa11y

*** Keywords ***
verify checkbox accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    ${ignore_option}=    Set Variable    --ignore WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2 --ignore html-has-lang;landmark-one-main;region
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=corecheckbox--${sample}    ${standard}    ${optional} ${ignore_option}    

*** Test Cases ***                                               #sample                     #options
storybook sample checkboxdisabled against standard               checkboxdisabled            --ignore label
storybook sample checkboxlabel against standard                  checkboxlabel
storybook sample checkboxlabeldisabled against standard          checkboxlabeldisabled
    [Tags]             pa11y    issue-WCAG2AA
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/681
storybook sample checkboxonchange against standard               checkboxonchange
storybook sample checkboxonchangedisabled against standard       checkboxonchangedisabled
    [Tags]             pa11y    issue-WCAG2AA
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/681
storybook sample checkboxsimple against standard                 checkboxsimple              --ignore label
storybook sample checkboxstate against standard                  checkboxstate
