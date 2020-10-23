*** Setting ***
Resource         _assetInventory.resource
Test Setup       open assetInventory sample    configurations
Force Tags       keyboard
Documentation    https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html


*** Test Cases ***
select item when checkbox is focused and is pressed SPACE
    Checkbox Should Not Be Selected    ${checkBox}\[1]
    Click Element                      ${card}(1)
    Press Keys                         NONE    TAB    SPACE
    Wait Until Element Is Visible      ${card}(1) [aria-selected=true]
    Checkbox Should Be Selected        ${checkBox}\[1]

sort data when a sort list option is changed and is pressed ENTER
    Press Keys                           ${searchBox}    TAB    ENTER
    wait until Element Is Visible        ${dropSortTitleDesc}
    Press Keys                           NONE    ARROW_DOWN    ENTER
    Wait Until Element Is Not Visible    ${dropSortTitleDesc}
    Page Should Contain                  Title descending
