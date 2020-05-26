*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-user-preferences--main


*** Test Cases ***
user preferences samples against WCAG2AA standard
    pa11y should not find errors    ${url}user
