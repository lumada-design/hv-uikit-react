*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors    
Force Tags       pa11y


*** Variables ***
${pa11yScript}    pa11y --reporter json
...               --runner htmlcs --runner axe
...               --standard WCAG2AA
...               --root-element "div[class|='Component-content']"
...               ${STORYBOOK_URL}/iframe.html?id=coretable--


*** Test Cases ***
Storybook sample tablecheckbox against WCAG2AA standard     ${pa11y_script}tablecheckbox
Storybook sample tableempty against WCAG2AA standard        ${pa11y_script}tableempty
Storybook sample tableexpander against WCAG2AA standard     ${pa11y_script}tableexpander
Storybook sample tablenulls against WCAG2AA standard        ${pa11y_script}tablenulls
Storybook sample tablesecondary against WCAG2AA standard    ${pa11y_script}tablesecondary
Storybook sample tablesimple against WCAG2AA standard       ${pa11y_script}tablesimple


*** Comments ***
was dismissed the below test cases/samples because they are using a third part element ( chart from google ) that have contrast issues.
Storybook sample tablescrollingexpander against WCAG2AA standard      ${pa11y_script}tablescrollingexpander
Storybook sample tabletypical against WCAG2AA standard                ${pa11y_script}tabletypical