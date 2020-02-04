*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y

*** Variables ***
${pa11y_script}    pa11y --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=coretogglebutton--

*** Test Cases ***
storybook sample sample1 against standard WCAG2AA       ${pa11y_script}sample1
storybook sample sample2 against standard WCAG2AA       ${pa11y_script}sample2
storybook sample sample3 against standard WCAG2AA       ${pa11y_script}sample3
