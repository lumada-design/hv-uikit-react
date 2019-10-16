*** Setting ***
Resource        ../../_resources/accessibility.robot
Variables       ../../_resources/storybook_variables.yaml
Test Template   verify element accessibility as standard
Default Tags    smoke    pa11y

*** Test Cases ***                                                   url                                                  standard
usual button scenarios against accessibility standard WCAG2AA        ${STORYBOOK_URL}/iframe.html?id=corebutton--smoke    WCAG2AA
usual button scenarios against accessibility standard Section508     ${STORYBOOK_URL}/iframe.html?id=corebutton--smoke    Section508