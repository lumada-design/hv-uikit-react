*** Setting ***
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary

*** Variables ***
${cardsSelector}        //*[starts-with(@id, 'Card')]
${openCalendar}         DatePicker-calendar
${openCalendarRange}    DatePicker-calendar-start
${simpleInput}          DatePicker-calendar-header-input
${startInput}           DatePicker-calendar-start-header-input
${endInput}             DatePicker-calendar-end-header-input
${navigationMonth}      DatePicker-calendar-navigation-month
${navigationYear}       DatePicker-calendar-navigation-year
${cancelButton}         DatePicker-action-cancel
${applyButton}          DatePicker-action-apply
${outside}              //div[starts-with(@class,'Component-header-')]


*** Test Cases ***
Open range calendar
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Element Attribute Value Should Be    ${startInput}                         value         5 Jun, 2019
    Element Attribute Value Should Be    ${endInput}                           value         10 Jun, 2019


Change range date with clicks
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Click Element                        xpath:(//p[text()=1])[1]
    Element Attribute Value Should Be    ${startInput}                         value         1 Jun, 2019
    Click Element                        xpath:(//p[text()=18])[1]
    Element Attribute Value Should Be    ${startInput}                         value         18 Jun, 2019


Adapte range date by setting end date before start with clicks
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Click Element                        xpath:(//p[text()=1])[3]
    Element Attribute Value Should Be    ${endInput}                           value         1 Jun, 2019
    Element Attribute Value Should Be    ${startInput}                         value         1 Jun, 2019


Change range date with inputs
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Force input                          ${startInput}                         01/02/2019
    Press Keys                           ${startInput}                         RETURN
    Element Attribute Value Should Be    ${startInput}                         value         01/02/2019
    Force input                          ${endInput}                           01/10/2019
    Press Keys                           ${endInput}                           RETURN
    Element Attribute Value Should Be    ${endInput}                           value         01/10/2019


Adapte range date by setting end date before start with inputs
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Force input                          ${endInput}                           01/02/2019
    Press Keys                           ${endInput}                           RETURN
    Element Attribute Value Should Be    ${endInput}                           value         01/02/2019
    Element Attribute Value Should Be    ${startInput}                         value         2 Jan, 2019


Don't change date with clicks in start date when range mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Click Element                        xpath:(//p[text()=13])[1]
    Click Element                        ${outside}
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Element Attribute Value Should Be    ${startInput}                         value         5 Jun, 2019


Don't change date with clicking in a start date and clicking cancel when range mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Click Element                        xpath:(//p[text()=13])[1]
    Click Element                        ${cancelButton}
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Element Attribute Value Should Be    ${startInput}                         value         5 Jun, 2019


Don't change date with start input and clicking enter when range mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Force input                          ${startInput}                         01/02/1975
    Press Keys                           ${startInput}                         RETURN
    Click Element                        ${outside}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Element Attribute Value Should Be    ${startInput}                         value         5 Jun, 2019


Don't change date with start input, clicking enter and cancel when range mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Force input                          ${startInput}                         01/02/1975
    Press Keys                           ${startInput}                         RETURN
    Click Element                        ${cancelButton}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Element Attribute Value Should Be    ${startInput}                         value         5 Jun, 2019

Don't change date with clicks in end date when range mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Click Element                        xpath:(//p[text()=13])[2]
    Click Element                        ${outside}
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Element Attribute Value Should Be    ${endInput}                           value         10 Jun, 2019


Don't change date with clicking in a end date and clicking cancel when range mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Click Element                        xpath:(//p[text()=13])[2]
    Click Element                        ${cancelButton}
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Element Attribute Value Should Be    ${endInput}                           value         10 Jun, 2019


Don't change date with end input and clicking enter when range mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Force input                          ${endInput}                           01/02/1975
    Press Keys                           ${endInput}                           RETURN
    Click Element                        ${outside}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Element Attribute Value Should Be    ${endInput}                           value         10 Jun, 2019


Don't change date with end input, clicking enter and cancel when range mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible        DatePicker                            10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Force input                          ${endInput}                           01/02/1975
    Press Keys                           ${endInput}                           RETURN
    Click Element                        ${cancelButton}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendarRange}                  4s
    Element Attribute Value Should Be    ${endInput}                           value         10 Jun, 2019


