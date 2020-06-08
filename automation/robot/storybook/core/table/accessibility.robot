*** Setting ***
Resource         ../../_resources/accessibility.robot
Resource         table.Resource
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Cases ***
checkbox against WCAG2AA standard     ${visualizations}table--with-checkbox
empty against WCAG2AA standard        ${visualizations}table--empty
expander against WCAG2AA standard     ${visualizations}table--with-expander-and-custom-content
nulls against WCAG2AA standard        ${visualizations}table--with-null-values
secondary against WCAG2AA standard    ${visualizations}table--with-checkbox-and-secondary-actions
simple against WCAG2AA standard       ${visualizations}table--main


*** Comments ***
test cases dismissed because they are using a third part element (chart from google) that have contrast issues.
Storybook sample tablescrollingexpander against WCAG2AA standard      ${url}tablescrollingexpander
Storybook sample tabletypical against WCAG2AA standard                ${url}tabletypical
