*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y

*** Variables ***
${pa11y_script}    pa11y --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=coreradiobutton--

*** Test Cases ***
storybook sample radiobuttonlabel against standard       ${pa11y_script}radiobuttonlabel
storybook sample radiobuttononchange against standard    ${pa11y_script}radiobuttononchange${pa11y_script}
storybook sample radiobuttonstate against standard       ${pa11y_script}radiobuttonstate
