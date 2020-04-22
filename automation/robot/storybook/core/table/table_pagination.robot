
*** Setting ***
Resource          keywords.resource
Library           SeleniumLibrary
Suite Setup       open storybook
Test Template     Run Keyword
Test Teardown     Run Keyword If Test Failed
...               Capture Page Screenshot    ${SUITE_NAME} ${TEST_NAME}.png
Suite Teardown    Close Browser
Force Tags        smoke

*** Comments ***
table data not validated as it is external (random server side data)


*** Variables ***
${clientSide}    ${STORYBOOK_URL}/iframe.html?id=visualizations-table--main
${serverSide}    ${STORYBOOK_URL}/iframe.html?id=visualizations-table--server-side-pagination


*** Test Cases ***
client side: next page        render next table page               ${clientSide}
server side: next page        render next table page               ${serverSide}
client side: previous page    render previous table page           ${clientSide}
server side: previous page    render previous table page           ${serverSide}
client side: last page        render last table page               ${clientSide}
server side: last page        render last table page               ${serverSide}
client side: first page       render first table page              ${clientSide}
server side: first page       render first table page              ${serverSide}
client side: page number      render specific table page number    ${clientSide}
server side: page number      render specific table page number    ${serverSide}
client side: column sort      render first table page when a column is sorted    ${clientSide}
server side: column sort      render first table page when a column is sorted    ${serverSide}