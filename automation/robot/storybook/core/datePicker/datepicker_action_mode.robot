*** Setting ***
Suite Setup       open storybook
Test Setup        Go To URL And Wait Until Element Is Visible    ${STORYBOOK_URL}/iframe.html?id=components-date-picker--with-actions    DatePicker    10s
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
Maintain input date format with enter
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Force input                          ${input}             01/02/1975
    Press Keys                           ${input}             RETURN
    Element Attribute Value Should Be    ${input}             value         01/02/1975

Maintain input date format clicking inside calendar
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Force input                          ${input}             01/02/1975
    Click element                        ${calendar}
    Element Attribute Value Should Be    ${input}             value         2 Jan 1975

Change date with clicks and apply
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Click Element                        ${day9}
    Click Button                         Apply
    Element Should Not Be Visible        ${calendar}
    Element Attribute Value Should Be    ${labelInputDate}    value         9 Jan 1970
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Element Attribute Value Should Be    ${input}             value         9 Jan 1970

Don't change date with clicks and clicking outside
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Click Element                        ${day9}
    Click Element                        ${outside}
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Element Attribute Value Should Be    ${input}             value         2 Jan 1970

Don't change date with clicking in a date and clicking cancel
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Click Element                        ${day9}
    Click Button                         Cancel
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Element Attribute Value Should Be    ${input}             value         2 Jan 1970

Don't change date with input clicking enter and cancel
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Force input                          ${input}             01/02/1975
    Press Keys                           ${input}             RETURN
    Click Button                         Cancel
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Element Attribute Value Should Be    ${input}             value         2 Jan 1970

Don't change date with input more enter and clicking outside
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Force input                          ${input}             01/02/1975
    Press Keys                           ${input}             RETURN
    Click Element                        ${outside}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendar}          2s
    Element Attribute Value Should Be    ${input}             value         2 Jan 1970

