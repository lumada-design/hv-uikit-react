*** Setting ***
Variables        ../../_resources/storybook_variables.yaml
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-multi-button--


*** Test Cases ***
storybook sample enforced-selection against standard      ${url}enforced-selection
storybook sample only-labels against standard             ${url}only-labels
storybook sample minimum-selection against standard       ${url}minimum-selection
storybook sample maximum-selection against standard       ${url}maximum-selection
storybook sample only-icons against standard              ${url}only-icons
storybook sample multiple-selection against standard      ${url}multiple-selection
storybook sample vertical-orientation against standard    ${url}vertical-orientation
