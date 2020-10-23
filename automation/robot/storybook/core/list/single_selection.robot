*** Setting ***
Resource         _list.resource
Test Setup       open list sample    single-selection-with-icon
Documentation    options selections just for lists with single selection


*** Test Cases ***
unselect option when click on it
    list option should be selected        ${option}(3)
    Click Element                         ${option}(3)
    list option should not be selected    ${option}(3)

change selected option when click on other option
    list option should be selected        ${option}(3)
    list option should not be selected    ${option}(2)
    Click Element                         ${option}(2)
    list option should not be selected    ${option}(3)
    list option should be selected        ${option}(2)

unable to select disabled option when click on it
    list option should not be selected     ${option}(4)
    Click Element                          ${option}(4)
    list option should not be selected     ${option}(4)

unable to select any option when selectable property is false
    [Setup]    open list sample    main
    Click Element                         ${option}(1)
    list option should not be selected    ${option}(1)
    Click Element                         ${option}(5)
    list option should not be selected    ${option}(5)
