*** Setting ***
Resource      _tabs.resource
Test Setup    open tabs sample    ${navigation}    main
Force Tags    keyboard
Documentation
...    We are using Material UI component which do not support w3c which uses arrows
...    Material UI issue https://github.com/mui-org/material-ui/issues/6955

*** Test Cases ***
Focus next element when TAB keyboard is pressed on focused tab
    Set Focus To Element                 ${tab}(1)
    Element Should Be Focused            ${tab}(1)
    Press Keys                           NONE             ARROW_RIGHT
    Element Should Be Focused            ${tab}(2)

Focus next enabled element and jumps disabled elements when TAB is pressed
    [setup]    open tabs sample    ${navigation}    text-size
    Wait Until Element Is Visible        ${tabs}
    Set Focus To Element                 ${tab}(1)
    Element Should Be Focused            ${tab}(1)
    Press Keys                           NONE             ARROW_LEFT
    Element Should Be Focused            ${tab}(3)

Focus previous element when using SHIFT+TAB on a focused element
    Set Focus To Element                 ${tab}(2)
    Element Should Be Focused            ${tab}(2)
    Press Keys                           NONE             ARROW_LEFT
    Element Should Be Focused            ${tab}(1)

Focus previous element and jumps disabled elements when using SHIFT TAB on a focused element
    [setup]    open tabs sample    ${navigation}    text-size
    Wait Until Element Is Visible        ${tabs}
    Set Focus To Element                 ${tab}(3)
    Element Should Be Focused            ${tab}(3)
    Press Keys                           NONE             ARROW_RIGHT
    Element Should Be Focused            ${tab}(1)

Selection does not change when selecting a selected element when using SPACE
    Element Attribute Value Should Be    ${tab}(1)        aria-selected  true
    Element Attribute Value Should Be    ${tab}(2)        aria-selected  false
    Set Focus To Element                 ${tab}(1)
    Press Keys                           NONE             SPACE
    Element Attribute Value Should Be    ${tab}(1)        aria-selected  true
    Element Attribute Value Should Be    ${tab}(2)        aria-selected  false

Selection does not change when selecting a selected element when using ENTER
    Element Attribute Value Should Be    ${tab}(1)        aria-selected  true
    Element Attribute Value Should Be    ${tab}(2)        aria-selected  false
    Set Focus To Element                 ${tab}(1)
    Press Keys                           NONE             ENTER
    Element Attribute Value Should Be    ${tab}(1)        aria-selected  true
    Element Attribute Value Should Be    ${tab}(2)        aria-selected  false

Next element of the tabs can be selected when using TAB and SPACE having a tab element focused
    Set Focus To Element                 ${tab}(1)
    Press Keys                           NONE             ARROW_RIGHT
    Press Keys                           NONE             SPACE
    Element Attribute Value Should Be    ${tab}(1)        aria-selected  false
    Element Attribute Value Should Be    ${tab}(2)        aria-selected  true

Next element of the tabs can be selected when using TAB and ENTER having a tab element focused
    Set Focus To Element                 ${tab}(1)
    Press Keys                           NONE             ARROW_RIGHT
    Press Keys                           NONE             ENTER
    Element Attribute Value Should Be    ${tab}(1)        aria-selected  false
    Element Attribute Value Should Be    ${tab}(2)        aria-selected  true


*** Comments ***
Blocked test waiting resolution of https://github.com/mui-org/material-ui/issues/21233
- Focus next enabled element and jumps disabled elements when TAB is pressed
- Focus previous element and jumps disabled elements when using SHIFT TAB on a focused element
