*** Setting ***
Resource      ../_keywords.resource
Variables     variables.yaml
Test Setup    Run Keywords
...           Go To  ${components}date-picker--localized   AND
...           Wait Until Element Is Visible    DatePicker
Force Tags    bug-ie-webdriver


*** Test Cases ***
Verify current date as default value
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}
    Click Element                        ${input}
    ${current_date}                      get current date
    Element Attribute Value Should Be    ${input}    value    ${current_date}

When delete date is replaced with current date
    [Tags]    bug-firefox-webdriver
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${input}
    ${current_date}                      Get Element Attribute    ${input}    value
    clean input                          ${input}
    Element Attribute Value Should Be    ${input}    value    ${EMPTY}
    Click Element                        ${outside}
    Click Element                        DatePicker
    Element Attribute Value Should Be    ${input}    value    ${current_date}

Change date in locale pt-PT
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}
    Force input                          ${input}       01/02/1970
    Click Element                        ${outside}
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}
    Element Attribute Value Should Be    ${input}       value    1 fev 1970


*** Keywords ***
get current date
    ${year}    ${month}    ${day}    Get Time    year month day
    [Return]    ${day}/${month}/${year}
