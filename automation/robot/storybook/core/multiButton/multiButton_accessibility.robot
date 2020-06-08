*** Setting ***
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Case ***
enforced-selection against standard      ${components}multi-button--enforced-selection
only-labels against standard             ${components}multi-button--only-labels
minimum-selection against standard       ${components}multi-button--minimum-selection
maximum-selection against standard       ${components}multi-button--maximum-selection
only-icons against standard              ${components}multi-button--only-icons
multiple-selection against standard      ${components}multi-button--multiple-selection
vertical-orientation against standard    ${components}multi-button--vertical-orientation
