*** Setting ***
Resource          _keywords.resource
Test Setup        Run Keywords
...               Go To    ${components}asset-inventory--configurations
...               AND    Wait Until Element Is Visible    hv-assetinventory
Test Template     focus moves from to
Force Tags        keyboard


*** Variables ***
${dismiss}         button[id*=post]                #part of css expression
${dropDownMenu}    [aria-label='Dropdown menu']    #part of css expression


*** Keywords ***
focus moves from to
    [Arguments]    ${from}    ${to}
    Set Focus To Element             ${from}
    Press Keys                       NONE    TAB
    Element Should Be Focused        ${to}


*** Test Cases ***                          from                        to
search to sort                              ${searchBox}                ${dropdownHeader}
sort to card view                           ${dropdownHeader}           ${cardViewButton}
card view to list view                      ${cardViewButton}           ${listViewButton}
list view to card                           ${listViewButton}           ${card1}
card div to card checkbox                   ${card1}                    ${card1} input
card checkbox to card button                ${card1} input              ${card1} ${dismiss}
card button to card dropdownmenu            ${card1} ${dismiss}         ${card1} ${dropDownMenu}
card dropdownmenu to other card checkbox    ${card1} ${dropDownMenu}    ${card2} input
last card dropdownmenu to page size         ${card4} ${dropDownMenu}    ${pageSize}
page size to pagination                     ${pageSize}                 ${pageCurrent}
