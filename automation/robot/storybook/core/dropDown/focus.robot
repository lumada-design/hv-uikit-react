*** Setting ***
Resource         _resources.resource
Test Template    should focus the first element
Documentation    verify where is the focus when dropdown is opened
...              complementary Test Cases on dropdown_keyboard_navigation.robot
Force Tags       v3


*** Test Cases ***         Story                           Element
Focus input on single      single-selection-with-search    ${searchInput}
Focus 1st list item        single-selection-no-default     ${option1}
Focus input on multi       main                            ${searchInput}
Focus All                  multi-selection-no-search       ${selectAll}
focus 1st selected item
    [Template]    NONE
    Go To                            ${tests}dropdown--single-selected-value
    Wait Until Element Is Visible    ${option3}
    Element Should Be Focused        ${option3}


*** Keywords ***
should focus the first element
    [Documentation]    focus should be on ${element} when is opened dropdown ${story}
    [Arguments]     ${story}    ${element}
    Go To                            ${patterns}dropdown--${story}
    Wait Until Element Is Visible    ${dropdown}
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${element}
    Element Should Be Focused        ${element}
