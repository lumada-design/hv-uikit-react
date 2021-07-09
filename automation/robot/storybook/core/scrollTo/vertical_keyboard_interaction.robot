*** Setting ***
Resource      _scrollTo.resource
Test Setup    open scroll to vertical sample    with-content
Force Tags    keyboard

*** Test Cases ***
Scrolls to selected section
    ${initialScrollPosition}     get current scroll position  ${containerId}
    Click Element                ${fourthButton}
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${fourthInput}
    ${currentScrollPosition}     get current scroll position  ${containerId}
    Should Be True               ${initialScrollPosition} < ${currentScrollPosition}
    ${initialScrollPosition}     get current scroll position  ${containerId}
    Click Element                ${secondButton}
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${secondInput}
    ${currentScrollPosition}     get current scroll position  ${containerId}
    Should Be True               ${initialScrollPosition} > ${currentScrollPosition}
