*** Setting ***
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke
Documentation     please look complementary Test Cases on dropdown_keyboard_navigation.robot


*** Test Cases ***
Focus on input when open dropdown with input
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-dropdown--single-selection-with-search
    Wait Until Element Is Visible    ${dropdown}        10s
    Click Element                    ${dropdown}
    Wait Until Element Is Visible    ${searchInput}     2s
    Element Should Be Focused        ${searchInput}

Focus on Select All when open dropdown without input
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-dropdown--multi-selection-no-search
    Wait Until Element Is Visible    ${dropdown}        10s
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${selectAll}       2s
    Element Should Be Focused        ${selectAll}

Focus on first element when open simple dropdown
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-dropdown--single-selection
    Wait Until Element Is Visible    ${dropdown}        10s
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${option1}         2s
    Element Should Be Focused        ${option1}
