*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y result should be equal as file    
Force Tags       pa11y


*** Variables ***
${pa11yScript}    pa11y --reporter json 
    ...    --runner htmlcs --runner axe
    ...    --standard WCAG2AA
    ...    --root-element "div[class|='Component-content']"
    ...    ${STORYBOOK_URL}/iframe.html?id=corecard--


*** Test Cases ***                                pa11y script                     result file
selectable card against WCAG2AA standard          ${pa11yScript}--selectable       ${CURDIR}/WCAG2AA_selectable.json
no selectable card against WCAG2AA standard       ${pa11yScript}--no-selectable    ${CURDIR}/WCAG2AA_no-selectable.json

