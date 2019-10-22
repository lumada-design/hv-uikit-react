*** Setting ***
Variables          ../../_resources/storybook_variables.yaml
Resource           ../../_resources/accessibility.robot
Test Template      verify multibutton accessibility as standard
Default Tags       smoke    pa11y

*** Keywords ***
verify multibutton accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    ${ignore_option}=    Set Variable    --ignore WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2 --ignore html-has-lang;landmark-one-main;region
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coremultibutton--${sample}    ${standard}    ${optional} ${ignore_option}

*** Test Cases ***                                                               #sample                                         #options
storybook sample fixedToggleHorizontalMultipleSelection against standard         fixedtogglehorizontalmultipleselection
storybook sample iconOnlyHorizontalMultipleSelection against standard            icononlyhorizontalmultipleselection
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/683
storybook sample iconOnlyHorizontalSingleSelection against standard              icononlyhorizontalsingleselection
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/683
storybook sample inputControlledValue against standard                           inputcontrolledvalue
storybook sample labelOnlyHorizontalMultipleSelection against standard           labelonlyhorizontalmultipleselection
storybook sample labelOnlyHorizontalSingleSelection against standard             labelonlyhorizontalsingleselection
storybook sample labelWithIconHorizontalMultipleSelection against standard       labelwithiconhorizontalmultipleselection
storybook sample labelWithIconHorizontalSingleSelection against standard         labelwithiconhorizontalsingleselection
storybook sample minimumSelectionHorizontalMultipleSelection against standard    minimumselectionhorizontalmultipleselection
storybook sample maximumSelectionHorizontalMultipleSelection against standard    maximumselectionhorizontalmultipleselection
storybook sample iconOnlyVerticalMultipleSelection against standard              icononlyverticalmultipleselection
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/683
storybook sample iconOnlyVerticalSingleSelection against standard                icononlyverticalsingleselection
    [Tags]             pa11y    issue-WCAG2AA    issue-Section508
    [Documentation]    https://github.com/pentaho/hv-uikit-react/issues/683
storybook sample labelOnlyVerticalMultipleSelection against standard             labelonlyverticalmultipleselection
storybook sample labelOnlyVerticalSingleSelection against standard               labelonlyverticalsingleselection
storybook sample labelWithIconVerticalMultipleSelection against standard         labelwithiconverticalmultipleselection
storybook sample labelWithIconVerticalSingleSelection against standard           labelwithiconverticalsingleselection
