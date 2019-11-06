*** Setting ***
Variables        ../../_resources/storybook_variables.yaml
Resource         ../../_resources/accessibility.robot
Test Template    verify multibutton accessibility as standard
Force Tags       pa11y
Documentation
...              | issue | ignore | description |
...              | 683 | WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Button.Name\; button-name (AXE)  | button element does not have a name available to an accessibility API https://dequeuniversity.com/rules/axe/3.3/button-name?application=axeAPI |

*** Variables ***
${root-element}    --root-element "\#root > div.Component-content-4"
${name-api}        --ignore WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Button.Name --ignore button-name   # issue 683

*** Keywords ***
verify multibutton accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coremultibutton--${sample}    ${standard}    ${optional}

*** Test Cases ***                                                               #sample                                         #options
storybook sample fixedToggleHorizontalMultipleSelection against standard         fixedtogglehorizontalmultipleselection
storybook sample iconOnlyHorizontalMultipleSelection against standard            icononlyhorizontalmultipleselection            ${root-element} ${name-api}
    [Tags]    issue
storybook sample iconOnlyHorizontalSingleSelection against standard              icononlyhorizontalsingleselection              ${root-element} ${name-api}
    [Tags]    issue
storybook sample inputControlledValue against standard                           inputcontrolledvalue
storybook sample labelOnlyHorizontalMultipleSelection against standard           labelonlyhorizontalmultipleselection
storybook sample labelOnlyHorizontalSingleSelection against standard             labelonlyhorizontalsingleselection
storybook sample labelWithIconHorizontalMultipleSelection against standard       labelwithiconhorizontalmultipleselection
storybook sample labelWithIconHorizontalSingleSelection against standard         labelwithiconhorizontalsingleselection
storybook sample minimumSelectionHorizontalMultipleSelection against standard    minimumselectionhorizontalmultipleselection
storybook sample maximumSelectionHorizontalMultipleSelection against standard    maximumselectionhorizontalmultipleselection
storybook sample iconOnlyVerticalMultipleSelection against standard              icononlyverticalmultipleselection              ${root-element} ${name-api}
    [Tags]    issue
storybook sample iconOnlyVerticalSingleSelection against standard                icononlyverticalsingleselection                ${root-element} ${name-api}
    [Tags]    issue
storybook sample labelOnlyVerticalMultipleSelection against standard             labelonlyverticalmultipleselection
storybook sample labelOnlyVerticalSingleSelection against standard               labelonlyverticalsingleselection
storybook sample labelWithIconVerticalMultipleSelection against standard         labelwithiconverticalmultipleselection
storybook sample labelWithIconVerticalSingleSelection against standard           labelwithiconverticalsingleselection
