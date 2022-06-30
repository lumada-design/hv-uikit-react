*** Setting ***
Resource          _card.resource
Test Template     Verify selectable card behavior


*** Test Cases ***                         card              locator        isSelected
selectable when clicking on header         selectable        ${header}      true
selectable when clicking on content        selectable        ${content}     true
selectable when clicking on footer         selectable        ${footer}      false
selectable when clicking on checkbox       selectable        ${checkbox}    true
no selectable when clicking on header      all-components    ${header}      false
no selectable when clicking on content     all-components    ${content}     false
no selectable when clicking on footer      all-components    ${footer}      false
no selectable when clicking on checkbox    all-components    ${checkbox}    true


*** Keywords ***
Verify selectable card behavior
    [Arguments]    ${card}    ${locator}     ${isSelected}
    [Documentation]
    ...    Click on locator and then verify if card is selected as the argument
    ...   | Arguments: | Description                           |
    ...   | card       | url sample                            |
    ...   | locator    | where (area) should click on the card |
    ...   | isSelected | (true or false) if card is selected   |
    open card sample                           ${display}    ${card}
    Click Element                              ${locator}
    Run Keyword If                             '${isSelected}'=='true'
    ...    Checkbox Should Be Selected         ${checkbox}
    ...    ELSE IF                            '${isSelected}'=='false'
    ...    Checkbox Should Not Be Selected     ${checkbox}
    Click Element                              ${locator}
    Checkbox Should Not Be Selected            ${checkbox}
