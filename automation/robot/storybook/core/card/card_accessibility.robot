*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y

*** Variables ***
${pa11yScript}    pa11y --reporter json --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=corecard--

*** Test Cases ***
selectable card against WCAG2AA standard       ${pa11yScript}selectable
no selectable card against WCAG2AA standard    ${pa11yScript}no-selectable

