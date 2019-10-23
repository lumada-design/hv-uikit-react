*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Test Template   verify radio accessibility as standard
Default Tags    smoke    pa11y


*** Keywords ***
verify radio accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    ${ignore_option}=    Set Variable    --ignore WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2 --ignore html-has-lang;landmark-one-main;region
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--${sample}    ${standard}    ${optional} ${ignore_option}

*** Test Cases ***                                                  #sample                        #options
storybook sample radiobuttondisabled against standard               radiobuttondisabled            --ignore label
storybook sample radiobuttonlabel against standard                  radiobuttonlabel
storybook sample radiobuttonlabeldisabled against standard          radiobuttonlabeldisabled       --ignore label
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/681
storybook sample radiobuttononchange against standard               radiobuttononchange
storybook sample radiobuttononchangedisabled against standard       radiobuttononchangedisabled    
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/681
storybook sample radiobuttonsimple against standard                 radiobuttonsimple              --ignore label
storybook sample radiobuttonstate against standard                  radiobuttonstate
