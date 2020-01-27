*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke
Documentation     just for lists with multiple selection

*** Keywords ***
item should be checked
    [Arguments]                          ${locatorId}
    Element Attribute Value Should Be    ${locatorId}     aria-selected         true
    Element Attribute Value Should Be    css:#${locatorId} input    data-indeterminate    false
    Page Should Contain Element          css:#${locatorId} div[class*='CheckboxCheck']    #checked icon

item should not be checked
    [Arguments]                          ${locatorId}
    Element Attribute Value Should Be    ${locatorId}    aria-selected         ${None}
    Element Attribute Value Should Be    css:#${locatorId} input   data-indeterminate    false
    Page Should Contain Element          css:#${locatorId} div[class*='Checkbox-root']    #checked icon    


*** Test Cases ***
unable select a disabled item
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-item-disabled
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Page Should Contain Element            ${iconChecked}         limit=1
    item should not be checked             ${item4}
    Run Keyword And Continue On Failure    Click Element          ${item4}
    item should not be checked             ${item4}
    Page Should Contain Element            ${selectedItems}       limit=1
    Page Should Contain Element            ${iconChecked}         limit=1

Select all items by clicking all
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Page Should Contain Element            ${iconChecked}         limit=1
    Click Element                          ${headerItem}          # deselect exist one
    Click Element                          ${headerItem}          # select all
    Page Should Contain Element            ${selectedItems}       limit=5
    Page Should Contain Element            ${iconChecked}         limit=6
    Element Text Should Be                 ${headerItemLabel}     5 of 5

Select all items by clicking one by one
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Page Should Contain Element            ${iconChecked}         limit=1
    Click Element                          ${item1}
    Click Element                          ${item2}
    Click Element                          ${item4}
    Click Element                          ${item5}
    Page Should Contain Element            ${selectedItems}       limit=5
    Page Should Contain Element            ${iconChecked}         limit=6
    Element Text Should Be                 ${headerItemLabel}     5 of 5

unselect all items
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Click Element                          ${headerItem}          # deselect exist one
    Page Should Not Contain Element        ${selectedItems}
    Page Should Not Contain Element        ${iconChecked}
    Element Text Should Be                 ${headerItemLabel}     All

unselect items one by one
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Click Element                          ${item3}
    Page Should Not Contain Element        ${selectedItems}
    Page Should Not Contain Element        ${iconChecked}
    Element Text Should Be                 ${headerItemLabel}     All

verify a indeterminate selection
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Element Attribute Value Should Be      ${headerItem}-input    data-indeterminate      true
    Page Should Contain Element            css:#${headerItem} div[class*='CheckboxPartial']    #indeterminate icon

unselect a indeterminate selection
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Click Element                          ${item3}
    Page Should Not Contain Element        ${selectedItems}
    Page Should Not Contain Element        ${iconChecked}
    Element Attribute Value Should Be      ${headerItem}          data-indeterminate      ${None}
    Element Text Should Be                 ${headerItemLabel}     All


