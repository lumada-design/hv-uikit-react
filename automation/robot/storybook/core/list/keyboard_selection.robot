*** Setting ***
Resource         _list.resource
Test Setup       open list sample    single-selection-with-icon
Documentation    https://www.w3.org/TR/wai-aria-practices/#Listbox
Force Tags       keyboard


*** Test Cases ***
select an option when pressing ENTER on it for single selection
    list option should not be selected   ${option}(5)
    set focus and press keys             ${option}(5)    ENTER
    list option should be selected       ${option}(5)

unselect an option when pressing ENTER for single selection
    list option should be selected        ${option}(3)
    set focus and press keys              ${option}(5)    ENTER
    list option should not be selected    ${option}(3)

select an option when pressing SPACE on it for single selection
    list option should not be selected    ${option}(5)
    set focus and press keys              ${option}(5)    SPACE
    list option should be selected        ${option}(5)

unselect an option when pressing SPACE on selected option for single selection
    list option should be selected        ${option}(3)
    set focus and press keys              ${option}(3)    SPACE
    list option should not be selected    ${option}(3)

does not selected option when pressing ENTER on it (multiple selection)
    [Setup]    open list sample    multi-selection-with-select-all
    list option should not be selected    ${option}(5)
    set focus and press keys              ${option}(5)    ENTER
    list option should not be selected    ${option}(5)

select an option when pressing SPACE on it for multiple selection
    [Setup]    open list sample    multi-selection-with-select-all
    list option should not be selected    ${option}(5)
    set focus and press keys              ${option}(5)    SPACE
    list option should be selected        ${option}(5)

unselect an option when pressing SPACE on selected option for multiple selection
    [Setup]    open list sample    multi-selection-with-select-all
    list option should be selected        ${option}(3)
    set focus and press keys              ${option}(3)    SPACE
    list option should not be selected    ${option}(3)
