*** Setting ***
Resource         ../_keywords.resource
Variables        variables.yaml
Test Template    Verify selectable card behavior


*** Test Cases ***        card                      locator        isSelected    onClickAction
selectable header         actions-selectable        ${header}      true          true
selectable content        actions-selectable        ${content}     true          true
selectable footer         actions-selectable        ${footer}      false         |
selectable checkbox       actions-selectable        ${checkbox}    true          |
no selectable header      actions-not-selectable    ${header}      false         true
no selectable content     actions-not-selectable    ${content}     false         true
no selectable footer      actions-not-selectable    ${footer}      false         |
no selectable checkbox    actions-not-selectable    ${checkbox}    true          |


*** Keywords ***
Verify card is selected
    Element Attribute Value Should Be    ${aboveFooter}    aria-checked    true
    Checkbox Should Be Selected          ${Checkbox}
    Element Text Should Be               ${subHeader}      onChange()

Verify card is not selected
    Element Attribute Value Should Be    ${aboveFooter}    aria-checked    false
    Checkbox Should Not Be Selected      ${Checkbox}
    Element Text Should Not Be           ${subHeader}      onChange()

Verify selectable card behavior
    [Arguments]    ${card}    ${locator}     ${isSelected}    ${onClickAction}
    [Documentation]
    ...    Click on locator and then verify if card is selected
    ...    and if call onChange and onClickAction are as the arguments
    ...   | Arguments:      | Description                                    |
    ...   | card            | url sample                                     |
    ...   | locator         | where (area) should click on the card          |
    ...   | isSelected      | flag if card is selected                       |
    ...   | onClickAction   | flag if onClickAction function was called      |
    ...
    Go To                                ${tests}card--custom-${card}
    Wait Until Element Is Enabled        ${locator}
    Click Element                        ${locator}
    Run Keyword If                       '${isSelected}'=='true'
    ...    Verify card is selected
    ...    ELSE
    ...    Verify card is not selected
    Run Keyword If                       '${onClickAction}'=='true'
    ...    Element Text Should Be        ${header}    onClickAction()
    ...    ELSE
    ...    Element Text Should Not Be    ${header}    onClickAction()
    Click Element                        ${locator}
    Verify card is not selected
    Element Text Should Not Be           ${header}    onClickAction()
