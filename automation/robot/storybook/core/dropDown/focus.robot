*** Setting ***
Resource         _resources.resource
Documentation    please look complementary Test Cases on dropdown_keyboard_navigation.robot
Force Tags  v3

*** Test Cases ***
Focus on input when open dropdown with input
    Go To                            ${iframeSingleSelectionSearch}
    Wait Until Element Is Visible    ${dropdown}
    Click Element                    ${dropdown}
    Wait Until Element Is Visible    ${searchInput}
    Element Should Be Focused        ${searchInput}

Focus on Select All when open dropdown without input
    Go To                            ${patterns}dropdown--multi-selection-no-search
    Wait Until Element Is Visible    ${dropdown}
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${selectAll}
    Element Should Be Focused        ${selectAll}

Focus on first element when open simple dropdown
    Go To                            ${iframeSingleSelection}
    Wait Until Element Is Visible    ${dropdown}
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${option1}
    Element Should Be Focused        ${option1}
