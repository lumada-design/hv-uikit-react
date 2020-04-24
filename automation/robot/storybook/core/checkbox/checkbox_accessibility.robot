*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-selectors-checkbox--


*** Test Cases ***
storybook sample simple against WCAG2AA standard
    pa11y should not find errors    ${url}main

storybook sample with label and events against WCAG2AA standard
    pa11y should not find errors    ${url}with-click-action
