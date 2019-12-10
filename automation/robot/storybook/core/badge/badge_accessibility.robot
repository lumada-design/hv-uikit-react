*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y

*** Variables ***
${pa11y_script}    pa11y --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=corebadge--

*** Test Cases ***
storybook sample badgesimple against standard          ${pa11y_script}badgesimple
storybook sample badgewithicon against standard        ${pa11y_script}badgewithicon
storybook sample badgewithtext against standard        ${pa11y_script}badgewithtext
