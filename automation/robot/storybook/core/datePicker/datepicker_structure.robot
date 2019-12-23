*** Setting ***
Suite Setup                               open storybook
Suite Teardown                            Close Browser
Default Tags                              smoke
Variables                                 ../../_resources/storybook_variables.yaml
Resource                                  ../../_resources/storybook_keywords.robot
Library                                   SeleniumLibrary

*** Variables ***
${cardsSelector}                          //*[starts-with(@id, 'Card')]
${openCalendar}                           DatePicker-calendar
${openCalendarRange}                      DatePicker-calendar-start
${simpleInput}                            DatePicker-calendar-header-input
${startInput}                             DatePicker-calendar-start-header-input
${endInput}                               DatePicker-calendar-end-header-input
${navigationMonth}                        DatePicker-calendar-navigation-month
${navigationYear}                         DatePicker-calendar-navigation-year
${cancelButton}                           DatePicker-action-cancel
${applyButton}                            DatePicker-action-apply
${outside}                                //div[starts-with(@class,'Component-header-')]


*** Test Cases ***
Open the calendar
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         1 Jan, 1970

Change the date with clicks
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Click Element                             //div[@title='9 Jan, 1970']
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         9 Jan, 1970

Use input to change date with enter
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Input Text                                ${simpleInput}                        01/02/1970
    Press Keys                                ${simpleInput}                        RETURN
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         2 Jan, 1970


Use input to change date with click outside
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Input Text                                ${simpleInput}                        01/02/1970
    Click Element                             ${outside}
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         1 Jan, 1970


Change month by using the arrows icons
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Click element                             ${navigationMonth}-right
    Element Text Should Be                    ${navigationMonth}                    February
    Click element                             ${navigationMonth}-right
    Element Text Should Be                    ${navigationMonth}                    March
    Click element                             ${navigationMonth}-left
    Element Text Should Be                    ${navigationMonth}                    February
    Click Element                             //div[@title='9 Feb, 1970']
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         9 Feb, 1970


Change month using the month screen
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Click element                             ${navigationMonth}
    Click element                             //*[text()[contains(., 'Mar')]]/..
    Wait Until Element Is Visible             //div[contains(@class,'Calendar-calendarGrid')]    10s
    Click Element                             //div[@title='9 Mar, 1970']
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         9 Mar, 1970


Change year by using the arrows icons
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Click element                             ${navigationYear}-right
    Element Text Should Be                    ${navigationYear}                     1971
    Click element                             ${navigationYear}-right
    Element Text Should Be                    ${navigationYear}                     1972
    Click element                             ${navigationYear}-left
    Element Text Should Be                    ${navigationYear}                     1971
    Click Element                             //div[@title='9 Jan, 1971']
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         9 Jan, 1971


Use input to change date with click outside in locale pt-PT
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplelocalizeddatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Input Text                                ${simpleInput}                        01/02/1970
    Click Element                             ${outside}
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         1 Fev, 1970


Use input and maintain date formatting with enter
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Input Text                                ${simpleInput}                        01/02/1975
    Press Keys                                ${simpleInput}                        RETURN
    Element Attribute Value Should Be         ${simpleInput}                        value         01/02/1975


Use input and change date formatting with click outside input
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Input Text                                ${simpleInput}                        01/02/1975
    Click element                             ${openCalendar}
    Element Attribute Value Should Be         ${simpleInput}                        value         2 Jan, 1975


Don't change date with clicks when actions mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Click Element                             //div[@title='9 Jan, 1970']
    Click Element                             ${outside}
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         2 Jan, 1970


Don't change date with clicking in a date and clicking cancel when actions mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Click Element                             //div[@title='9 Jan, 1970']
    Click Element                             ${cancelButton}
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         2 Jan, 1970


Don't change date with input and clicking enter when actions mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Input Text                                ${simpleInput}                        01/02/1975
    Press Keys                                ${simpleInput}                        RETURN
    Click Element                             ${outside}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         2 Jan, 1970


Don't change date with input, clicking enter and cancel when actions mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Input Text                                ${simpleInput}                        01/02/1975
    Press Keys                                ${simpleInput}                        RETURN
    Click Element                             ${cancelButton}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         2 Jan, 1970


Change date with click and clicking in apply when actions mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Click Element                             //div[@title='9 Jan, 1970']
    Click Element                             ${applyButton}
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         9 Jan, 1970


