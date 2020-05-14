*** Setting ***
Suite Setup       open storybook
Test Setup        Go To URL And Wait Until Element Is Visible    ${STORYBOOK_URL}/iframe.html?id=components-date-picker--default-value    DatePicker    10s
Suite Teardown    Close Browser
Library           SeleniumLibrary
Resource          ../../_resources/storybook_keywords.robot
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Force Tags        smoke    bug-ie-webdriver


*** Variables ***
${Day9}              xpath:(//p[text()=9])[1]
${labelInputDate}    css:input[placeholder='Select a date']


*** Test Cases ***
Verify default date
    Element Attribute Value Should Be    ${labelInputDate}           value         1 Jan 1970
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Element Attribute Value Should Be    ${input}                    value         1 Jan 1970

When delete date the default date is replaced
    [Tags]    bug-firefox-webdriver
    Element Attribute Value Should Be    ${labelInputDate}           value         1 Jan 1970
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${input}                    2s
    clean input                          ${input}
    Click Element                        ${outside}
    Element Attribute Value Should Be    ${labelInputDate}           value         1 Jan 1970

When insert invalid date the default date is replaced
    Element Attribute Value Should Be    ${labelInputDate}           value         1 Jan 1970
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${input}                    2s
    force input                          ${input}                    02/30/1970
    Click Element                        ${outside}
    Element Attribute Value Should Be    ${labelInputDate}           value         1 Jan 1970

Change the date with clicks
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Click Element                        ${day9}
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Element Attribute Value Should Be    ${input}                    value         9 Jan 1970

Change the date with input and enter
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Force input                          ${input}                    01/02/1970
    Press Keys                           ${input}                    RETURN
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Element Attribute Value Should Be    ${input}                    value         2 Jan 1970

Change the date with input and outside
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Force input                          ${input}                    01/02/1970
    Click Element                        ${outside}
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Element Attribute Value Should Be    ${input}                    value         2 Jan 1970

Change month by using the arrows icons
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Click element                        ${navigationMonth}-right
    Element Text Should Be               ${navigationMonth}          February
    Click element                        ${navigationMonth}-right
    Element Text Should Be               ${navigationMonth}          March
    Click element                        ${navigationMonth}-left
    Element Text Should Be               ${navigationMonth}          February
    Click Element                        ${day9}
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Element Attribute Value Should Be    ${input}                    value         9 Feb 1970

Change month using the month screen
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Click element                        ${navigationMonth}
    Click element                        //p[contains(.,'Mar')]
    Wait Until Element Is Visible        ${day9}                     2s
    Click Element                        ${day9}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Element Attribute Value Should Be    ${input}                    value         9 Mar 1970

Change year by using the arrows icons
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Click element                        ${navigationYear}-right
    Element Text Should Be               ${navigationYear}           1971
    Click element                        ${navigationYear}-right
    Element Text Should Be               ${navigationYear}           1972
    Click element                        ${navigationYear}-left
    Element Text Should Be               ${navigationYear}           1971
    Click Element                        ${day9}
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}                 2s
    Element Attribute Value Should Be    ${input}                    value         9 Jan 1971
