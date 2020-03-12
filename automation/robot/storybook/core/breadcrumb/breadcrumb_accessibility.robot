*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y


*** Variables ***
${pa11yScript}    pa11y --reporter json
...               --runner htmlcs --runner axe
...               --standard WCAG2AA
...               --root-element "div[class^=Component-content]"
...               ${STORYBOOK_URL}


*** Test Cases ***
storybook sample breadcrumb2 against standard
    pa11y should not find errors    ${pa11yScript}/iframe.html?id=corebreadcrumb--breadcrumb2
    

storybook sample breadcrumb6 against standard
    pa11y should not find errors    ${pa11yScript}/iframe.html?id=corebreadcrumb--breadcrumb6