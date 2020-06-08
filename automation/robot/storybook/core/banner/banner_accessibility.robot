*** Setting ***
Resource      ../../_resources/accessibility.robot
Force Tags    pa11y


*** Test Cases ***
 banner against WCAG2AA standard
    pa11y should not find errors    ${components}notification-banner--banner-variations
