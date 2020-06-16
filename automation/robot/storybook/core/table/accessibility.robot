*** Setting ***
Resource         ../../_resources/accessibility.robot
Resource         table.Resource
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Cases ***
checkbox against WCAG2AA standard     ${iframe_clientSide}
empty against WCAG2AA standard        ${iframe_empty}
expander against WCAG2AA standard     ${iframe_expander}
nulls against WCAG2AA standard        ${iframe_NullValues}
secondary against WCAG2AA standard    ${iframe_secondaryActions}
simple against WCAG2AA standard       ${iframe_main}


*** Comments ***
test cases dismissed because they are using a third part element (chart from google) that have contrast issues.
Storybook sample tablescrollingexpander against WCAG2AA standard      ${url}tablescrollingexpander
Storybook sample tabletypical against WCAG2AA standard                ${url}tabletypical
