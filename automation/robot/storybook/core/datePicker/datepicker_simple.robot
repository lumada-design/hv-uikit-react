*** Setting ***
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary

*** Variables ***
${openCalendar}         DatePicker-calendar
${simpleInput}          DatePicker-calendar-header-input
${navigationMonth}      DatePicker-calendar-navigation-month
${navigationYear}       DatePicker-calendar-navigation-year
${cancelButton}         DatePicker-action-cancel
${applyButton}          DatePicker-action-apply
${outside}              css:body


*** Test Cases ***
Open the calendar
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         1 Jan, 1970

Change the date with clicks
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Click Element                        //div[p[text()=9]]
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         9 Jan, 1970

Use input to change date with enter
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Force input                          ${simpleInput}              01/02/1970
    Press Keys                           ${simpleInput}              RETURN
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         2 Jan, 1970


Use input to change date with click outside
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Force input                          ${simpleInput}              01/02/1970
    Click Element                        ${outside}
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         2 Jan, 1970


Change month by using the arrows icons
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Click element                        ${navigationMonth}-right
    Element Text Should Be               ${navigationMonth}          February
    Click element                        ${navigationMonth}-right
    Element Text Should Be               ${navigationMonth}          March
    Click element                        ${navigationMonth}-left
    Element Text Should Be               ${navigationMonth}          February
    Click Element                        //div[p[text()=9]]
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         9 Feb, 1970


Change month using the month screen
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Click element                        ${navigationMonth}
    Click element                        //p[contains(.,'Mar')]
    Wait Until Element Is Visible        //div[p[text()=9]]          2s
    Click Element                        //div[p[text()=9]]
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         9 Mar, 1970


Change year by using the arrows icons
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithvaluedatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Click element                        ${navigationYear}-right
    Element Text Should Be               ${navigationYear}           1971
    Click element                        ${navigationYear}-right
    Element Text Should Be               ${navigationYear}           1972
    Click element                        ${navigationYear}-left
    Element Text Should Be               ${navigationYear}           1971
    Click Element                        //div[p[text()=9]]
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         9 Jan, 1971


Use input to change date with click outside in locale pt-PT
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplelocalizeddatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Force input                          ${simpleInput}              01/02/1970
    Click Element                        ${outside}
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         1 Fev, 1970


Use input and maintain date formatting with enter
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Force input                          ${simpleInput}              01/02/1975
    Press Keys                           ${simpleInput}              RETURN
    Element Attribute Value Should Be    ${simpleInput}              value         01/02/1975


Use input and change date formatting with click outside input
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Force input                          ${simpleInput}              01/02/1975
    Click element                        ${openCalendar}
    Element Attribute Value Should Be    ${simpleInput}              value         2 Jan, 1975


Don't change date with clicks when actions mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Click Element                        //div[p[text()=9]]
    Click Element                        ${outside}
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         2 Jan, 1970


Don't change date with clicking in a date and clicking cancel when actions mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Click Element                        //div[p[text()=9]]
    Click Element                        ${cancelButton}
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         2 Jan, 1970


Don't change date with input and clicking enter when actions mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Force input                          ${simpleInput}              01/02/1975
    Press Keys                           ${simpleInput}              RETURN
    Click Element                        ${outside}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         2 Jan, 1970


Don't change date with input, clicking enter and cancel when actions mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Force input                          ${simpleInput}              01/02/1975
    Press Keys                           ${simpleInput}              RETURN
    Click Element                        ${cancelButton}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         2 Jan, 1970


Change date with click and clicking in apply when actions mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Click Element                        //div[p[text()=9]]
    Click Element                        ${applyButton}
    Element Should Not Be Visible        ${openCalendar}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         9 Jan, 1970


Change date with input, clicking enter and cancel when actions mode
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coredatepicker--simplewithactionsdatepicker
    Wait Until Element Is Visible        DatePicker                  10s
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Force input                          ${simpleInput}              01/02/1975
    Press Keys                           ${simpleInput}              RETURN
    Click Element                        ${applyButton}
    Click Element                        DatePicker
    Wait Until Element Is Visible        ${openCalendar}             2s
    Element Attribute Value Should Be    ${simpleInput}              value         2 Jan, 1975

