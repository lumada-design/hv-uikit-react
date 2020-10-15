*** Setting ***
Resource      _toggleButton.resource
Force Tags    keyboard


*** Test Cases ***
ENTER active toggle Button
    [Documentation]   change state when toggle button is focused and is pressed ENTER
    [Setup]    open toggle button sample    main
    toggle button should be selected        ${button}(1)    FavoriteSelected
    Press Keys                              css:body    TAB    ENTER
    toggle button should not be selected    ${button}(1)    Favorite
    Press Keys                              NONE    ENTER
    toggle button should be selected        ${button}(1)    FavoriteSelected

SPACE active toggle Button
    [Documentation]   change state when toggle button is focused and is pressed SPACE
    [Setup]    open toggle button sample    main
    toggle button should be selected        ${button}(1)    FavoriteSelected
    Press Keys                              css:body    TAB    SPACE
    toggle button should not be selected    ${button}(1)    Favorite
    Press Keys                              NONE    SPACE
    toggle button should be selected        ${button}(1)    FavoriteSelected

TAB sequence
    [Setup]    open toggle button sample    main
    Press Keys                   css:body    TAB
    Element Should Be Focused    ${button}(1)
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${button}(2)

not iteratable when is disabled
    [Setup]    open toggle button sample    disabled
    Press Keys                          css:body    TAB
    Run Keyword If                      '${BROWSER.lower()}'=='ie'
    ...    Element Should Be Focused    css:html
    ...    ELSE
    ...    Element Should Be Focused    css:body
