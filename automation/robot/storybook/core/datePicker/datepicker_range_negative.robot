*** Setting ***
Library           SeleniumLibrary
Resource          ../../_resources/keywords.resource
Suite Setup       open storybook
Test Setup        Run Keywords
...               Go To    ${iframeC}date-picker--range-with-values    AND
...               Wait Until Element Is Visible    DatePicker    10s
Suite Teardown    Close Browser
Variables         variables.yaml
Force Tags        smoke    bug-ie-webdriver


*** Variables ***
${startDay1}         xpath:(//p[text()=1])[1]
${startDay20}        xpath:(//p[text()=20])[1]
${endDay18}          xpath:(//p[text()=18])[2]
${endDay1}           xpath:(//p[text()=1])[3]
${labelInputDate}    css:input[placeholder='Select a range']


*** Test Cases ***
Don't change dates with clicks in start date
    [Tags]    bug-chrome-webdriver
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Click Element                               ${startDay20}
    Click Element                               ${outside}
    Wait Until Page Does Not Contain Element    ${calendar}          7s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${startInput}        value    5 Jun 2019

Don't change dates with clicks in end date
    [Tags]    bug-chrome-webdriver
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Click Element                               ${endDay18}
    Click Element                               ${outside}
    Wait Until Page Does Not Contain Element    ${calendar}          7s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${endInput}          value    10 Jun 2019

Don't change dates with clicking in a start date and clicking cancel
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}     7s
    Click Element                        ${startDay20}
    Click Button                         Cancel
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}     7s
    Element Attribute Value Should Be    ${startInput}        value    5 Jun 2019

Don't change dates with clicking in a end date and clicking cancel
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}     7s
    Click Element                        ${endDay18}
    Click Button                         Cancel
    Element Should Not Be Visible        ${calendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}     7s
    Element Attribute Value Should Be    ${endInput}          value     10 Jun 2019

Don't change dates with start input and clicking enter
    [Tags]    bug-chrome-webdriver
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Force input                                 ${startInput}        01/02/1975
    Press Keys                                  ${startInput}        RETURN
    Click Element                               ${outside}
    Wait Until Page Does Not Contain Element    ${calendar}          7s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${startInput}        value    5 Jun 2019

Don't change dates with end input and clicking enter
    [Tags]    bug-chrome-webdriver
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Force input                                 ${endInput}          01/02/1975
    Press Keys                                  ${endInput}          RETURN
    Click Element                               ${outside}
    Wait Until Page Does Not Contain Element    ${calendar}          7s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${endInput}          value    10 Jun 2019

Don't change dates with start input clicking enter and cancel
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}     7s
    Force input                          ${startInput}        01/02/1975
    Press Keys                           ${startInput}        RETURN
    Click Button                         Cancel
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}     7s
    Element Attribute Value Should Be    ${startInput}        value    5 Jun 2019

Don't change dates with end input clicking enter and cancel
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}     7s
    Force input                          ${endInput}          01/02/1975
    Press Keys                           ${endInput}          RETURN
    Click Button                         Cancel
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}     7s
    Element Attribute Value Should Be    ${endInput}          value    10 Jun 2019