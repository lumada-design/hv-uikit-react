*** Setting ***
Library          DateTime
Resource         ../_datePicker.resource
Test Setup       open datePicker sample    with-selection-list
Documentation    Use Cases:
...              - Supports the ability to add a custom shortcuts for dates(e.g: today)


*** Test Cases ***
last 7 days
    Element Should Contain               ${datePickerHeader}    5 - 10 Sep 2020
    Click Element                        ${last7days}
    ${yyyy}  ${mmm}  ${d}    get date    -7 days
    wait until input has value           ${calendarLeft} input    ${d} ${mmm} ${yyyy}
    ${yyyy}  ${mmm}  ${d}    get date
    wait until input has value           ${calendarRight} input    ${d} ${mmm} ${yyyy}
    Element Should Contain               ${datePickerHeader}    ${d} ${mmm} ${yyyy}

this month
    Element Should Contain               ${datePickerHeader}    5 - 10 Sep 2020
    Click Element                        ${thisMonth}
    ${yyyy}  ${mmm}  ${d}    get date
    wait until input has value           ${calendarLeft} input    1 ${mmm} ${yyyy}
    wait until input has value           ${calendarRight} input    ${d} ${mmm} ${yyyy}
    Element Should Contain               ${datePickerHeader}    1 - ${d} ${mmm} ${yyyy}

this year
    Element Should Contain               ${datePickerHeader}    5 - 10 Sep 2020
    Click Element                        ${thisYear}
    ${yyyy}  ${mmm}  ${d}    get date
    wait until input has value           ${calendarLeft} input    1 Jan ${yyyy}
    wait until input has value           ${calendarRight} input    ${d} ${mmm} ${yyyy}
    Run Keyword If                       '${mmm}'=='Jan' 
    ...  Element Should Contain          ${datePickerHeader}    1 - ${d} Jan ${yyyy} 
    ...  ELSE                            
    ...  Element Should Contain          ${datePickerHeader}    1 Jan ${yyyy} - ${d} ${mmm} ${yyyy}

clear date
    Element Should Contain               ${datePickerHeader}    5 - 10 Sep 2020
    Click Element                        ${clear}
    Click Element                        ${apply}
    Press Keys                           NONE    ESCAPE
    Element Should Contain               ${datePickerHeader}    Select date

*** Variables ***
${last7days}    xpath://li[text()="Last 7 days"]
${thisMonth}    xpath://li[text()="This month"]
${thisYear}     xpath://li[text()="This year"]
