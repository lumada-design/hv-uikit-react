*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Template     Verify selectable card behavior
Variables         variables.yaml
Force Tags        smoke


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
    ...    Click on locator and then verify if card is selected and if call onChange and onClickAction are as the arguments 
    ...   | Arguments:      | Description                                    | 
    ...   | card            | url sample                                     |
    ...   | locator         | where (area) should click on the card          |
    ...   | isSelected      | flag if card is selected                       |
    ...   | onClickAction   | flag if onClickAction function was called      |
    ...
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corecard--${card}
    Wait Until Element Is Enabled    ${locator}                    10s
    Click Element                    ${locator}
    Run Keyword If                   '${isSelected}'=='true'       Verify card is selected
    ...                              ELSE                          Verify card is not selected
    Run Keyword If                   '${onClickAction}'=='true'    Element Text Should Be         ${header}    onClickAction()
    ...                              ELSE                          Element Text Should Not Be     ${header}    onClickAction()
    Click Element                    ${locator}
    Verify card is not selected
    Element Text Should Not Be       ${header}                     onClickAction()


*** Test Cases ***                              card                     locator        isSelected    onClickAction
selectable actions card click on header         actions-selectable       ${header}      true          true
selectable actions card click on content        actions-selectable       ${content}     true          true
selectable actions card click on footer         actions-selectable       ${footer}      false         |
selectable actions card click on checkbox       actions-selectable       ${checkbox}    true          |
no selectable actions card click on header      actions-no-selectable    ${header}      false         true
no selectable actions card click on content     actions-no-selectable    ${content}     false         true
no selectable actions card click on footer      actions-no-selectable    ${footer}      false         |
no selectable actions card click on checkbox    actions-no-selectable    ${checkbox}    true          |
    
