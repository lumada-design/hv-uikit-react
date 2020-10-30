*** Setting ***
Resource         ../_datePicker.resource
Test Setup       Open DatePicker sample    with-actions
Documentation    Use Cases:
...              If there are actions:
...               - Click outside closes the date picker with cancel
...               - Cancel closes the date picker and cancels the operation
...               - Apply closes the date picker and applies the date
...              Allows selection of a single date


*** Test Cases ***
close and apply selection
    Force input                          ${input}    01/09/1970
    Click Button                         Apply
    wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    9 Jan 1970

close and ignore selection when header is clicked
    ${date}    Get Text                  ${datePickerHeader}
    Force input                          ${input}    07/12/1982
    Click Element                        ${datePickerHeader}
    wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    ${date}

close and ignore selection when click outside
    ${date}    Get Text                  ${datePickerHeader}
    Force input                          ${input}    07/12/1982
    Click Element                        css:body
    wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    ${date}

close and ignore selection when click Cancel
    ${date}    Get Text                  ${datePickerHeader}
    Force input                          ${input}    07/12/1982
    Click Button                         Cancel
    wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    ${date}

close and ignore selection when pressed ESCAPE
    [Tags]    keyboard
    ${date}    Get Text                  ${datePickerHeader}
    Force input                          ${input}    07/12/1982
    Press Keys                           ${input}    ESCAPE
    wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    ${date}

close and ignore selection when pressed ENTER and then clicked Cancel
    [Tags]    keyboard
    ${date}    Get Text                  ${datePickerHeader}
    Force input                          ${input}    07/12/1982
    Press Keys                           ${input}    ENTER
    Click Button                         Cancel
    wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    ${date}

close and ignore selection when pressed ENTER and then clicked outside
    [Tags]    keyboard
    ${date}    Get Text                  ${datePickerHeader}
    Force input                          ${input}    07/12/1982
    Press Keys                           ${input}    ENTER
    Click Element                        css:body
    wait Until Element Is Not Visible    ${calendar}    2s
    Element Text Should Be               ${datePickerHeader}    ${date}
