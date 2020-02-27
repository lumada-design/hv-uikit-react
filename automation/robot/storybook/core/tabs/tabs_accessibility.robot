*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y

*** Variables ***
${pa11y_script}    pa11y --reporter json
...                --runner htmlcs --runner axe
...                --standard WCAG2AA
...                --root-element "div[class|='Component-content']"
...                ${STORYBOOK_URL}/iframe.html?id=coretabs--

*** Test Cases ***
Storybook sample tabs against WCAG2AA standard
    pa11y should not find errors    ${pa11y_script}simpletabs

Storybook sample tabs with disabled against WCAG2AA standard
    pa11y should not find errors    ${pa11y_script}biggertabs
