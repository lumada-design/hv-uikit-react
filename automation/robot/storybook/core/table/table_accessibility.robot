*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors    
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=visualizations-table--


*** Test Cases ***
Storybook sample table checkbox against WCAG2AA standard     ${url}with-checkbox
Storybook sample table empty against WCAG2AA standard        ${url}empty
Storybook sample table expander against WCAG2AA standard     ${url}with-expander
Storybook sample table nulls against WCAG2AA standard        ${url}with-null-values
Storybook sample table secondary against WCAG2AA standard    ${url}with-checkbox-and-secondary-actions
Storybook sample table simple against WCAG2AA standard       ${url}main


*** Comments ***
test cases dismissed because they are using a third part element (chart from google) that have contrast issues.
Storybook sample tablescrollingexpander against WCAG2AA standard      ${url}tablescrollingexpander
Storybook sample tabletypical against WCAG2AA standard                ${url}tabletypical
