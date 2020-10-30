*** Setting ***
Resource         _resources.resource
Test Setup       open basedropdown sample    with-content
Documentation    please look complementary Test Cases on dropdown_keyboard_navigation.robot


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
