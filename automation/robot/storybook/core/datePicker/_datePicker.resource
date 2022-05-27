*** Setting ***
Resource    ../_keywords.resource


*** Variables ***
${apply}               css:.HvDatePicker-rightContainer>button:first-child
${calendar}            css:.HvSingleCalendar-calendarWrapper
${calendarLeft}        css:.HvCalendar-rangeCalendarContainer>div:first-child
${calendarRight}       css:.HvCalendar-rangeCalendarContainer>div:last-child
${cancel}              css:.HvDatePicker-rightContainer>button:last-child
${clear}               css:.HvDatePicker-leftContainer>button:first-child
${datePickerHeader}    css:.HvBaseDropdown-selection
${day}                 xpath:(//button[@data-in-month='true'])
${daySelected}         css:.HvSingleCalendar-calendarDateSelected
${input}               css:.HvCalendarHeader-input
${month-}              css:[id$=month-left]
${month}               css:[id$=month]
${month+}              css:[id$=month-right]
${monthGrid}           xpath://div[contains(@class,"calendarMonthlyGrid")]/div
${x}                   css:button[aria-label="Clear the text"]
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
    Set Browser Implicit Wait         30s
    Go To                             ${components}inputs-date-picker--${sample}
    Wait Until Element Is Visible     ${datePickerHeader}
    Click Element                     ${datePickerHeader}
    Wait Until Element Is Visible     ${calendar}
    [Teardown]    Set Browser Implicit Wait    3s

wait until input has value
    [Documentation]
    [Arguments]     ${locator}    ${value}
    Wait Until Keyword Succeeds    2x    1s
    ...    input value should be    ${locator}    ${value}

input value should be
    [Documentation]
    ...   normalize strings since IE returns date string with strange chars/encode
    [Arguments]    ${locator}    ${value}
    ${Attribute}    Get Element Attribute     ${locator}    value
    ${Attribute}    Encode String To Bytes    ${Attribute}    ASCII    errors=ignore      #*1
    Should Be Equal As Strings                ${Attribute}    ${value}    ignore_case=true
