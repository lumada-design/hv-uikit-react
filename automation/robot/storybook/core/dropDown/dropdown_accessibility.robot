*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y

*** Variables ***
${pa11y_script}    pa11y  --reporter json --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=coredropdown--

*** Test Cases ***
storybook sample dropdown disabled against WCAG2AA standard
    [Documentation]
    ...    = ATTENTION! =
    ...    the *error* expected it's to ignore as "Design System Team" feedback https://github.com/pentaho/hv-uikit-react/issues/775
    ...    ---
    pa11y result should be equal as file    ${pa11y_script}dropdown9    ${CURDIR}/WCAG2AA_dropdown9.json

storybook sample dropdown dropped against WCAG2AA standard
    pa11y should not find errors    ${pa11y_script}dropdown11
