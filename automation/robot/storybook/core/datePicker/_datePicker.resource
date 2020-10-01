*** Setting ***
Resource      ../_keywords.resource


*** Variables ***
${apply}               css:button[id*=apply]
${calendar}            css:.HvSingleCalendar-calendarWrapper
${calendarLeft}        css:.HvCalendar-rangeCalendarContainer>div:first-child
${calendarRight}       css:.HvCalendar-rangeCalendarContainer>div:last-child
${cancel}              css:button[id*=cancel]
${datePickerHeader}    css:.HvBaseDropdown-header
${day}                 xpath:(//button[@type="button"])
${daySelected}         css:.HvSingleCalendar-calendarDateSelected
${input}               css:.HvCalendarHeader-input
${month-}              css:[id$=month-left]
${month}               css:[id$=month]
${month+}              css:[id$=month-right]
${monthGrid}           xpath://div[contains(@class,"calendarMonthlyGrid")]/div
${x}                   css:button[title="Clear the text"]
${year-}               css:[id*=year-left]
${year}                css:[id*=year][role]
${year+}               css:[id*=year-right]


*** Keywords ***
get date
    [Documentation]
    ...   returns date on array like "['2020', 'Sep', '7']" where :
    ...    - year with century as a decimal number
    ...    - month(Month as locale’s abbreviated name)
    ...    - day(without zero padding)
    ...   ${increment} ex: "-7 days"  for details look at
    ...  https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#time-format
    [Arguments]    ${increment}=0 days
    ${date}    Get Current Date    local   ${increment}    result_format=%Y %b %e
    @{date}     Split String    ${date}
    [Return]    ${date}

open datePicker sample
    [Documentation]     Open the sample and then open the calendar
    [Arguments]    ${sample}
    Go To                             ${forms}date-picker--${sample}
    Wait Until Element Is Visible     ${datePickerHeader}
    Click Element                     ${datePickerHeader}
    Wait Until Element Is Visible     ${calendar}

wait until element has value
    [Documentation]
    [Arguments]     ${element}     ${value}
    Wait Until Keyword Succeeds    2x    700ms
    ...    Element Attribute Value Should Be    ${element}    value    ${value}
