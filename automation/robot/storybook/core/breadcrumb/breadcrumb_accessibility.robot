*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    pa11y should not find errors
Force Tags       pa11y
Documentation    storybook samples against WCAG2AA standard


*** Variables ***
${url}    ${STORYBOOK_URL}/iframe.html?id=components-breadcrumb--


*** Test Cases ***        Sample
limited to five paths     ${url}limited-to-five-paths
limited to two paths      ${url}limited-to-two-paths
url                       ${url}with-url
url limited               ${url}with-url-limited
click events              ${url}with-click-events
