*** Setting ***
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y
Documentation    WCAG2AA standard


*** Test Cases ***        Sample
limited to five paths     ${components}breadcrumb--limited-to-five-paths
limited to two paths      ${components}breadcrumb--limited-to-two-paths
url                       ${components}breadcrumb--with-url
url limited               ${components}breadcrumb--with-url-limited
click events              ${components}breadcrumb--with-click-events
