*** Setting ***
Library       DateTime
Resource      ../_datePicker.resource
Force Tags    v3


*** Test Cases ***
current date as default value when it is empty
    [setup]    Open DatePicker sample    main
    ${yyyy}   ${day}   Get Time          year day
    ${monthName}    Get Current Date     result_format=%B
    Element Text Should Be               ${month}    ${monthName}    ignore_case=true
    Element Text Should Be               ${year}    ${yyyy}
    Element Text Should Be               ${daySelected}    ${day}

change date names in locale pt-PT
    [setup]    Open DatePicker sample    localized
    Element Attribute Value Should Be    ${localInput}   value   pt-PT
    Element Attribute Value Should Be    ${calendar} input   placeholder   DD/MM/YYYY
    Force input                          ${calendar} input    20/08/2014
    Press Keys                           NONE    ENTER    ENTER
    Wait Until Element Is Visible        ${calendar}
    Element Text Should Be               ${datePickerHeader}    20 ago. 2014
    Element Attribute Value Should Be    ${calendar} input    value    20 ago 2014
    Element Text Should Be               ${month}    Agosto
    Page Should Not Contain              ${weekday}    Qua

change locale result format
    [setup]    Open DatePicker sample    localized
    click Element                        css:input
    wait Until Element Is Enabled        ${x}
    Click Element                        ${x}
    Input Text                           css:input    en-UK
    Press Keys                           NONE    ENTER
    Click Element                        ${datePickerHeader}
    Wait Until Element Is Visible        ${calendar}
    ${monthName}                         Get Current Date    result_format=%B
    Element Text Should Be               ${month}    ${monthName}    ignore_case=true


*** Variables ***
${localInput}    css:input
${weekday}       css:HvCalendarHeader-headerDayOfWeek
