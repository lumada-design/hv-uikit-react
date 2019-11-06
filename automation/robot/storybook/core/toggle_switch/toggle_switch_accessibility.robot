*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    verify toggle switch accessibility as standard
Force Tags       pa11y
Documentation
...              | issue | ignore | description |
...              | 604 | many | all componente error assigned in 1 issue ignore color-contrast, InputCheckbox.Name, label |

*** Variables ***
${root-element}       --root-element "\#root > div.Component-content-4"
${ignore-contrast}    --ignore WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail --ignore color-contrast    # 681
${ignore-name-api}    --ignore WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputCheckbox.Name
${ignore-label}       --ignore WCAG2AA.Principle1.Guideline1_3.1_3_1.F68 --ignore label

*** Keywords ***
verify toggle switch accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coretoggle--${sample}    ${standard}    ${optional}

*** Test Cases ***                                                           #sample    #options
usual toggle switch scenarios against accessibility standard WCAG2AA         smoke    ${root-element} ${ignore-contrast} ${ignore-name-api} ${ignore-label}
    [Tags]    issue
