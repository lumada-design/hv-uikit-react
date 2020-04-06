*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=corecheckbox--


*** Test Cases ***
storybook sample checkboxstate against WCAG2AA standard
    [Documentation]
    ...    = ATTENTION! =
    ...    contrast *error* is too ignored as "Design System Team" feedback: \n
    ...    https://github.com/pentaho/hv-uikit-react/issues/775#issuecomment-557167364
    ...    ---
    pa11y result should be equal as file    ${url}checkboxstate    ${CURDIR}/WCAG2AA_checkboxstate.json

storybook sample simple against WCAG2AA standard
    pa11y should not find errors    ${url}checkboxsimple

storybook sample with label and events against WCAG2AA standard
    pa11y should not find errors    ${url}checkboxonchange
