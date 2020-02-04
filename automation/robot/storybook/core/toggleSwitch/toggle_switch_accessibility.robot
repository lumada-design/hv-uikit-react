*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y
Documentation
...              | issue | ignore | description |
...              | 604 | many | all componente error assigned in 1 issue ignore color-contrast, InputCheckbox.Name, label |

*** Variables ***
${pa11y_script}    pa11y --reporter json --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=coretoggle--toggleon

*** Test Cases ***
usual toggle switch scenarios against accessibility standard WCAG2AA
    [Documentation]
    ...    = ATTENTION! =
    ...     - the expected 3 errors are reported and waiting resolution on: https://github.com/pentaho/hv-uikit-react/issues/604
    ...    ---
    pa11y result should be equal as file    ${pa11y_script}    ${CURDIR}/WCAG2AA_toggleon.json
