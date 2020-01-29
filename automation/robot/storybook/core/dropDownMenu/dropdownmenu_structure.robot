*** Setting ***
Resource          ../../_resources/storybook_keywords.robot
Resource          keywords.robot
Library           SeleniumLibrary
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
select an item
    Go To                                ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Element Is Enabled        ${dropDownMenu}                             10s
    Click Element                        ${dropDownMenu}
    Element Should Be Visible            ${droppedMenu}
    Element Text Should Be               ${droppedMenu}                              Label 1\nLabel 2\nLabel 3
    Click Element                        ${item3}
    Element Attribute Value Should Be    ${item3}                                    tabindex                     0

unable select a disabled item
    Go To                                ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Element Is Enabled        ${dropDownMenu}                             10s
    Click Element                        ${dropDownMenu}
    Element Should Be Visible            ${droppedMenu}
    Element Attribute Value Should Be    ${item2}                                    aria-disabled                true
    Click Element                        ${item2}
    Element Attribute Value Should Be    ${item2}                                    tabindex                     0
    Element Attribute Value Should Be    ${item2}                                    aria-selected                ${None}
