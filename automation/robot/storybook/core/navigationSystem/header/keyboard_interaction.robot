*** Setting ***
Resource          _header.resource
Test Setup        Run Keywords
...               Go To    ${components}navigation-system-horizontal-navigation--main
...               AND   Wait Until Element Is Visible    ${header}
Force Tags        keyboard    bug-infrastructure-ie
Documentation    Test Cases based on Design System Version 1.2.0


*** Test Cases ***
change focus to next item and keep item selection when is pressed TAB
    header item should be selected              ${item3}
    header item should be selected              ${item3.2}
    Wait Until Page Does Not Contain Element    ${item1}>div:focus
    Click Element                               ${brand}
    Press Keys                                  ${None}    TAB
    Element Should Be Focused                   ${item1}>div
    Press Keys                                  ${None}    TAB
    Element Should Be Focused                   ${item1.1}>div
    header item should be selected              ${item3}
    header item should be selected              ${item3.2}

change focus to previous item and keep item selection when is pressed SHIFT-TAB
    header item should be selected    ${item3}
    header item should be selected    ${item3.2}
    Click Element                     ${brand}
    Press Keys                        ${None}    TAB    TAB
    Element Should Be Focused         ${item1.1}>div
    Press Keys                        ${None}    SHIFT+TAB
    Element Should Be Focused         ${item1}>div
    header item should be selected    ${item3}
    header item should be selected    ${item3.2}

change focus to previous item when is pressed SHIFT-TAB on previous clicked item
    [Documentation]   traceability issues/1124
    Wait Until Page Does Not Contain Element    ${item3.1}>div:focus
    Mouse Over                                  ${item3}
    Click Element                               ${item3.2}
    Press Keys                                  ${None}    SHIFT+TAB
    Element Should Be Focused                   ${item3.1}>div

select a parent item when item is focused and is pressed ENTER
    header item should not be selected    ${item1}
    Click Element                         ${brand}
    Press Keys                            ${None}    TAB
    Element Should Be Focused             ${item1}>div
    Press Keys                            ${None}    ENTER
    header item should be selected        ${item1}

select the parent and child items when child item is focused and is pressed SPACE
    header item should not be selected    ${item1.1}
    Click Element                         ${brand}
    Press Keys                            ${None}    TAB    TAB
    Element Should Be Focused             ${item1.1}>div
    Press Keys                            ${None}    SPACE
    header item should be selected        ${item1.1}

keep item focused when is pressed ENTER or SPACE
    header item should not be selected    ${item1}
    Click Element                         ${brand}
    Press Keys                            ${None}    TAB
    Element Should Be Focused             ${item1}>div
    Press Keys                            ${None}    ENTER
    header item should be selected        ${item1}
    Element Should Be Focused             ${item1}>div
