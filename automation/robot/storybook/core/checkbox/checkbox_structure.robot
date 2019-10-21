*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke              

*** Test Cases ***
select and unselect a checkbox 3. With label
    Go To                              ${STORYBOOK_URL}/iframe.html?id=corecheckbox--checkboxlabel
    Wait Until Element Is Enabled      //input[@type='checkbox']    10s
    Checkbox Should Not Be Selected    //input[@type='checkbox']
    Select Checkbox                    //input[@type='checkbox']
    Checkbox Should Be Selected        //input[@type='checkbox']
    Unselect Checkbox                  //input[@type='checkbox']
    Checkbox Should Not Be Selected    //input[@type='checkbox']
    Element Should Be Visible          //span[contains(@class,'HvCheckbox-labelTypography') and text()='label']

unable select checkbox when is disabled 
    go to                               ${STORYBOOK_URL}/iframe.html?id=corecheckbox--checkboxdisabled
    Wait Until Page Contains Element    //input[@type='checkbox']    10s
    Element Should Be Disabled          //input[@type='checkbox']
    Run Keyword And Ignore Error        Click Element                //input[@type='checkbox']
    Checkbox Should Not Be Selected     //input[@type='checkbox']
    Element Should Be Disabled          //input[@type='checkbox']

unable unselect checkbox when is disabled
    [Tags]                              issue
    [Documentation]                     reported issue https://github.com/pentaho/hv-uikit-react/issues/633
    go to                               ${STORYBOOK_URL}/iframe.html?id=corecheckbox--checkboxcheckeddisabled
    Wait Until Page Contains Element    //input[@type='checkbox']    10s
    Run Keyword And Ignore Error        Click Element                //input[@type='checkbox']
    Element Should Be Disabled          //input[@type='checkbox']
    Checkbox Should Be Selected         //input[@type='checkbox']

checkbox with state management
    go to                                ${STORYBOOK_URL}/iframe.html?id=corecheckbox--checkboxstate
    Wait Until Element Is Enabled        //input[@type='checkbox']         10s
    Checkbox Should Not Be Selected      (//input[@type='checkbox'])[3]
    Element Attribute Value Should Be    (//input[@type='checkbox'])[3]    data-indeterminate    false
    Click Element                        (//input[@type='checkbox'])[3]
    Element Attribute Value Should Be    (//input[@type='checkbox'])[3]    data-indeterminate    true
    Checkbox Should Be Selected          (//input[@type='checkbox'])[3]