*** Setting ***
Variables     ../../../_resources/storybook_variables.yaml
Resource      ../../../_resources/accessibility.robot
Force Tags    pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=coreheader--  


*** Test Cases ***
header with 2 levels against WCAG2AA standard
    [Tags]    issue
    [Documentation]    = error =
    ...                - actions buttons should have text/title
    ...                - ul error it is problem on axe runner not on accessibility
    pa11y result should be equal as file    ${url}twolevels    ${CURDIR}/header-two-levels.json
