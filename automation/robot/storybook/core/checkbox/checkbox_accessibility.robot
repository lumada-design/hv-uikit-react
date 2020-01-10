*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y

*** Variables ***
${pa11y_script}     pa11y --reporter json --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=corecheckbox--

*** Test Cases ***
storybook sample checkboxstate against WCAG2AA standard
    [Documentation]
    ...    = ATTENTION! =
    ...    the expected *error* is ignored as per "Design System Team" feedback
    ...    https://github.com/pentaho/hv-uikit-react/issues/775#issuecomment-557167364
    ...    ---
    pa11y result should be equal as file    ${pa11y_script}checkboxstate    ${CURDIR}/WCAG2AA_checkboxstate.json

storybook sample simple against WCAG2AA standard
    pa11y should not find errors    ${pa11y_script}checkboxsimple

storybook sample with label and events against WCAG2AA standard
    pa11y should not find errors    ${pa11y_script}checkboxonchange
