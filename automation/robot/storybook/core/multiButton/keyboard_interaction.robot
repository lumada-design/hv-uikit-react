*** Setting ***
Resource      _multiButton.resource
Force Tags    keyboard


*** Test Cases ***
TAB disable buttons
    [Documentation]    use case:
    ...    Buttons can be focused
    ...    Does not focus a disable button
    [Setup]    Open multiButton sample    disabled-item
    Press Keys                   ${button}(1)    TAB
    Element Should Be Focused    ${button}(3)

TAB on enforced selection
    [Documentation]    use case:
    ...    Buttons can be focused
    [Setup]    Open multiButton sample    enforced-selection
    Press Keys                   css:body    TAB
    Element Should Be Focused    ${button}(1)
    Press Keys                   NONE    TAB    TAB    TAB    TAB
    Element Should Be Focused    ${button}(5)

TAB on last button does not return to 1st button
    [Documentation]    use case:
    ...    Buttons can be focused
    [Setup]    Open multiButton sample    enforced-selection
    Press Keys                                ${button}(5)    TAB
    Run Keyword If                            '${BROWSER.lower()}'=='ie'
    ...    Element Should Be Focused          css:html
    ...    ELSE
    ...    Element Should Be Focused          css:body

SHIFT-TAB return to previous buttons
    [Documentation]    use case:
    ...    Buttons can be focused
    [Setup]    Open multiButton sample    enforced-selection
    Press Keys                   ${button}(3)    SHIFT+TAB    SHIFT+TAB
    Element Should Be Focused    ${button}(1)

ENTER Active the button
    [Setup]    Open multiButton sample    enforced-selection
    multiButton selection should be    True False False False False
    Press Keys                         css:body    TAB    TAB    TAB
    Press Keys                         NONE    ENTER
    multiButton selection should be    True False True False False

SPACE Active the button
    [Setup]    Open multiButton sample    enforced-selection
    multiButton selection should be    True False False False False
    Press Keys                         css:body    TAB    TAB    TAB    TAB    TAB
    Press Keys                         NONE    SPACE
    multiButton selection should be    True False False False True

unable change Enforced selection on 1st button with keyboard
    [Documentation]    use case: change selection when button has Enforced Selection
    [Setup]    Open multiButton sample    enforced-selection
    multiButton selection should be    True False False False False
    Press Keys                         css:body    TAB
    Press Keys                         NONE    ENTER    TAB    SPACE
    multiButton selection should be    True True False False False

selection is blocked when disabled and keyboard interaction does nothing
    [Documentation]    use case:
    ...    Buttons can be disabled
    [Setup]    Open multiButton sample    disabled
    multiButton selection should be    True False False False
    Press Keys                         css:body    TAB     ENTER
    Press Keys                         NONE    ENTER    TAB    SPACE
    multiButton selection should be    True False False False
