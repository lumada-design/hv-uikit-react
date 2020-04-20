*** Setting ***
Suite Setup       open storybook
Test Setup        Go To URL And Wait Until Element Is Visible    ${STORYBOOK_URL}/iframe.html?id=components-date-picker--localized    DatePicker    10s
Suite Teardown    Close Browser
Library           SeleniumLibrary
Resource          ../../_resources/storybook_keywords.robot
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Force Tags        smoke    bug-ie-webdriver


*** Test Cases ***
Verify current date as default value
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}    2s
    Click Element                        ${input}
    ${year}                              ${month}       ${day}        Get Time                   year month day
    Element Attribute Value Should Be    ${input}       value         ${day}/${month}/${year}

When delete date is replaced with current date
    [Tags]    bug-firefox-webdriver
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
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}    2s
    Force input                          ${input}       01/02/1970
    Click Element                        ${outside}
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}    2s
    Element Attribute Value Should Be    ${input}       value         1 Fev 1970
    
