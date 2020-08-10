*** Setting ***
Resource         _resources.resource
Documentation    please look complementary Test Cases on dropdown_keyboard_navigation.robot
Force Tags  v3

*** Test Cases ***

Open and close dropdown when click the input (top part of the dropdown)
    Go To                                ${withContent}
    Wait Until Element Is Visible        ${dropdown}
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Visible        ${container}
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Not Visible    ${container}


Focus on first element when open simple dropdown
    Go To                            ${withContent}
    Wait Until Element Is Visible    ${dropdown}
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${inputInContainer}
    Element Should Be Focused        ${inputInContainer}
