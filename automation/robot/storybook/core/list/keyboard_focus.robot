*** Setting ***
Resource         _list.resource
Test Setup       open test list sample    multi-selection-with-select-all
Documentation    https://www.w3.org/TR/wai-aria-practices/#Listbox
Force Tags       keyboard


*** Test Cases ***
focus next and previous option when focus is on option and is pressed DOWN and UP
    set focus and press keys     ${option}(1)    DOWN
    Element Should Be Focused    ${option}(2)
    Press Keys                   ${None}    DOWN    DOWN    DOWN
    Element Should Be Focused    ${option}(5)
    Press Keys                   ${None}    UP    UP    UP    UP
    Element Should Be Focused    ${option}(1)

loop option navigation when using UP and DOWN
    [Documentation]   focus the first option when pressing DOWN on last option
    ...               focus the last option when pressing UP on first option
    set focus and press keys      ${option}(5)    DOWN
    Element Should Be Focused     ${option}(1)
    Press Keys                    ${None}    UP
    Element Should Be Focused     ${option}(5)

jump focus to next enable option when is a simple list
    [Setup]    open test list sample    multi-selection-with-selectors
    Set Focus and press keys     ${option}(3)    DOWN
    Element Should Be Focused    ${option}(5)

jump focus to first and last option when is pressed HOME and END
    Set Focus and press keys     ${option}(2)    END
    Element Should Be Focused    ${option}(5)
    Press Keys                   NONE   HOME
    Element Should Be Focused    ${option}(1)

TAB focus first option when a list (no default options selected) is focused
    [Setup]    open test list sample      test-list-not-selected
    list option should not be selected    ${option}(1)
    set focus and press keys              anchorButton    TAB
    Element Should Be Focused             ${option}(1)

focus disabled option when is a list menu
    [Setup]    open test list sample    test-list-selectable-disabled
    set focus and press keys     anchorButton    TAB
    Element Should Be Focused    ${option}(1)

keep pseudo focus on option when it is pressed
    [Documentation]    focus keywords will fail here
    list option should not be selected    ${option}(1)
    Click Element                         ${option}(1)
    list option should be selected        ${option}(1)
    Press Keys                            NONE    SPACE
    list option should not be selected    ${option}(1)
    Press Keys                            NONE    SPACE
    list option should be selected        ${option}(1)


*** Comments ***
was out of implementation the Type-ahead and the others optional Keyboard Interaction
