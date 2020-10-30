*** Setting ***
Resource      _multiButton.resource
Force Tags    v3
Resource       ../_keywords.resource


*** Test Cases ***
switch selection
    [Documentation]    use case: Single and Multi Selection
    ...                just 1 button can be as pressed
    [Setup]    open multiButton sample    only-labels
    multiButton selection should be     True False
    Click Button                        ${button}(1)
    multiButton selection should be     True False
    Click Button                        ${button}(2)
    multiButton selection should be     False True

individual selection
    [Documentation]    use case: Single and Multi Selection
    ...    all button can be as pressed or not
    [Setup]    Open multiButton sample    only-icons
    multiButton selection should be     True False
    Click Button                        ${button}(2)
    multiButton selection should be     True True
    Click Button                        ${button}(1)
    Click Button                        ${button}(2)
    multiButton selection should be     False False

unable change Enforced selection on 1st button
    [Documentation]    use case: change selection when button has Enforced Selection
    [Setup]    Open multiButton sample    enforced-selection
    multiButton selection should be    True False False False False
    Click Button                       ${button}(1)
    Click Button                       ${button}(2)
    multiButton selection should be    True True False False False

minimum selection 2 buttons
    [Setup]    Open multiButton sample    minimum-selection
    multiButton selection should be    False True True False False
    Click Button                       ${button}(2)
    Click Button                       ${button}(3)
    multiButton selection should be    False True True False False
    Click Button                       ${button}(1)
    Click Button                       ${button}(2)
    multiButton selection should be    True False True False False

maximum selection 2 buttons
    [Setup]    Open multiButton sample    maximum-selection
    multiButton selection should be    False False False False False
    Click Button                       ${button}(1)
    Click Button                       ${button}(2)
    Click Button                       ${button}(3)
    multiButton selection should be    True True False False False
    Click Button                       ${button}(2)
    Click Button                       ${button}(3)
    multiButton selection should be    True False True False False

selection is blocked when disabled
    [Documentation]    use case: Buttons can be disabled
    [Setup]    Open multiButton sample    disabled
    multiButton selection should be    True False False False
    Click Button                       ${button}(1)
    Click Button                       ${button}(2)
    Click Button                       ${button}(3)
    Click Button                       ${button}(4)
    multiButton selection should be    True False False False
