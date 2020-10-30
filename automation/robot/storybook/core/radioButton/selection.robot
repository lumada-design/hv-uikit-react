*** Setting ***
Resource    _radioButton.resource


*** Test Cases ***
select a radio button
    [Setup]    open radioButton sample    without-label
    radioButton should not be selected    ${radio}(1)
    radioButton should be selected        ${radio}(2)
    click Element                         ${radio}(1)
    radioButton should be selected        ${radio}(1)
    radioButton should not be selected    ${radio}(2)

select radio button when clicks on label
    [Setup]    open radioButton sample    main
    radioButton should not be selected    ${radio}(1)
    radioButton should not be selected    ${radio}(2)
    click Element                         ${radio}(2) label
    radioButton should not be selected    ${radio}(1)
    radioButton should be selected        ${radio}(2)

impossible unselect
    [Setup]    open radioButton sample    main
    click Element                         ${radio}(1)
    radioButton should be selected        ${radio}(1)
    click Element                         ${radio}(1)
    radioButton should be selected        ${radio}(1)

impossible select on a readOnly radio button
    [Setup]    open radioButton sample    read-only
    radioButton should not be selected    ${radio}(1)
    radioButton should be selected        ${radio}(2)
    click Element                         ${radio}(1)
    click Element                         ${radio}(2)
    radioButton should not be selected    ${radio}(1)
    radioButton should be selected        ${radio}(2)

impossible select on a disabled radio button
    [Setup]    open radioButton sample    disabled
    radioButton should be selected        ${radio}(1)
    radioButton should not be selected    ${radio}(2)
    click Element                         ${radio}(1)
    click Element                         ${radio}(2)
    radioButton should be selected        ${radio}(1)
    radioButton should not be selected    ${radio}(2)
