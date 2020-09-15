*** Setting ***
Resource         _resources.resource
Test Template    should focus the first element
Documentation    verify where is the focus when dropdown is opened
...              complementary Test Cases on dropdown_keyboard_navigation.robot
Force Tags       v3


*** Test Cases ***                 Story                           Element
Focus input on single      ${patterns}dropdown--single-selection-with-search    ${searchInput}
Focus 1st list item        ${patterns}dropdown--single-selection-no-default     ${option1}
focus 1st selected item    ${tests}dropdown--single-selected-value              ${option3}
Focus input on multi       ${patterns}dropdown--main                            ${searchInput}
Focus All                  ${patterns}dropdown--multi-selection-no-search       ${selectAll}


*** Keywords ***
should focus the first element
    [Documentation]    focus should be on ${element} when is opened dropdown ${sample}
    [Arguments]     ${story}    ${element}
    Go To                            ${story}
    Wait Until Element Is Visible    ${dropdown}
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${element}
    Element Should Be Focused        ${element}
