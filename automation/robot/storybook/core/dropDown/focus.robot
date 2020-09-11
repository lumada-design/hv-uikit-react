*** Setting ***
Resource         _resources.resource
Test Template    should focus the first element
Documentation    verify where is the focus when dropdown is opened
...              complementary Test Cases on dropdown_keyboard_navigation.robot
Force Tags       v3


*** Test Cases ***                 Story                           Element
Focus input on single selection    single-selection-with-search    ${searchInput}
Focus 1st list item                single-selection-no-default     ${option1}
focus 1st selected item            single-selected-value           ${option3}
Focus input on multi selection     main                            ${searchInput}
Focus All                          multi-selection-no-search       ${selectAll}


*** Keywords ***
should focus the first element
    [Documentation]    focus should be on ${element} when is opened dropdown ${sample}
    [Arguments]     ${sample}    ${element}
    Go To                            ${patterns}dropdown--${sample}
    Wait Until Element Is Visible    ${dropdown}
    Click Element                    ${dropdown}
    Wait Until Element Is Enabled    ${element}
    Element Should Be Focused        ${element}
