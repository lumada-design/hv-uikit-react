*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        go to url and wait until element is visible    ${STORYBOOK_URL}/iframe.html?id=coretable--tablescrollingexpander    ${table}    10s
Test Teardown     Run Keyword If Test Failed                     Capture Page Screenshot    ${SUITE_NAME}.png
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
expand line when expander button is clicked
    Page Should Not Contain              Company
    Click Element                        ${expander_button}
    Wait Until Page Contains             Company     3s
    
shrink expanded line when expander button is clicked 
    Click Element                        ${expander_button}
    Wait Until Page Contains             Company                     3s
    Click Element                        ${expander_button}
    Wait Until Page Does Not Contain     Company                     3s

shrink expanded line when any column is sorted
    Click Element                       ${expander_button}
    Wait Until Page Contains            Company            3s
    Click Element                       ${column1_header}
    Wait Until Page Does Not Contain    Company            3s
    
shrink expanded line when it is changed the navigation page
    Select From List By Value           ${page_size}    5    
    Click Element                       ${expander_button}
    Wait Until Page Contains            Company         3s
    Click Element                       ${next_page}
    Wait Until Page Does Not Contain    Company         3s

shrink expanded line when it is changed the number of rows per page
    Click Element                       ${expander_button}
    Wait Until Page Contains            Company         3s
    Select From List By Value           ${page_size}    5
    Wait Until Page Does Not Contain    Company         3s

do not shrink data when any part of expanded area is clicked
    Click Element               ${expander_button}
    Wait Until Page Contains    Company                         3s
    Click Element               xpath://th[text()='Company']
    Page Should Contain         Company