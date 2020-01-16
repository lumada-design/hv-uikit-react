*** Setting ***
Suite Setup       open storybook
Suite Teardown    Close Browser
Library           SeleniumLibrary
Resource          ../../_resources/storybook_keywords.robot
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Default Tags      smoke


*** Variables ***
${startDay1}         xpath:(//p[text()=1])[1]
${startDay20}        xpath:(//p[text()=20])[1]
${endDay18}          xpath:(//p[text()=18])[2]
${endDay1}           xpath:(//p[text()=1])[3]
${labelInputDate}    css:input[placeholder='Select a range']


*** Test Cases ***
Verify default dates
    [Tags]    issue-ie
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Element Attribute Value Should Be           ${labelInputDate}    value         5 Jun, 2019 - 10 Jun, 2019
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${startInput}        value         5 Jun, 2019
    Element Attribute Value Should Be           ${endInput}          value         10 Jun, 2019

When delete date the default date is replaced
    [Tags]    issue-ie    
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Element Attribute Value Should Be           ${labelInputDate}    value         5 Jun, 2019 - 10 Jun, 2019
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    clean input                                 ${startInput}
    clean input                                 ${endInput}
    Click Button                                Apply
    Element Attribute Value Should Be           ${labelInputDate}    value         5 Jun, 2019 - 10 Jun, 2019

Change range dates with clicks
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Click Element                               ${startDay1}
    Element Attribute Value Should Be           ${startInput}        value         1 Jun, 2019
    Click Element                               ${startDay20}
    Element Attribute Value Should Be           ${startInput}        value         20 Jun, 2019

Change range dates with inputs
    [Tags]    issue-ie    
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Force input                                 ${startInput}        01/02/2019
    Press Keys                                  ${startInput}        RETURN
    Element Attribute Value Should Be           ${startInput}        value         01/02/2019
    Force input                                 ${endInput}          01/10/2019
    Press Keys                                  ${endInput}          RETURN
    Element Attribute Value Should Be           ${endInput}          value         01/10/2019
    Click Button                                Apply
    Element Attribute Value Should Be           ${labelInputDate}    value         2 Jan, 2019 - 10 Jan, 2019

Select end date previous to the start date
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Click Element                               ${endDay1}
    Element Attribute Value Should Be           ${endInput}          value         1 Jun, 2019
    Element Attribute Value Should Be           ${startInput}        value         1 Jun, 2019

Select end date previous to the start date with inputs
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Force input                                 ${endInput}          01/02/2019
    Press Keys                                  ${endInput}          RETURN
    Element Attribute Value Should Be           ${endInput}          value         01/02/2019
    Element Attribute Value Should Be           ${startInput}        value         2 Jan, 2019

Select start date forward to the end date with inputs
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Force input                                 ${startInput}        01/03/2022
    Press Keys                                  ${startInput}        RETURN
    Element Attribute Value Should Be           ${startInput}        value         01/03/2022
    Element Attribute Value Should Be           ${endInput}          value         3 Jan, 2022

Don't change dates with clicks in start date
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Click Element                               ${startDay20}
    Click Element                               ${outside}
    Wait Until Page Does Not Contain Element    ${calendar}          7s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${startInput}        value         5 Jun, 2019

Don't change dates with clicks in end date
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Click Element                               ${endDay18}
    Click Element                               ${outside}
    Wait Until Page Does Not Contain Element    ${calendar}          7s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${endInput}          value         10 Jun, 2019

Don't change dates with clicking in a start date and clicking cancel
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Click Element                               ${startDay20}
    Click Button                                Cancel
    Element Should Not Be Visible               ${calendar}
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${startInput}        value         5 Jun, 2019

Don't change dates with clicking in a end date and clicking cancel
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Click Element                               ${endDay18}
    Click Button                                Cancel
    Element Should Not Be Visible               ${calendar}
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${endInput}          value         10 Jun, 2019

Don't change dates with start input and clicking enter
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Force input                                 ${startInput}        01/02/1975
    Press Keys                                  ${startInput}        RETURN
    Click Element                               ${outside}
    Wait Until Page Does Not Contain Element    ${calendar}          7s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${startInput}        value         5 Jun, 2019

Don't change dates with end input and clicking enter
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Force input                                 ${endInput}          01/02/1975
    Press Keys                                  ${endInput}          RETURN
    Click Element                               ${outside}
    Wait Until Page Does Not Contain Element    ${calendar}          7s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${endInput}          value         10 Jun, 2019

Don't change dates with start input clicking enter and cancel
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Force input                                 ${startInput}        01/02/1975
    Press Keys                                  ${startInput}        RETURN
    Click Button                                Cancel
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${startInput}        value         5 Jun, 2019

Don't change dates with end input clicking enter and cancel
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible               DatePicker           10s
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Force input                                 ${endInput}          01/02/1975
    Press Keys                                  ${endInput}          RETURN
    Click Button                                Cancel
    Click Element                               DatePicker
    Wait Until Element Is Visible               ${calendarRange}     7s
    Element Attribute Value Should Be           ${endInput}          value         10 Jun, 2019
