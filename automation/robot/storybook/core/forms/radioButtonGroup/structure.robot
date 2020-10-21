*** Setting ***
Resource      _radioButtonGroup.resource
Test Setup    open radio button group sample    main


*** Test Cases ***
controlled radio button group validates selections
    [Setup]    open radio button group sample    controlled
    Page Should Not Contain             Don't select "None"!
    Click Element                       ${radio}(1)
    Wait Until Page Contains            Don't select "None"!
    Click Element                       ${radio}(2)
    Wait Until Page Does Not Contain    Don't select "None"!

click on label
    Page Should Contain Element         ${radio}(2) :checked
    Click Element                       ${radio}(1) label
    Wait Until Page Contains Element    ${radio}(1) :checked
    Page Should Not Contain Element     ${radio}(2) :checked

click on radio button
    Page Should Contain Element         ${radio}(2) :checked
    Click Element                       ${radio}(3) input
    Wait Until Page Contains Element    ${radio}(3) :checked
    Page Should Not Contain Element     ${radio}(2) :checked

click on option area
    Page Should Contain Element         ${radio}(2) :checked
    Click Element                       ${radio}(1)
    Wait Until Page Contains Element    ${radio}(1) :checked
    Page Should Not Contain Element     ${radio}(2) :checked

is not editable when is read only
    [Setup]   open radio button group sample    read-only
    Page Should Contain Element         ${radio}(2) :checked
    Click Element                       ${radio}(3) input
    Page Should Not Contain Element     ${radio}(3) :checked
    Click Element                       ${radio}(1)
    Page Should Not Contain Element     ${radio}(1) :checked
    Page Should Contain Element         ${radio}(2) :checked

not editable when is disabled
    [Setup]    open radio button group sample    disabled
    Page Should Contain Element         ${radio}(2) :checked
    Click Element                       ${radio}(3) input
    Page Should Not Contain Element     ${radio}(3) :checked
    Click Element                       ${radio}(1)
    Page Should Not Contain Element     ${radio}(1) :checked
    Page Should Contain Element         ${radio}(2) :checked

radio button group has id, required, name and value attributes
    [Setup]    go to    ${tests}forms-radio-button-group--required
    Wait Until Element Is Enabled        ${radioButtonGroup}
    Element Attribute Value Should Be    ${radioButtonGroup}    id    HvRadioGroup
    Page Should Contain Element          ${radioButtons} input[value]    limit=3
    Page Should Contain Element          ${radioButtons} input[required]    limit=3
    Page Should Contain Element          ${radioButtons} input[name]    limit=3
    Element Attribute Value Should Be    ${radio}(1) input    name    favorite
