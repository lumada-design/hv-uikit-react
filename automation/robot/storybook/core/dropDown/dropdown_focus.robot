*** Setting ***
Library           SeleniumLibrary
Resource          _resources.resource
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke
Documentation     please look complementary Test Cases on dropdown_keyboard_navigation.robot


*** Test Cases ***
Focus on input when open dropdown with input
    Go To                            ${iframeSingleSelectionSearch}
    Wait Until Element Is Visible    ${dropdown}        10s
    Click Element                    ${dropdown}
    Wait Until Element Is Visible    ${searchInput}     2s
    Element Should Be Focused        ${searchInput}

Focus on Select All when open dropdown without input
    Go To                            ${iframeMultiSelection}
    Wait Until Element Is Visible    ${dropdown}        10s
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${selectAll}       2s
    Element Should Be Focused        ${selectAll}

Focus on first element when open simple dropdown
    Go To                            ${iframeSingleSelection}
    Wait Until Element Is Visible    ${dropdown}        10s
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${option1}         2s
    Element Should Be Focused        ${option1}
