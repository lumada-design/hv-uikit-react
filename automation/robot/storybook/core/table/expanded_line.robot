*** Setting ***
Library           SeleniumLibrary
Resource          table.resource
Suite Setup       open storybook
Test Setup        go to url and wait until element is visible
...               ${iframe_expander}    ${table}    10s
Suite Teardown    Close Browser
Force Tags        smoke


*** Variables ***
${header_company}    xpath://th[text()='Company']

*** Test Cases ***
expand line when expander button is clicked
    Page Should Not Contain              Company
    Click Element                        ${button_expand}
    Wait Until Page Contains             Company    3s

shrink expanded line when expander button is clicked
    Click Element                        ${button_expand}
    Wait Until Page Contains             Company    3s
    Click Element                        ${button_expand}
    Wait Until Page Does Not Contain     Company    3s

shrink expanded line when any column is sorted
    Click Element                       ${button_expand}
    Wait Until Page Contains            Company     3s
    Click Element                       ${header_2}
    Wait Until Page Does Not Contain    Company     3s

shrink expanded line when it is changed the navigation page
    Select From List By Value           ${rows_per_page}    5
    Click Element                       ${button_expand}
    Wait Until Page Contains            Company    3s
    Click Element                       ${pagination_next_page}
    Wait Until Page Does Not Contain    Company    3s

shrink expanded line when it is changed the number of rows per page
    Click Element                       ${button_expand}
    Wait Until Page Contains            Company    3s
    Select From List By Value           ${rows_per_page}    5
    Wait Until Page Does Not Contain    Company    3s

do not shrink data when any part of expanded area is clicked
    Click Element               ${button_expand}
    Wait Until Page Contains    Company      3s
    Click Element               ${header_company}
    Page Should Contain         Company
