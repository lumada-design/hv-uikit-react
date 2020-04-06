*** Setting ***
Variables         ../../../_resources/storybook_variables.yaml
Resource          ../../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${pa11yScript}    pa11y
...               --reporter json
...               --runner htmlcs --runner axe
...               --standard WCAG2AA
...               --root-element "div[class|='Component-content']"
...               ${STORYBOOK_URL}/iframe.html?id=coreverticalnavigation--


*** Test Cases ***
Static vertical navigation against WCAG2AA standard      ${url}static
Collapse vertical navigation against WCAG2AA standard    ${url}collapsable
