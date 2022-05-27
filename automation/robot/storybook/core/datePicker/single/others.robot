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

change date names in locale pt-PT
    [setup]   open datePicker sample     localized
    Element Attribute Value Should Be    ${calendar} input   placeholder   DD/MM/YYYY
    Force input                          ${calendar} input    20/08/2014
    Press Keys                           NONE    ENTER
    Wait Until Element Is Not Visible    ${calendar}
    Click Element                        ${datePickerHeader}
    Wait Until Element Is Visible        ${calendar}
    Element Text Should Be               ${month}    agosto    ignore_case=true

change locale result format
    [setup]    open datePicker sample     localized
    Force input                  ${calendar} input    02/04/2020
    Press Keys                   NONE    ENTER
    Wait Until Page Contains     abr
    Click Element                ${en_radio}
    Wait Until Page Contains     Apr

mouse events does not open when it is disabled
    [Documentation]
    ...     use case: it can be disabled and if so not interactable
    [Setup]   Go To     ${components}inputs-date-picker--disabled
    Wait Until Element Is Visible      ${datePickerHeader}
    mouses does not open datepicker    ${datePickerRoot}
    mouses does not open datepicker    ${datePickerCombobox}
    mouses does not open datepicker    ${datePickerHeader}
    mouses does not open datepicker    ${datePickerPlaceHolder}
    mouses does not open datepicker    ${datePickerIcon}

keyboard events does not open when it is disabled
    [Documentation]
    ...     use case: it can be disabled and if so not interactable
    [Setup]     Go To    ${components}inputs-date-picker--disabled
    Wait Until Element Is Visible        ${datePickerHeader}
    keyboard does not open datepicker    ${datePickerRoot}
    keyboard does not open datepicker    ${datePickerCombobox}
    keyboard does not open datepicker    ${datePickerHeader}
    keyboard does not open datepicker    ${datePickerPlaceHolder}
    keyboard does not open datepicker    ${datePickerIcon}


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


*** Variables ***
${datePickerCombobox}       css:.HvDatePicker-dropdown
${datePickerIcon}           css:.HvDatePicker-icon
${datePickerPlaceHolder}    css:.HvBaseDropdown-selection
${datePickerRoot}           css:.HvDatePicker-root
${en_radio}                 css:input[type=radio][value=en]
${pt_radio}                 css:input[type=radio][value=pt]
${weekday}                  css:HvCalendarHeader-headerDayOfWeek
