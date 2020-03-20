*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=corelist--


*** Test Cases ***
multiple selection list against WCAG2AA standard     ${url}multiselection-all
single selection list against WCAG2AA standard       ${url}single-selection
