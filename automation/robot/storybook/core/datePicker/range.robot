*** Setting ***
Resource      ../_keywords.resource
Variables     variables.yaml
Test Setup    Run Keywords
...           Go To    ${components}date-picker--range-with-values    AND
...           Wait Until Element Is Visible    DatePicker
Force Tags    bug-ie-webdriver


*** Variables ***
${startDay1}         xpath:(//p[text()=1])[1]
${startDay20}        xpath:(//p[text()=20])[1]
${endDay18}          xpath:(//p[text()=18])[2]
${endDay1}           xpath:(//p[text()=1])[3]
${labelInputDate}    css:input[placeholder='Select a range']


*** Test Cases ***
Verify default dates
    Element Attribute Value Should Be    ${labelInputDate}    value    5 Jun 2019 - 10 Jun 2019
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}
    Element Attribute Value Should Be    ${startInput}        value    5 Jun 2019
    Element Attribute Value Should Be    ${endInput}          value    10 Jun 2019

When delete date the default date is replaced
    [Tags]    bug-firefox-webdriver
    Element Attribute Value Should Be    ${labelInputDate}    value    5 Jun 2019 - 10 Jun 2019
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}
    clean input                          ${startInput}
    clean input                          ${endInput}
    Click Button                         Apply
    Element Attribute Value Should Be    ${labelInputDate}    value    5 Jun 2019 - 10 Jun 2019

Change range dates with clicks
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}
    Click Element                        ${startDay1}
    Element Attribute Value Should Be    ${startInput}        value    1 Jun 2019
    Click Element                        ${startDay20}
    Element Attribute Value Should Be    ${startInput}        value    20 Jun 2019

Change range dates with inputs
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}
    Force input                          ${startInput}        01/02/2019
    Press Keys                           ${startInput}        RETURN
    Element Attribute Value Should Be    ${startInput}        value    01/02/2019
    Force input                          ${endInput}          01/10/2019
    Press Keys                           ${endInput}          RETURN
    Element Attribute Value Should Be    ${endInput}          value    01/10/2019
    Click Button                         Apply
    Element Attribute Value Should Be    ${labelInputDate}    value    2 Jan 2019 - 10 Jan 2019

Select end date previous to the start date
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}
    Click Element                        ${endDay1}
    Element Attribute Value Should Be    ${endInput}          value    1 Jun 2019
    Element Attribute Value Should Be    ${startInput}        value    1 Jun 2019

Select end date previous to the start date with inputs
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}
    Force input                          ${endInput}          01/02/2019
    Press Keys                           ${endInput}          RETURN
    Element Attribute Value Should Be    ${endInput}          value     01/02/2019
    Element Attribute Value Should Be    ${startInput}        value     2 Jan 2019

Select start date forward to the end date with inputs
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${calendarRange}
    Force input                          ${startInput}        01/03/2022
    Press Keys                           ${startInput}        RETURN
    Element Attribute Value Should Be    ${startInput}        value     01/03/2022
    Element Attribute Value Should Be    ${endInput}          value     3 Jan 2022
