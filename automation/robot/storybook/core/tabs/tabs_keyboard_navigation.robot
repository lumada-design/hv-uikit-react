*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke    keyboard
Documentation
...    We are using Material UI component and they do not support it according to w3c, which uses arrows
...    Issue on Material UI submitted already https://github.com/mui-org/material-ui/issues/6955 that we should follow up

*** Test Cases ***
Focus moves to next element when TAB keyboard is pressed on focused tab
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab1
    Element Should Be Focused            tabs-tab1
    Press Keys                           NONE             TAB
    Element Should Be Focused            tabs-tab2

Focus moves/jumps to next enabled element and jumps disabled elements when TAB is pressed
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--text-size
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab1
    Element Should Be Focused            tabs-tab1
    Press Keys                           NONE             TAB
    Element Should Be Focused            tabs-tab3

Focus moves to previous element when using SHIFT+TAB on a focused element
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab2
    Element Should Be Focused            tabs-tab2
    Press Keys                           NONE             SHIFT+TAB
    Element Should Be Focused            tabs-tab1

Focus moves to previous element and jumps disabled elements when using SHIFT+TAB on a focused element
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--text-size
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab3
    Element Should Be Focused            tabs-tab3
    Press Keys                           NONE             SHIFT+TAB
    Element Should Be Focused            tabs-tab1

Selection does not change when selecting a selected element when using SPACE
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Element Attribute Value Should Be    tabs-tab1        aria-selected  true
    Element Attribute Value Should Be    tabs-tab2        aria-selected  false
    Set Focus To Element                 tabs-tab1
    Press Keys                           NONE             SPACE
    Element Attribute Value Should Be    tabs-tab1        aria-selected  true
    Element Attribute Value Should Be    tabs-tab2        aria-selected  false

Selection does not change when selecting a selected element when using ENTER
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Element Attribute Value Should Be    tabs-tab1        aria-selected  true
    Element Attribute Value Should Be    tabs-tab2        aria-selected  false
    Set Focus To Element                 tabs-tab1
    Press Keys                           NONE             ENTER
    Element Attribute Value Should Be    tabs-tab1        aria-selected  true
    Element Attribute Value Should Be    tabs-tab2        aria-selected  false

Next element of the tabs can be selected when using TAB and SPACE having a tab element focused
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab1
    Press Keys                           NONE             TAB
    Press Keys                           NONE             SPACE
    Element Attribute Value Should Be    tabs-tab1        aria-selected  false
    Element Attribute Value Should Be    tabs-tab2        aria-selected  true

Next element of the tabs can be selected when using TAB and ENTER having a tab element focused
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab1
    Press Keys                           NONE             TAB
    Press Keys                           NONE             ENTER
    Element Attribute Value Should Be    tabs-tab1        aria-selected  false
    Element Attribute Value Should Be    tabs-tab2        aria-selected  true

*** Comments ***
Blocked test waiting resolution of https://github.com/mui-org/material-ui/issues/6955
- moves focus to the last tab when Left Arrow is pressed on focused first tab
- moves focus to previous tab when Left Arrow is pressed
- moves focus to the first tab when Right Arrow is pressed on focused last tab
- moves focus to next tab when Right Arrow is pressed
