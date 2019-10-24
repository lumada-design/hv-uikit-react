*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    verify snackbar accessibility as standard
Force Tags       pa11y
Documentation
...              | issue | ignore | description |
...              | 708 | WCAG2AA.Principle4.Guideline4_1.4_1_1.F77    | banner - WCAG2AA "Duplicate id attribute value" on (<span id="client-snackbar"...)    |
...              | 711 | WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail\; AXE color-contrast | Actions link - This element has insufficient contrast |

*** Variables ***
${root-element}           --root-element "\#root > div.Component-content-4"
${ignore-duplicate-id}    --ignore WCAG2AA.Principle4.Guideline4_1.4_1_1.F77 --ignore duplicate-id    # issue 708
${ignore-contrast}        --ignore WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail --ignore color-contrast    # issue 711

*** Keywords ***
verify snackbar accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coresnackbar--${sample}    ${standard}    ${optional}

*** Test Cases ***                                #sample      #options
storybook sample snackbar5 against standard       snackbar5    ${root-element} ${ignore-contrast} ${ignore-duplicate-id}
    [Tags]    issue
