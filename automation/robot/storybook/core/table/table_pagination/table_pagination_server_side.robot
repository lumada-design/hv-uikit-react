
*** Setting ***
Resource          keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        go to url and wait until element is visible    ${STORYBOOK_URL}/iframe.html?id=coretable--tableserverside    ${input_page}    10s
Test Teardown     Run Keyword If Test Failed                     Capture Page Screenshot    ${SUITE_NAME}.png
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
render next table page when next button is clicked
    [Tags]    bug-infrastructure-ie
    render next table page

render previous table page when previous button is clicked
    [Tags]    bug-infrastructure-ie
    render previous table page

render last table page when last button is clicked
    render last table page

render first table page when first button is clicked
    render first table page
    
render specific table page number when that number is inserted on pagination input
    [Tags]    bug-infrastructure-ie
    render specific table page number

render first table page when a column is sorted and pagination is greater than 1
    [Tags]    bug-infrastructure-ie
    render first table page when a column is sorted
