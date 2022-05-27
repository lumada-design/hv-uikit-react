*** Setting ***
Resource      _table.resource
Test Setup    open table sample    ${components}    with-expander-and-custom-content


*** Test Cases ***
expand line when expander button is clicked
    Page Should Not Contain              Company
    Wait Until Element Is Enabled        ${button_expand}
    Click Element                        ${button_expand}
    Wait Until Page Contains             Company

shrink expanded line when expander button is clicked
    Wait Until Element Is Enabled        ${button_expand}
    Click Element                        ${button_expand}
    Wait Until Page Contains             Company
    Click Element                        ${button_expand}
    Wait Until Page Does Not Contain     Company

shrink expanded line when any column is sorted
    Wait Until Element Is Enabled       ${button_expand}
    Click Element                       ${button_expand}
    Wait Until Page Contains            Company
    Click Element                       ${header}(2)
    Wait Until Page Does Not Contain    Company

shrink expanded line when it is changed the navigation page
    Select Dropdown Value               ${rows_per_page}    5
    Wait Until Element Is Enabled       ${button_expand}
    Click Element                       ${button_expand}
    Wait Until Page Contains            Company
    Click Element                       ${nav_next_page}
    Wait Until Page Does Not Contain    Company

shrink expanded line when it is changed the number of rows per page
    Wait Until Element Is Enabled       ${button_expand}
    Click Element                       ${button_expand}
    Wait Until Page Contains            Company
    Select Dropdown Value               ${rows_per_page}    5
    Wait Until Page Does Not Contain    Company

do not shrink data when any part of expanded area is clicked
    Wait Until Element Is Enabled    ${button_expand}
    Click Element                    ${button_expand}
    Wait Until Page Contains         Company
    Click Element                    ${header_company}
    Page Should Contain              Company


*** Variables ***
${header_company}    xpath://th[text()='Company']
