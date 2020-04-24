*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-selectors-toggle-button--


*** Test Cases ***
storybook sample sample1 against standard WCAG2AA     ${url}main
storybook sample sample3 against standard WCAG2AA     ${url}animated
