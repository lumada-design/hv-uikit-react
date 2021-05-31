*** Setting ***
Resource      _multiButton.resource
Test Setup    Open multiButton sample    enforced-selection
Force Tags    keyboard    bug-infrastructure-ie


*** Test Cases ***
TAB disable buttons
    [Documentation]    use case: Buttons can be focused, does not focus a disable button
    [Setup]    Open multiButton sample    disabled-item
    Press Keys                   ${button}(2)    TAB
    Element Should Be Focused    ${button}(4)

TAB on enforced selection
    [Documentation]    use case: Buttons can be focused
    [Setup]    Open multiButton sample    enforced-selection
    Press Keys                   css:body    TAB
    Element Should Be Focused    ${button}(1)
    Press Keys                   NONE    TAB    TAB    TAB    TAB
    Element Should Be Focused    ${button}(5)

TAB on last button does not return to 1st button
    [Documentation]    use case: Buttons can be focused
    Press Keys                           ${button}(5)    TAB
    html body should be focused

SHIFT-TAB return to previous buttons
    [Documentation]    use case: Buttons can be focused
    Press Keys                   ${button}(3)    SHIFT+TAB    SHIFT+TAB
    Element Should Be Focused    ${button}(1)

ENTER Active the button
    multiButton selection should be    True False False False False
    Press Keys                         css:body    TAB    TAB    TAB
    Press Keys                         NONE    ENTER
    multiButton selection should be    True False True False False

SPACE Active the button
    multiButton selection should be    True False False False False
    Press Keys                         css:body    TAB    TAB    TAB    TAB    TAB
    Press Keys                         NONE    SPACE
    multiButton selection should be    True False False False True

unable change Enforced selection on 1st button with keyboard
    [Documentation]    use case: change selection when button has Enforced Selection
    multiButton selection should be    True False False False False
    Press Keys                         css:body    TAB
    Press Keys                         NONE    ENTER    TAB    SPACE
    multiButton selection should be    True True False False False

selection is blocked when disabled and keyboard interaction does nothing
    [Documentation]    use case: Buttons can be disabled
    [Setup]    Open multiButton sample    disabled
    multiButton selection should be    True False False False
    Press Keys                         css:body    TAB     ENTER
    Press Keys                         NONE    ENTER    TAB    SPACE
    multiButton selection should be    True False False False
