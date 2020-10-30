*** Setting ***
Resource      _table.resource
Test Setup    open table sample    ${visualizations}    with-expander-and-custom-content


*** Test Cases ***
expand line when expander button is clicked
    Page Should Not Contain              Company
    Click Element                        ${button_expand}
    Wait Until Page Contains             Company

shrink expanded line when expander button is clicked
    Click Element                        ${button_expand}
    Wait Until Page Contains             Company
    Click Element                        ${button_expand}
    Wait Until Page Does Not Contain     Company

shrink expanded line when any column is sorted
    Click Element                       ${button_expand}
    Wait Until Page Contains            Company
    Click Element                       ${header}(2)
    Wait Until Page Does Not Contain    Company

shrink expanded line when it is changed the navigation page
    Select Dropdown Value               ${rows_per_page}    5
    Click Element                       ${button_expand}
    Wait Until Page Contains            Company
    Click Element                       ${pagination_next_page}
    Wait Until Page Does Not Contain    Company

shrink expanded line when it is changed the number of rows per page
    Click Element                       ${button_expand}
    Wait Until Page Contains            Company
    Select Dropdown Value               ${rows_per_page}    5
    Wait Until Page Does Not Contain    Company

do not shrink data when any part of expanded area is clicked
    Click Element               ${button_expand}
    Wait Until Page Contains    Company
    Click Element               ${header_company}
    Page Should Contain         Company


*** Variables ***
${header_company}    xpath://th[text()='Company']
