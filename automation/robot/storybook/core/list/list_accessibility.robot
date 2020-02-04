*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y


*** Variables ***
${pa11yScript}    pa11y
...               --reporter json
...               --runner htmlcs --runner axe
...               --standard WCAG2AA
...               --root-element "div[class|='Component-content']"
...               ${STORYBOOK_URL}/iframe.html?id=corelist--


*** Test Cases ***
multiple selection list against WCAG2AA standard
    pa11y should not find errors    ${pa11yScript}multiselection-all
    
single selection list against WCAG2AA standard
    pa11y should not find errors    ${pa11yScript}single-selection
