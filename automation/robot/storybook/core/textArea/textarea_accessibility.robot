*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y

*** Variables ***
${pa11y_script}     pa11y --reporter json --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=coretextarea--textarealimit

*** Test Cases ***
storybook sample textarea limited against WCAG2AA standard
    [Documentation]
    ...    = ATTENTION! =
    ...    the *3 errors* expected errors related "insufficient contrast" are waiting "Design System Team feedback"
    ...    ---
    pa11y result should be equal as file    ${pa11y_script}    ${CURDIR}/WCAG2AA_textarealimit.json
