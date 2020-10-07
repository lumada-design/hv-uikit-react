*** Setting ***
Library          DateTime
Resource         ../_datePicker.resource
Test Setup       open datePicker sample    with-selection-list
Documentation    Use Cases:
...              - Supports the ability to add a custom shortcuts for dates(e.g: today)
Force Tags       v3


*** Test Cases ***
last 7 days
    Element Text Should Be               ${datePickerHeader}    5 - 10 Sep 2020
    Click Element                        ${last7days}
    ${yyyy}  ${mmm}  ${d}    get date    -7 days
    wait until element has value         ${calendarLeft} input    ${d} ${mmm} ${yyyy}
    ${yyyy}  ${mmm}  ${d}    get date
    wait until element has value         ${calendarRight} input    ${d} ${mmm} ${yyyy}
    Element Should Contain               ${datePickerHeader}    ${d} ${mmm} ${yyyy}

this month
    Element Text Should Be               ${datePickerHeader}    5 - 10 Sep 2020
    Click Element                        ${thisMonth}
    ${yyyy}  ${mmm}  ${d}    get date
    wait until element has value         ${calendarLeft} input    1 ${mmm} ${yyyy}
    wait until element has value         ${calendarRight} input    ${d} ${mmm} ${yyyy}
    Element Text Should Be               ${datePickerHeader}    1 - ${d} ${mmm} ${yyyy}

this year
    Element Text Should Be               ${datePickerHeader}    5 - 10 Sep 2020
    Click Element                        ${thisYear}
    ${yyyy}  ${mmm}  ${d}    get date
    wait until element has value         ${calendarLeft} input    1 Jan ${yyyy}
    wait until element has value         ${calendarRight} input    ${d} ${mmm} ${yyyy}
    Element Text Should Be               ${datePickerHeader}    1 Jan ${yyyy} - ${d} ${mmm} ${yyyy}


*** Variables ***
${last7days}    xpath://li[text()="Last 7 days"]
${thisMonth}    xpath://li[text()="This month"]
${thisYear}     xpath://li[text()="This year"]
