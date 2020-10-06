*** Setting ***
Resource          _pagination.resource
Test Setup        Run Keywords
...               Go To    ${visualizations}table--main
...               AND    Wait Until Element Is Enabled    ${pagination_input}
Test Template     Run Keyword
Test Teardown     Run Keyword If Test Failed
...               Capture Page Screenshot    ${SUITE_NAME}${TEST_NAME}.png
Documentation     in all Test Cases was assumed the buttons are enabled

*** Test Cases ***
current page increase when is clicked next page            click next page
current page decrease when is clicked previous page        click previous page
current page as highest value when is clicked last page    click last page
current page as 1 when is clicked first page               click first page
current page change when is inserted a page number         input a page number
