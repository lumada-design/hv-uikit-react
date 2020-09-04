*** Setting ***
Resource          _resources.resource
Test Template     Verify selectable card behavior
Force Tags        v3


*** Keywords ***
Verify card is selected
    Element Attribute Value Should Be    ${aboveFooter}    aria-selected    true
    Checkbox Should Be Selected          ${Checkbox}

Verify card is not selected
    Element Attribute Value Should Be    ${aboveFooter}    aria-selected    false
    Checkbox Should Not Be Selected      ${Checkbox}

Verify selectable card behavior
    [Arguments]    ${card}    ${locator}     ${isSelected}
    [Documentation]
    ...    Click on locator and then verify if card is selected as the argument
    ...   | Arguments:    | Description                               |
    ...   | card          | url sample                                |
    ...   | locator       | where (area) should click on the card     |
    ...   | isSelected    | flag (true or false) if card is selected  |

    Go To                                ${patterns}card--${card}
    Wait Until Element Is Enabled        ${locator}
    Click Element                        ${locator}
    Run Keyword If                       '${isSelected}'=='true'       Verify card is selected
    ...                                  ELSE                          Verify card is not selected
    Click Element                        ${locator}
    Verify card is not selected


*** Test Cases ***                              card                     locator        isSelected
selectable card click on header                 selectable               ${header}      true
selectable card click on content                selectable               ${content}     true
selectable card click on footer                 selectable               ${footer}      false
selectable card click on checkbox               selectable               ${checkbox}    true
no selectable card click on header              all-components           ${header}      false
no selectable card click on content             all-components           ${content}     false
no selectable card click on footer              all-components           ${footer}      false
no selectable card click on checkbox            all-components           ${checkbox}    true
