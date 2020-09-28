*** Setting ***
Resource         _resources.resource
Test Setup       Run Keywords
...              Go To    ${components}base-dropdown--with-content
...              AND    Wait Until Element Is Enabled    ${dropdown}
Documentation    please look complementary Test Cases on dropdown_keyboard_navigation.robot
Force Tags       v3


*** Test Cases ***
Open and close dropdown when click the input (top part of the dropdown)
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${container}
    Click Element                        ${dropdown}
    Wait Until Element Is Not Visible    ${container}

Focus on first element when open simple dropdown
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${container} input
    Element Should Be Focused        ${container} input
