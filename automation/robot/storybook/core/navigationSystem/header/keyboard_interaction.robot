*** Setting ***
Resource          _header.resource
Test Setup        open header sample    ${structure}    main
Force Tags        keyboard    bug-infrastructure-ie
Documentation    Test Cases based on Design System Version 1.2.0


*** Test Cases ***
change focus to next item and keep item selection when is pressed TAB
    header item should be selected     ${item3}
    header item should be selected     ${item3.2}
    Click Element                      ${brand}
    Press Keys                         ${None}    TAB
    Wait Until Element Is Visible      ${item1}>div:focus
    Press Keys                         ${None}    TAB
    Wait Until Element Is Visible      ${item1.1}>div:focus
    header item should be selected     ${item3}
    header item should be selected     ${item3.2}

change focus to previous item and keep item selection when is pressed SHIFT-TAB
    header item should be selected     ${item3}
    header item should be selected     ${item3.2}
    Click Element                      ${brand}
    Press Keys                         ${None}    TAB    TAB
    Wait Until Element Is Visible      ${item1.1}>div:focus
    Press Keys                         ${None}    SHIFT+TAB
    Wait Until Element Is Visible      ${item1}>div:focus
    header item should be selected     ${item3}
    header item should be selected     ${item3.2}

select a parent item when item is focused and is pressed ENTER
    header item should not be selected    ${item1}
    Wait Until Element Is Visible         ${brand}
    Click Element                         ${brand}
    Press Keys                            ${None}    TAB
    Wait Until Element Is Visible         ${item1}>div:focus
    Press Keys                            ${None}    ENTER
    header item should be selected        ${item1}

select the parent and child items when child item is focused and is pressed SPACE
    header item should not be selected    ${item1.1}
    Wait Until Element Is Visible         ${brand}
    Click Element                         ${brand}
    Press Keys                            ${None}    TAB    TAB
    Wait Until Element Is Visible         ${item1.1}>div:focus
    Press Keys                            ${None}    SPACE
    header item should be selected        ${item1.1}

keep item focused when is pressed ENTER or SPACE
    header item should not be selected    ${item1}
    Wait Until Element Is Visible         ${brand}
    Click Element                         ${brand}
    Press Keys                            ${None}    TAB
    Wait Until Element Is Visible         ${item1}>div:focus
    Press Keys                            ${None}    ENTER
    header item should be selected        ${item1}
    Element Should Be Focused             ${item1}>div
