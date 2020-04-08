*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke
Documentation     options selections just for lists with multiple selection


*** Test Cases ***
unable to select a disabled option when click on it
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-item-disabled
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Page Should Contain Element            ${iconChecked}         limit=1
    Run Keyword And Continue On Failure    Click Element          ${option4}
    Page Should Contain Element            ${selectedItems}       limit=1
    Page Should Contain Element            ${iconChecked}         limit=1

select all options when clicking in header option 'all'
    [Tags]    bug-infrastructure-ie
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Page Should Contain Element            ${iconChecked}         limit=1
    Click Element                          ${headerItem}          # deselect exist one
    Click Element                          ${headerItem}          # select all
    Page Should Contain Element            ${selectedItems}       limit=5
    Page Should Contain Element            ${iconChecked}         limit=6
    Element Text Should Be                 ${headerItemLabel}     5 of 5

show 'all' in header option when is selected all options one by one
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Page Should Contain Element            ${iconChecked}         limit=1
    Click Element                          ${option1}
    Click Element                          ${option2}
    Click Element                          ${option4}
    Click Element                          ${option5}
    Page Should Contain Element            ${selectedItems}       limit=5
    Page Should Contain Element            ${iconChecked}         limit=6
    Element Text Should Be                 ${headerItemLabel}     5 of 5

remove list indeterminate state when click in header option 'all' and list is in indeterminate state
    [Tags]    bug-infrastructure-ie
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Click Element                          ${headerItem}          # deselect exist one
    Page Should Not Contain Element        ${selectedItems}
    Page Should Not Contain Element        ${iconChecked}
    Element Text Should Be                 ${headerItemLabel}     All

remove list indeterminate state when unselect the unique selected option
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Click Element                          ${option3}
    Page Should Not Contain Element        ${selectedItems}
    Page Should Not Contain Element        ${iconChecked}
    Element Text Should Be                 ${headerItemLabel}     All
    Element Attribute Value Should Be      ${headerItem}          data-indeterminate      ${None}    

verify list indeterminate state when one option is selected
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible          ${list}                10s
    Page Should Contain Element            ${selectedItems}       limit=1
    Element Attribute Value Should Be      ${headerItem}-input    data-indeterminate      true