Change date with input, clicking enter and cancel when actions mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Input Text                                ${simpleInput}                        01/02/1975
    Press Keys                                ${simpleInput}                        RETURN
    Click Element                             ${applyButton}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendar}                       10s
    Element Attribute Value Should Be         ${simpleInput}                        value         2 Jan, 1975


Open range calendar
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Element Attribute Value Should Be         ${startInput}                         value         5 Jun, 2019
    Element Attribute Value Should Be         ${endInput}                           value         10 Jun, 2019


Change range date with clicks
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Click Element                             //div[@id='DatePicker-calendar-start']/div/div[@title='1 Jun, 2019']
    Element Attribute Value Should Be         ${startInput}                         value         1 Jun, 2019
    Click Element                             //div[@id='DatePicker-calendar-start']/div/div[@title='18 Jun, 2019']
    Element Attribute Value Should Be         ${startInput}                         value         18 Jun, 2019


Adapte range date by setting end date before start with clicks
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Click Element                             //div[@id='DatePicker-calendar-end']/div/div[@title='1 Jun, 2019']
    Element Attribute Value Should Be         ${endInput}                           value         1 Jun, 2019
    Element Attribute Value Should Be         ${startInput}                         value         1 Jun, 2019


Change range date with inputs
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Input Text                                ${startInput}                         01/02/2019
    Press Keys                                ${startInput}                         RETURN
    Element Attribute Value Should Be         ${startInput}                         value         01/02/2019
    Input Text                                ${endInput}                           01/10/2019
    Press Keys                                ${endInput}                           RETURN
    Element Attribute Value Should Be         ${endInput}                           value         01/10/2019


Adapte range date by setting end date before start with inputs
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Input Text                                ${endInput}                           01/02/2019
    Press Keys                                ${endInput}                           RETURN
    Element Attribute Value Should Be         ${endInput}                           value         01/02/2019
    Element Attribute Value Should Be         ${startInput}                         value         2 Jan, 2019


Don't change date with clicks in start date when range mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Click Element                             //div[@id='DatePicker-calendar-start']/div/div[@title='13 Jun, 2019']
    Click Element                             ${outside}
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Element Attribute Value Should Be         ${startInput}                         value         5 Jun, 2019


Don't change date with clicking in a start date and clicking cancel when range mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Click Element                             //div[@id='DatePicker-calendar-start']/div/div[@title='13 Jun, 2019']
    Click Element                             ${cancelButton}
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Element Attribute Value Should Be         ${startInput}                         value         5 Jun, 2019


Don't change date with start input and clicking enter when range mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Input Text                                ${startInput}                         01/02/1975
    Press Keys                                ${startInput}                         RETURN
    Click Element                             ${outside}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Element Attribute Value Should Be         ${startInput}                         value         5 Jun, 2019


Don't change date with start input, clicking enter and cancel when range mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Input Text                                ${startInput}                         01/02/1975
    Press Keys                                ${startInput}                         RETURN
    Click Element                             ${cancelButton}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Element Attribute Value Should Be         ${startInput}                         value         5 Jun, 2019

Don't change date with clicks in end date when range mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Click Element                             //div[@id='DatePicker-calendar-end']/div/div[@title='13 Jun, 2019']
    Click Element                             ${outside}
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Element Attribute Value Should Be         ${endInput}                           value         10 Jun, 2019


Don't change date with clicking in a end date and clicking cancel when range mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Click Element                             //div[@id='DatePicker-calendar-end']/div/div[@title='13 Jun, 2019']
    Click Element                             ${cancelButton}
    Element Should Not Be Visible             ${openCalendar}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Element Attribute Value Should Be         ${endInput}                           value         10 Jun, 2019


Don't change date with end input and clicking enter when range mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Input Text                                ${endInput}                           01/02/1975
    Press Keys                                ${endInput}                           RETURN
    Click Element                             ${outside}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Element Attribute Value Should Be         ${endInput}                           value         10 Jun, 2019


Don't change date with end input, clicking enter and cancel when range mode
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=coredatepicker--rangewithvaluesdatepicker
    Wait Until Element Is Visible             DatePicker                            10s
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Input Text                                ${endInput}                           01/02/1975
    Press Keys                                ${endInput}                           RETURN
    Click Element                             ${cancelButton}
    Click Element                             DatePicker
    Wait Until Element Is Visible             ${openCalendarRange}                  10s
    Element Attribute Value Should Be         ${endInput}                           value         10 Jun, 2019
