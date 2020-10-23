*** Setting ***
Resource          _pagination.resource
Test Setup        Run Keywords
...               Go To    ${tests}table--with-search
...               AND    Wait Until Element Is Enabled    ${pagination_input}
Test Template     Run Keyword
Test Teardown     Run Keyword If Test Failed
...               Capture Page Screenshot    ${SUITE_NAME}${TEST_NAME}.png
Documentation     in all Test Cases was assumed the buttons are enabled


*** Test Cases ***
current page increase when is clicked next page
    click next page
    Input Text                   css:input[type=text]    e
    click next page
    Input Text                   css:input[type=text]    v
    click next page
