*** Setting ***
Resource         _dropDown.resource
Test Template    should focus the first element
Documentation    verify where is the focus when dropdown is opened
...              complementary Test Cases on dropdown_keyboard_navigation.robot


*** Test Cases ***         where            story                           element
Focus input on single      ${components}    single-selection-with-search    ${searchInput}
Focus 1st list item        ${components}    single-selection-no-selection   ${option}(1)
Focus input on multi       ${components}    main                            ${searchInput}
Focus All                  ${components}    multi-selection-no-search       ${selectAll}


*** Keywords ***
should focus the first element
    [Documentation]    focus should be on ${element} when is opened dropdown ${story}
    [Arguments]    ${dir}    ${story}    ${element}
    open dropdown sample                ${dir}    ${story}
    Wait Until Page Contains Element    ${element}:focus

should focus 1st selected item
    [Documentation]    focus should be on ${element} when is opened dropdown ${story}
    Go To    ${tests}dropdown--single-selected-value
    Wait Until Page Contains Element    ${element}:focus