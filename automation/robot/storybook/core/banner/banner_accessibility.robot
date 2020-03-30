*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Force Tags      pa11y

*** Variables ***
${pa11y_script}    pa11y --reporter json --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=corebanner--banner8

*** Test Cases ***
storybook sample banner against WCAG2AA standard
    [Documentation]
    ...    = ATTENTION! =
    ...    the *6 errors* expected errors on file WCAG2AA_report_banner.txt are related with: https://github.com/pentaho/hv-uikit-react/issues/678
    ...    ---
    pa11y should not find errors    ${pa11y_script}
