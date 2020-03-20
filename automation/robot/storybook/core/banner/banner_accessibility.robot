*** Setting ***
Resource      ../../_resources/accessibility.robot
Variables     ../../_resources/storybook_variables.yaml
Force Tags    pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=corebanner--


*** Test Cases ***
storybook sample banner against WCAG2AA standard
    [Documentation]
    ...    = ATTENTION! =
    ...    the *6 errors* related with: https://github.com/pentaho/hv-uikit-react/issues/678
    ...    ---
    pa11y result should be equal as file    ${url}banner8    ${CURDIR}/WCAG2AA_banner8.json
