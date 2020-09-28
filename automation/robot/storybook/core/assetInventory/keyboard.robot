*** Setting ***
Resource         _keywords.resource
Test Setup       Run Keywords
...              Go To    ${layout}asset-inventory--configurations
...              AND    Wait Until Element Is Visible    ${card1}
Force Tags       v3 keyboard
Documentation    https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html


*** Test Cases ***
select item when checkbox is focused and is pressed SPACE
    Checkbox Should Not Be Selected    ${checkBox1}
    Click Element                      ${card1}
    Press Keys                         NONE    TAB    SPACE
    Wait Until Element Is Visible      ${card1} [aria-selected=true]
    Checkbox Should Be Selected        ${checkBox1}

sort data when a sort list option is changed and is pressed ENTER
    Press Keys                           ${searchBox}    TAB    ENTER
    wait until Element Is Visible        ${sortTitleDesc}
    Press Keys                           NONE    ARROW_DOWN    ENTER
    Wait Until Element Is Not Visible    ${sortTitleDesc}
    Page Should Contain                  Title descending
