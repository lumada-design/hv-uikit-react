*** Setting ***
Resource      ../../_resources/accessibility.robot
Variables     ../../_resources/storybook_variables.yaml
Force Tags    pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=corebanner--banner8


*** Test Cases ***
storybook sample banner against WCAG2AA standard
    [Documentation]
    ...    = ATTENTION! =
    ...    the *6 errors* related with: https://github.com/pentaho/hv-uikit-react/issues/678
    ...    ---
    pa11y should not find errors    ${url}
