*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y    issue    


*** Variables ***
${url}     ${STORYBOOK_URL}/iframe.html?id=coretextarea--


*** Test Cases ***
storybook sample textarea limited against WCAG2AA standard
    [Documentation]
    ...    = ATTENTION! =
    ...    - openned accessibility issue: https://github.com/pentaho/hv-uikit-react/issues/1286
    pa11y result should be equal as file    ${url}textarealimit    ${CURDIR}/WCAG2AA_textarealimit.json
