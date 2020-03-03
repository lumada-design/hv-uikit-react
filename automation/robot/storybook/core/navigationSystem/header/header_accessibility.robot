*** Setting ***
Variables     ../../../_resources/storybook_variables.yaml
Resource      ../../../_resources/accessibility.robot
Force Tags    pa11y


*** Variables ***
${pa11yScript}    pa11y
...               --reporter json
...               --runner htmlcs --runner axe
...               --standard WCAG2AA
...               --root-element "div[class|='Component-content']"
...               ${STORYBOOK_URL}/iframe.html?id=coreheader--


*** Test Cases ***
header with 2 levels against WCAG2AA standard
    [Tags]    error
    [Documentation]    = error =
    ...                - actions buttons should have text/title
    ...                - ul error it is problem on axe runner not on accessibility
    pa11y result should be equal as file    ${pa11yScript}twolevels    ${CURDIR}/header-two-levels.json
