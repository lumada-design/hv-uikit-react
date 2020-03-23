*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=coredropdown--


*** Test Cases ***
storybook sample dropdown disabled against WCAG2AA standard
    [Documentation]
    ...    = ATTENTION! =
    ...    contrast *error* is too ignored as "Design System Team" feedback: \n
    ...    https://github.com/pentaho/hv-uikit-react/issues/775#issuecomment-557167364
    ...    ---
    pa11y result should be equal as file    ${url}dropdown9    ${CURDIR}/WCAG2AA_dropdown9.json

storybook sample dropdown dropped against WCAG2AA standard
    pa11y should not find errors    ${url}dropdown11
