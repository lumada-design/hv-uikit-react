*** Setting ***
Resource         ../../_resources/accessibility.robot
Resource         _variables.resource
Test Template    pa11y should not find errors
Force Tags       pa11y
Documentation    storybook samples against WCAG2AA standard


*** Test Cases ***
card view    ${iframeMain}
list view    ${iframeListView}
