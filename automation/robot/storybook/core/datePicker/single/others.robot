*** Setting ***
Library       DateTime
Resource      ../_datePicker.resource


*** Test Cases ***
current date as default value when it is empty
    [setup]    Open DatePicker sample    main
    ${yyyy}   Get Time                   year
    ${day}   Get Current Date            result_format=%e
    ${day}                               Evaluate  '${day}'.replace(' ','')
    ${monthName}    Get Current Date     result_format=%B
    Element Text Should Be               ${month}    ${monthName}    ignore_case=true
    Element Text Should Be               ${year}    ${yyyy}
    Element Text Should Be               ${daySelected}    ${day}

Verify input placeholder as locale pt-PT format
    [setup]    Open DatePicker sample    localized
    Element Attribute Value Should Be    ${localInput}   value   pt-PT
    Element Attribute Value Should Be    ${calendar} input   placeholder   DD/MM/YYYY

change date names in locale pt-PT
    [setup]    Open DatePicker sample    localized
    Force input                          ${calendar} input    20/08/2014
    Press Keys                           NONE    ENTER
    Click Element                        ${datePickerHeader}
    Wait Until Element Is Visible        ${calendar}
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

mouse events does not open when it is disabled
    [Documentation]
    ...     use case: it can be disabled and if so not interactable
    [Setup]    NONE
    Go To                              ${forms}date-picker--disabled
    Wait Until Element Is Visible      ${datePickerHeader}
    mouses does not open datepicker    ${datePickerRoot}
    mouses does not open datepicker    ${datePickerCombobox}
    mouses does not open datepicker    ${datePickerHeader}
    mouses does not open datepicker    ${datePickerPlaceHolder}
    mouses does not open datepicker    ${datePickerIcon}


keyboard eevents does not open when it is disabled
    [Documentation]
    ...     use case: it can be disabled and if so not interactable
    [Setup]    NONE
    Go To                                ${forms}date-picker--disabled
    Wait Until Element Is Visible        ${datePickerHeader}
    keyboard does not open datepicker    ${datePickerRoot}
    keyboard does not open datepicker    ${datePickerCombobox}
    keyboard does not open datepicker    ${datePickerHeader}
    keyboard does not open datepicker    ${datePickerPlaceHolder}
    keyboard does not open datepicker    ${datePickerIcon}


*** Variables ***
${datePickerCombobox}       css:[role=combobox]
${datePickerIcon}           css:.HvDatePicker-icon
${datePickerPlaceHolder}    css:.HvBaseDropdown-selection
${datePickerRoot}           css:.HvDatePicker-root
${localInput}               css:input
${weekday}                  css:HvCalendarHeader-headerDayOfWeek


*** Keywords ***
mouses does not open datepicker
    [Documentation]    Any mouse interactions does not open datepicker
    [Arguments]    ${Element}
    Run Keyword And Ignore Error     Click Element    ${Element}
    Element Should Not Be Visible    ${calendar}
    Run Keyword And Ignore Error     Double Click Element    ${Element}
    Element Should Not Be Visible    ${calendar}
    Run Keyword And Ignore Error     Mouse Over    ${Element}
    Element Should Not Be Visible    ${calendar}

keyboard does not open datepicker
    [Documentation]    Any keyboard interactions does not open datepicker
    [Arguments]    ${Element}
    Press Keys                       ${Element}    ENTER
    Element Should Not Be Visible    ${calendar}
    Press Keys                       ${Element}    SPACE
    Element Should Not Be Visible    ${calendar}