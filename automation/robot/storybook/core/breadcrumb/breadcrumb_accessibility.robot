*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-breadcrumb--


*** Test Cases ***
storybook sample breadcrumb2 against standard
    pa11y should not find errors    ${url}limited-to-five-paths