*** Setting ***
Resource         _dropDown.resource
Test Template    should focus the first element
Documentation    verify where is the focus when dropdown is opened
...              complementary Test Cases on dropdown_keyboard_navigation.robot


*** Test Cases ***         where       story                           element
Focus input on single      ${forms}    single-selection-with-search    ${searchInput}
Focus 1st list item        ${forms}    single-selection-no-selection   ${option}(1)
Focus input on multi       ${forms}    main                            ${searchInput}
Focus All                  ${forms}    multi-selection-no-search       ${selectAll}
focus 1st selected item    ${tests}    single-selected-value           ${option}(3)


*** Keywords ***
should focus the first element
    [Documentation]    focus should be on ${element} when is opened dropdown ${story}
    [Arguments]    ${dir}    ${story}    ${element}
    open dropdown sample                ${dir}    ${story}
    Wait Until Page Contains Element    ${element}:focus
