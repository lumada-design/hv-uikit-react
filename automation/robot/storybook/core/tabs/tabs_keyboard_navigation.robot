*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke    keyboard
Documentation
...    We are using Material UI component has an issue with disabled tabs
...    Issue on Material UI submitted already https://github.com/mui-org/material-ui/issues/21233 that we should follow up

*** Test Cases ***
Focus moves to next element when ARROW_RIGHT keyboard is pressed on focused tab
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab1
    Element Should Be Focused            tabs-tab1
    Press Keys                           NONE             ARROW_RIGHT
    Element Should Be Focused            tabs-tab2

Focus moves to last element when ARROW_LEFT keyboard is pressed on first tab
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab1
    Element Should Be Focused            tabs-tab1
    Press Keys                           NONE             ARROW_LEFT
    Element Should Be Focused            tabs-tab3

Focus moves to previous element when using ARROW_LEFT on a focused element
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab2
    Element Should Be Focused            tabs-tab2
    Press Keys                           NONE             ARROW_LEFT
    Element Should Be Focused            tabs-tab1

Focus moves to first element when using ARROW_RIGHT on a last element
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab3
    Element Should Be Focused            tabs-tab3
    Press Keys                           NONE             ARROW_RIGHT
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

Next element of the tabs can be selected when using ARROW_RIGHT and SPACE having a tab element focused
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab1
    Press Keys                           NONE             ARROW_RIGHT
    Press Keys                           NONE             SPACE
    Element Attribute Value Should Be    tabs-tab1        aria-selected  false
    Element Attribute Value Should Be    tabs-tab2        aria-selected  true

Next element of the tabs can be selected when using ARROW_RIGHT and ENTER having a tab element focused
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-tabs--main
    Wait Until Element Is Visible        tabs             7s
    Set Focus To Element                 tabs-tab1
    Press Keys                           NONE             ARROW_RIGHT
    Press Keys                           NONE             ENTER
    Element Attribute Value Should Be    tabs-tab1        aria-selected  false
    Element Attribute Value Should Be    tabs-tab2        aria-selected  true

*** Comments ***
Blocked test waiting resolution of https://github.com/mui-org/material-ui/issues/21233
- focus behaves correctly when there are disabled tabs
- moves focus to the last tab when Left Arrow is pressed on focused first tab
- moves focus to previous tab when Left Arrow is pressed
- moves focus to the first tab when Right Arrow is pressed on focused last tab
- moves focus to next tab when Right Arrow is pressed
