*** Setting ***
Resource      _dropDown.resource
Test Setup    open dropdown sample    ${inputs}    single-selection


*** Test Cases ***
Open and close dropdown when is clicked header section
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Not Visible    ${listBox}

Close dropdown when it is selected an option
    Click Element                        ${option}(1)
    Wait Until Element Is Not Visible    ${listBox}

Close dropdown when is clicked out of dropdown area
    Click Element                        css:body
    Wait Until Element Is Not Visible    ${listBox}

Dropdown does not open when it is disable
    [Setup]    Go To    ${inputs}dropdown-dropdown--disabled
    Wait Until Element Is Visible      ${dropdown}
    mouses does not open dropdown      ${dropdown}
    mouses does not open dropdown      ${dropdownHeader}
    keyboard does not open dropdown    ${dropdown}   ENTER
    keyboard does not open dropdown    ${dropdown}   SPACE
    keyboard does not open dropdown    ${dropdownHeader}   ENTER
    keyboard does not open dropdown    ${dropdownHeader}   SPACE


*** Keywords ***
mouses does not open dropdown
    [Documentation]    Any mouse interactions does not open dropdown
    [Arguments]    ${Element}
    Run Keyword And Ignore Error     Click Element    ${Element}
    Element Should Not Be Visible    ${listBox}
    Run Keyword And Ignore Error     Double Click Element    ${Element}
    Element Should Not Be Visible    ${listBox}
    Run Keyword And Ignore Error     Mouse Over    ${Element}
    Element Should Not Be Visible    ${listBox}

keyboard does not open dropdown
    [Documentation]    Any keyboard interactions does not open dropdown
    [Arguments]    ${Element}   ${keyboard}
    Press Keys                       ${Element}   ${keyboard}
    Element Should Not Be Visible    ${listBox}
