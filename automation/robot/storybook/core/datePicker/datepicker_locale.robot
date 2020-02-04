*** Setting ***
Suite Setup       open storybook
Suite Teardown    Close Browser
Library           SeleniumLibrary
Resource          ../../_resources/storybook_keywords.robot
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Default Tags      smoke    bug-ie-webdriver


*** Test Cases ***
Verify current date as default value
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplelocalizeddatepicker
    Wait Until Element Is Visible        DatePicker     10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}    2s
    Click Element                        ${input}
    ${year}                              ${month}       ${day}        Get Time                   year month day
    Element Attribute Value Should Be    ${input}       value         ${day}/${month}/${year}

When delete date is replaced with current date
    [Tags]    issue-ie    issue-firefox
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplelocalizeddatepicker
    Wait Until Element Is Visible        DatePicker     10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}    2s
    Click Element                        ${input}
    clean input                          ${input}
    Element Attribute Value Should Be    ${input}       value         ${EMPTY}
    Click Element                        ${outside}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}    2s
    Click Element                        ${input}
    ${year}                              ${month}       ${day}        Get Time                   year month day
    Element Attribute Value Should Be    ${input}       value         ${day}/${month}/${year}

Change date in locale pt-PT
    [Tags]    issue-ie
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplelocalizeddatepicker
    Wait Until Element Is Visible        DatePicker     10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}    2s
    Force input                          ${input}       01/02/1970
    Click Element                        ${outside}
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}    2s
    Element Attribute Value Should Be    ${input}       value         1 Fev, 1970
    
