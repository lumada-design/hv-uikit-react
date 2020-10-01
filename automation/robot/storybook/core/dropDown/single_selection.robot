*** Setting ***
Resource      _resources.resource
Test Setup    Run Keywords
...           Go To    ${forms}dropdown--single-selection
...           AND    Wait Until Element Is Enabled    ${dropdown}
...           AND    Click Element                    ${dropdownHeader}
...           AND    Wait Until Element Is Visible    ${listBox}
Force Tags    v3


*** Test Cases ***
Open and close dropdown when is clicked header section
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Not Visible    ${listBox}

Close dropdown when it is selected an option
    Click Element                        ${option1}
    Wait Until Element Is Not Visible    ${listBox}

Close dropdown when is clicked out of dropdown area
    Click Element                        css:body
    Wait Until Element Is Not Visible    ${listBox}

Dropdown does not open when it is disable
    [Setup]    NONE
    Go To                            ${forms}dropdown--disabled
    Wait Until Element Is Visible    ${dropdown}
    mouses does not open dropdown    ${dropdown}
    mouses does not open dropdown    ${dropdownHeader}
    keyboard does not open dropdown  ${dropdown}   ENTER
    keyboard does not open dropdown  ${dropdown}   SPACE
    keyboard does not open dropdown  ${dropdownHeader}   ENTER
    keyboard does not open dropdown  ${dropdownHeader}   SPACE

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
