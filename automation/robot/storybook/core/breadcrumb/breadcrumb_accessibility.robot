*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Force Tags       pa11y

*** Variables ***
${pa11y_script}    pa11y --reporter json --runner htmlcs --runner axe --standard WCAG2AA --root-element "div[class|='Component-content']" ${STORYBOOK_URL}/iframe.html?id=corebreadcrumb--breadcrumb2

*** Test Cases ***
storybook sample breadcrumb2 against standard
    [Documentation]
    ...    = ATTENTION! =
    ...    the *error* expected it's waiting resolution/feedback https://github.com/pentaho/hv-uikit-react/issues/893
    ...    ---
    pa11y result should be equal as file    ${pa11y_script}    ${CURDIR}/WCAG2AA_breadcrumb2.json
