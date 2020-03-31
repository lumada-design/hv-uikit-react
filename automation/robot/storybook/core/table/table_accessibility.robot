*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors    
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=coretable--


*** Test Cases ***
Storybook sample tablecheckbox against WCAG2AA standard     ${url}tablecheckbox    
Storybook sample tableempty against WCAG2AA standard        ${url}tableempty    
Storybook sample tableexpander against WCAG2AA standard     ${url}tableexpander
Storybook sample tablenulls against WCAG2AA standard        ${url}tablenulls
Storybook sample tablesecondary against WCAG2AA standard    ${url}tablesecondary
Storybook sample tablesimple against WCAG2AA standard       ${url}tablesimple


*** Comments ***
test cases dismissed because they are using a third part element (chart from google) that have contrast issues.
Storybook sample tablescrollingexpander against WCAG2AA standard      ${url}tablescrollingexpander
Storybook sample tabletypical against WCAG2AA standard                ${url}tabletypical