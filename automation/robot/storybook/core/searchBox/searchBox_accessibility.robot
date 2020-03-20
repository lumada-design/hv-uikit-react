*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Force Tags      pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=coresearchbox--


*** Test Cases ***                             
storybook sample simple search box against WCAG2AA standard   
    pa11y should not find errors    ${url}simplesearchbox